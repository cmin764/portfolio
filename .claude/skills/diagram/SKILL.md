---
name: diagram
description: >
  Generate C4-style architecture diagrams for portfolio project cards.
  Reads briefs from docs/diagram-briefs.md, applies rules from docs/system-design.md,
  produces Mermaid with local preview, iterates with the user, then exports SVG
  or outputs to Excalidraw via MCP. Learns from corrections across sessions.
argument-hint: ["project name or id", "optional resource path"]
allowed-tools: [Read, Glob, Grep, Bash, Edit, Write, AskUserQuestion]
---

# Diagram Skill

Automates C4 architecture diagram generation for portfolio project cards. Given a project name, it reads the brief, reasons about the diagram, iterates with the user, then exports and integrates.

---

## $ARGUMENTS format

```
/diagram "Project Name"
/diagram "Project Name" docs/some-resource.html
```

- First arg: project name or id (fuzzy-matched against `id` and `title` in `src/data/projects.ts`)
- Second arg (optional): path to a supplementary resource file for extra context

---

## Phase 1: Research (automatic, no user input needed)

1. **Parse $ARGUMENTS.** Extract project name (first token/quoted string) and optional resource path (second token). If $ARGUMENTS is empty, use AskUserQuestion to ask which project.

2. **Fuzzy-match** the project name against `id` and `title` fields in `src/data/projects.ts`. Read the file and scan for matches. If ambiguous (multiple matches), use AskUserQuestion to clarify.

3. **Read the project entry** from `src/data/projects.ts`. Extract: `architectureNotes`, `tags`, `description`, `category`, `company`, `period`.

4. **Read `docs/diagram-briefs.md`** and find the section for this project (search for the project name under `## N.` headings). Extract: C4 level, primary concern, flow direction, nodes table, edges list, design constraints. If no entry exists, note the gap and proceed with what's available from step 3.

5. **Read `docs/system-design.md` section 9** for rendering rules (node shapes, colors, edge styles, layout).

6. **Read `.claude/skills/diagram/references/color-palette.md`** for style mappings.

7. **Read `.claude/skills/diagram/references/mermaid-c4-syntax.md`** for syntax reference.

8. **Read all files in `.claude/skills/diagram/learnings/`** (glob `*.md`, skip `_index.md`). Apply them as additional constraints during generation. Count them.

9. **If a resource path was provided**, read that file for supplementary context.

10. **Output a research summary** to the user:
    ```
    Project: <title> (<id>)
    C4 level: <level>
    Primary concern: <concern>
    Flow direction: <direction>
    Nodes: <count> defined
    Edges: <count> defined
    Learnings applied: <N> from previous sessions
    Gaps/ambiguities: <list or "none">
    ```

---

## Phase 2: Interview (skip if brief is complete and unambiguous)

Ask questions only where genuine ambiguity exists. Batch related questions into one AskUserQuestion call. Maximum 3 question batches.

Consider asking about:
- Nodes or edges the brief is missing but the user might want
- Flow direction when multiple are plausible
- Boundary groupings (e.g., "should these services share a boundary box?")
- If no `diagram-briefs.md` entry exists: ask the user to describe the main components and data flows verbally

Do NOT ask about things already clear in the brief.

---

## Mermaid preview vs Excalidraw export

The Mermaid diagram (Phases 3–5) is an approximation. Mermaid C4 has no native support for dashed edge styles or open arrowheads, so sync/async distinction from `docs/system-design.md` §9.3 cannot be fully applied there. Use `[async]` in edge labels as a workaround.

The Excalidraw path (Phase 6B) is where system-design.md rules get fully applied: dashed lines, arrowhead style (filled triangle for sync, open for async), and orthogonal routing are all controllable at the element level. When diagram accuracy matters more than a quick preview, skip straight to Phase 6B.

---

## Phase 3: Draft Mermaid diagram

### Guardrails (apply before generating)

**Defaults**
- Default diagram type: `C4Container` (container level). Override only if brief explicitly states context or component level.
- Default view: structural (what exists and how connected). Reserve sequence diagrams for when the brief emphasizes "flow" or "steps" with temporal language (first, then, after, finally, triggers, waits for).
- Default edge style: sync/solid (`Rel`). Use dashed only when brief explicitly says async/event/webhook.
- Default layout: top-to-bottom (`TB`). Switch to left-to-right only when the flow direction in the brief says LR or the diagram is clearly pipeline-shaped.

**Abstraction rules**
- Snap mixed abstractions to a single level. If the brief mixes container-level and component-level nodes, pick the level that covers more nodes and promote/demote the rest. Note the snapping decision in a comment inside the `.md` source file.
- Cap at ~20 nodes. If the brief has more, group related services into a single aggregate container and add a note explaining the grouping.
- Never invent components not in the brief or `architectureNotes`. If you fill a logical gap, mark the node with `(assumed)` in its description and use a dashed border via `UpdateElementStyle`.
- **Passive-store check (mandatory):** Before finalising the edge list, scan for any arrow whose source is a database, cache, queue, or other passive store (`ContainerDb`, `ContainerQueue`, or any node described as a DB/cache/registry/index). A passive store cannot initiate a call. If found, identify the orchestrating service that actually drives the interaction and redirect the arrow from there.
- **Pull vs push check:** For any edge labeled "periodic", "pulls", "fetches", or "syncs", confirm the arrow points from the consumer (the node that initiates) to the producer, not in the direction the data flows.

**Conflict resolution (priority order, highest first)**
1. Deployment topology beats code structure (if both are described)
2. Runtime behavior beats static configuration
3. External system boundaries beat internal groupings
4. User-visible flows beat internal plumbing

**Naming**
- Node labels: domain vocabulary from the brief. No generic names like "Backend", "Service", "API" alone.
- Edge labels: verb + object format. "creates order", "publishes event", "reads profile". Strip "via REST"; put the protocol in the technology field.
- Boundary labels: describe what the boundary represents (team, deployment zone, trust perimeter), not just "System".

**Scenario detection**
- If the brief has temporal language (first, then, after, finally, triggers, waits for, steps, sequence): suggest a sequence diagram instead of C4 structural. Ask user via AskUserQuestion before switching.
- If the brief mixes two distinct user journeys with no shared infrastructure: suggest splitting into two diagrams.

### Role-to-primitive mapping

| Role | Primitive |
|------|-----------|
| Person (human user) | `Person(alias, "Name", "Description")` |
| Web/frontend app | `Container(alias, "Name", "Tech", "Description")` |
| API / backend service | `Container(alias, "Name", "Tech", "Description")` |
| Database / data store | `ContainerDb(alias, "Name", "Tech", "Description")` |
| Queue / stream | `ContainerQueue(alias, "Name", "Tech", "Description")` |
| External SaaS / system | `System_Ext(alias, "Name", "Description")` |
| Deployment/trust zone | `Boundary(alias, "Label", "type") { ... }` |

### Edge mapping

- Sync call: `Rel(from, to, "label")` or `Rel(from, to, "label", "tech")`
- Async / event: `Rel(from, to, "label", "async")` with dashed style via `UpdateRelStyle`
- Never use `BiRel`. Use two separate `Rel` calls with distinct labels.
- Directional hints (`Rel_D`, `Rel_U`, `Rel_L`, `Rel_R`): use when layout is ambiguous without them.

### Color application

Apply colors from `.claude/skills/diagram/references/color-palette.md`. Font color always equals border color ; they form the "dark" half of the pastel pair:
- Person: `$bgColor="#dbe4ff" $borderColor="#748ffc" $fontColor="#748ffc"`` (always override); default is dark navy
- UI/frontend: `$bgColor="#a5d8ff" $borderColor="#1971c2" $fontColor="#1971c2"`
- Service/API: `$bgColor="#96f2d7" $borderColor="#099268" $fontColor="#099268"`
- Database/cache/store: `$bgColor="#ffd8a8" $borderColor="#e8590c" $fontColor="#e8590c"`
- Queue/stream/topic: `$bgColor="#ffc9c9" $borderColor="#e03131" $fontColor="#e03131"``: use `ContainerQueue` primitive
- External systems: `$bgColor="#e9ecef" $borderColor="#868e96" $fontColor="#868e96"`` (always override); default is dark navy

Apply via `UpdateElementStyle(alias, ...)` for each non-default node. Person shape in C4Container is a fixed box with icon ; no circle override is possible via the Mermaid API.

### Node text structure (3-level)

Each node carries three tiers of information:
```
Name
[Technology / stack]
Short responsibility: one clause
```

In Mermaid C4, this maps directly to the four-parameter primitive:
`Container(alias, "Name", "Technology", "Description")`

In Excalidraw, use a multiline bound text element with the name on the first line (larger, ~16px), `[Technology]` on the second line (smaller, ~12px, italic or bracketed), and the description on the third line (smaller, ~12px). All text uses the border color of the node.

### Title format

- Mermaid `title` field: `<Company>: <Project> (<period>)`, e.g. `VONQ: Meeting Assistant (2025–2026)`. For personal/OSS projects with no employer: `<Project> (<period>)`, e.g. `DeepIce: FastAPI Reference App (2023–present)`.
- H1 heading in the `.md` file: `# <Company>: <Project> (<period>) / <Diagram type>`, e.g. `# VONQ: Meeting Assistant (2025–2026) / Container Diagram`.
- Excalidraw: add a subtitle text element below the diagram title, e.g. "Container Diagram".

### Edge mapping: directional hints

- Never use `Rel_D`, `Rel_U`, `Rel_L`, `Rel_R` ; directional Rel variants collapse layout when combined with `Boundary`. Use plain `Rel()` only.

### Output

Write the diagram to **`src/diagrams/<id>.md`** as a Markdown file with a mermaid code block. This is the single source file ; it serves as both the committed diagram source and the Cursor-previewable file. Do NOT create a separate `.mmd` file alongside it.

Format:
```markdown
# <Company>: <Project> (<period>) / <Diagram type>

```mermaid
[MERMAID CODE]
```
```

Create `src/diagrams/` if it doesn't exist.

---

## Phase 4: Local preview

**Primary method (Cursor IDE):**

1. Open the `.md` file directly in Cursor:
   ```bash
   cursor src/diagrams/<id>.md
   ```

2. Tell the user: "Press **Cmd+Shift+V** (or Cmd+K V for side-by-side) to preview the diagram."

The `.md` file IS the source; no separate preview file needed. It is committed to git.

**Fallback (browser):**

If Cursor isn't available, write `src/diagrams/<id>-preview.html` (gitignored):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><Project Title>: Diagram Preview</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  <script>mermaid.initialize({ startOnLoad: true, theme: 'default' });</script>
  <style>body { font-family: sans-serif; padding: 2rem; background: white; }</style>
</head>
<body>
  <h2><Project Title>: Architecture Diagram</h2>
  <div class="mermaid">
[MERMAID CODE]
  </div>
</body>
</html>
```

Then: `open src/diagrams/<id>-preview.html`

---

## Phase 5: Refine (iterative loop)

1. Ask user for feedback via AskUserQuestion.
2. Apply corrections to `src/diagrams/<id>.mmd` and regenerate the preview file.
3. Repeat until user says the diagram is approved.

**After each correction, evaluate generalizability:**
- If the correction applies broadly across diagrams (e.g., "don't use nested boundaries for queues", "always show the CDN as an external system"): save it to `learnings/` automatically and mention it to the user.
- If it's project-specific (e.g., "add the Redis cache node here"): apply it but don't save.
- If ambiguous: ask "Should I remember this rule for future diagrams?"

**Learning quality bar: apply before saving:**
Learnings must be project-agnostic principles, not records of what happened on a specific diagram. Before writing, ask: "Would this rule apply unchanged to a completely different project?" If the answer requires substituting project names, it's too specific. Generalize or don't save.

- Good: "Never use `System_Boundary` with directional Rel hints; it collapses layout."
- Bad: "For TrueStory, removed System_Boundary because layout broke."
- Good: "For pull-based relationships, draw arrows FROM initiator TO dependency."
- Bad: "Reversed the news→api arrow because TrueStory's API initiates the crawl."

Do not include project-specific node names, code, or identifiers in the rule body. Use generic placeholders (`ServiceA`, `externalSource`, `callerService`) if an example is needed to illustrate the rule.

**Learning file format** (save to `.claude/skills/diagram/learnings/<topic>-NNN.md`):

```markdown
---
topic: layout | styling | mermaid-syntax | labeling | edge-semantics | integration
source: <project name> session (<date>)
---

<Universal rule: one or two sentences. Must apply to any diagram, not just the source project.>

**Why:** <reasoning that holds for any diagram, no project names>

**Anti-pattern:** <generic description of what to avoid>

**Fix:** <generic description of the correct approach, with placeholder names if an example helps>
```

After saving any learning, update `.claude/skills/diagram/learnings/_index.md` to add a one-line entry:
```
- [<topic>: <one-line summary>](<filename>), source: <project>, <date>
```

---

## Phase 6: Export and integrate

Once the user approves the diagram, ask one question before exporting:

> "The Mermaid diagram is approved. How would you like to export it?
> (a) SVG via mermaid-cli: generates a static SVG, integrated directly into the site
> (b) Excalidraw via MCP: opens in Excalidraw for manual polish, then export from there
>
> Type 'a' or 'b'."

### Option A: SVG export

Follow `.claude/skills/diagram/references/integration-checklist.md` step by step:

1. **SVG export** (source is `.md`, extract the mermaid block first):
   ```bash
   mkdir -p public/diagrams
   awk '/^```mermaid/{f=1;next} /^```/{f=0} f' src/diagrams/<id>.md | \
     bunx mmdc -i /dev/stdin -o public/diagrams/<id>.svg -t default -b transparent
   ```
   Note: first run downloads Chromium via Puppeteer (~200MB). Warn the user before running.

   If `mmdc` not available: `bun add -d @mermaid-js/mermaid-cli`

2. **Verify the SVG:**
   - Open `public/diagrams/<id>.svg` in a browser: `open public/diagrams/<id>.svg`
   - Confirm: transparent background, text readable at ~700px width

3. **Update `src/data/projects.ts`:** Set `diagramFile: '<id>.svg'` on the matching project entry.

4. **Create `src/components/DiagramViewer.tsx`** if it doesn't exist:
   ```tsx
   import { cn } from "@/lib/utils";

   interface Props {
     diagramFile: string;
     projectTitle: string;
   }

   export function DiagramViewer({ diagramFile, projectTitle }: Props) {
     const src = `${import.meta.env.BASE_URL}diagrams/${diagramFile}`;
     return (
       <img
         src={src}
         alt={`Architecture diagram for ${projectTitle}`}
         className={cn("w-full rounded-md", "dark:invert")}
       />
     );
   }
   ```

5. **Update `src/components/ProjectCard.tsx`:** Import `DiagramViewer` and replace the placeholder block (the dashed div shown when `!project.diagramFile && project.architectureNotes`) with:
   ```tsx
   {project.diagramFile && (
     <DiagramViewer diagramFile={project.diagramFile} projectTitle={project.title} />
   )}
   {!project.diagramFile && project.architectureNotes && (
     <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground text-center">
       Architecture diagram coming in iteration 2
     </div>
   )}
   ```

6. **Update `.gitignore`** (first diagram only):
   ```
   # Diagram preview files (dev only)
   src/diagrams/*-preview.md
   src/diagrams/*-preview.html
   ```

7. **Post-flight:**
   ```bash
   bun run build
   bun run preview
   ```
   Visually confirm the diagram appears in the expanded card in both light and dark mode.

### Option B: Excalidraw via MCP

**Style rule (always apply):** All Excalidraw elements must use `"roughness": 1` and `"fontFamily": 1` (Virgil, the handwriting font). Never use `roughness: 0`; it produces a sterile CAD look. The hand-drawn sketch aesthetic is intentional and must be preserved across all diagram exports.

1. Check if the `mcp__claude_ai_Excalidraw__export_to_excalidraw` tool is available. If not, tell the user: "The Excalidraw MCP is not connected in this session. Start it and re-run, or choose option (a) instead."

2. Translate the approved Mermaid diagram into Excalidraw element JSON. Apply these rules, all derived from `docs/system-design.md` §9.2–9.3 and `references/color-palette.md`:

   **Node styling (boxes):**
   - `"roughness": 1`, `"fontFamily": 1` (Virgil) on every element; non-negotiable, preserves hand-drawn aesthetic
   - Active runtime containers: rounded rectangle (`"type": "rectangle"`, `"roundness": {"type": 3}`)
   - **Person/Actor: circle/ellipse** (`"type": "ellipse"`) with the indigo palette (`#dbe4ff` fill, `#748ffc` stroke/text). Mermaid's `Person()` renders as a fixed box; Excalidraw is the only place this distinction can be made.
   - **Artifact/generated file: non-rounded rectangle** (`"type": "rectangle"`, `"roundness": null`, sharp 90° corners) with amber palette (`#fef9c3` fill, `#ca8a04` stroke/text). Sharp corners signal "passive output, not a runtime actor." Mermaid: `System_Ext` with amber override.
   - **Queue/stream/topic: rounded rectangle** with red palette (`#ffc9c9` fill, `#e03131` stroke/text). Same shape as active containers; differentiated by color only. Mermaid: `ContainerQueue`.
   - Use **pastel fills** from `color-palette.md` (not saturated): `#a5d8ff` UI, `#96f2d7` service, `#ffd8a8` DB/cache, `#ffc9c9` queue/stream, `#e9ecef` external
   - Text color = border color (same pairing as Mermaid: teal service nodes use `#099268` text, indigo person nodes use `#748ffc` text, etc.)
   - Use bound text elements (`containerId`) for all node labels; inline `label` shorthand is stripped by `export_to_excalidraw`
   - Set `"boundElements"` arrays on shapes pointing to their text and arrow IDs
   - **3-level text per node:** Name (larger, ~16px) / [Technology] (smaller, ~12px) / description (smaller, ~12px). All text at border color.
   - **Boundary boxes:** fill `#eaddd7` (inner/nested) or `#f8f1ee` (outer), stroke `#846358`, title text `#846358` (never role-colored, never `#1e1e1e`). Two stroke semantics: `"strokeStyle": "dashed"` for grouping/trust/deployment boundaries; `"strokeStyle": "solid"` for expansion frames (one container zoomed in to show its internal components). Document both in the legend whenever a solid expansion frame appears on the diagram.

   **Meta-tags on edge labels (Excalidraw only; strip them):**
   Remove `[async]`, `[cron]`, and `[async, secondary]` from all Excalidraw edge labels. Stroke style + arrowhead already encode the full meaning. Keep only semantic content (e.g., "reports errors" not "reports errors [async, secondary]"). Exception: keep `(planned)` and `(assumed)`; these are semantic, not style hints.

   **Legend box (mandatory on every diagram):**
   - Shape: **non-rounded rectangle** (`"type": "rectangle"`, `"roundness": null`, sharp 90° corners), **no border** (`"strokeColor": "transparent"`)
   - Fill: `#ffec99` (light yellow)
   - Fill style: **`"hachure"`** (diagonal hatching)
   - Text: `#1e1e1e`
   - Required content:
     - Arrow styles → interaction types (all four combinations)
     - **"Arrows point from initiator to dependency"** (mandatory direction rule)
     - Color → role mapping (blue=UI, teal=service, orange=DB/cache, red=queue/stream, gray=external, indigo=person, amber=artifact)
     - Boundary stroke vocabulary when both types appear: `╌╌╌ GROUPING BOUNDARY` / `─── ZOOM-IN / EXPANDED CONTAINER`

   **Arrow styling (edges):**

   | Interaction type | `strokeStyle` | `endArrowhead` | When |
   |-----------------|--------------|----------------|------|
   | Sync call (default) | `"solid"` | `"triangle"` | Blocking request/response; sender waits for return |
   | Async / fire-and-forget | `"solid"` | `"arrow"` | Primary path async: sender's main job IS this dispatch (e.g., enqueue task) |
   | Cron / polling / dependency | `"dashed"` | `"triangle"` | Scheduled/periodic fetch; build-time dependency; sender blocks when it runs |
   | Secondary / background async | `"dashed"` | `"arrow"` | Use ONLY when both conditions hold: (1) not on main request path AND (2) fire-and-forget. Canonical: error reporting to Sentry, log shipping, telemetry push. If the primary user action still succeeds when this call fails, it qualifies. |

   **Exactly four combinations.** Two arrowhead values: `"triangle"` (filled, sync) and `"arrow"` (open stick, async); never `"triangle_outline"`. **All arrows use `#1e1e1e`.** Stroke/head encodes the full meaning; color adds nothing and must not vary.

   - Arrow stroke color: `#1e1e1e` for all edges, no exceptions
   - Arrow label: bound text element with `containerId` pointing to the arrow id

   **Arrow endpoint binding (mandatory):** Every arrow must use `startBinding` and `endBinding` with a non-zero `gap` so the arrowhead attaches to the node's border, not its center. Without this, Excalidraw routes all arrows through the center of each box, overlapping text and making the diagram illegible.

   ```json
   "startBinding": { "elementId": "<source-node-id>", "focus": 0, "gap": 8 },
   "endBinding":   { "elementId": "<target-node-id>", "focus": 0, "gap": 8 }
   ```

   - `gap`: minimum 8px; increase to 12–16px for nodes with dense incoming edges
   - `focus`: use `0` for a single edge between two nodes; use `-0.3` / `+0.3` (or similar offsets) when two parallel edges connect the same pair of nodes, so the lines separate visually
   - Never omit `startBinding`/`endBinding`; floating arrows (no binding) drift on every render and lose their attachment to nodes entirely

3. Call `mcp__claude_ai_Excalidraw__export_to_excalidraw` with the full Excalidraw JSON and return the shareable URL to the user.

4. Tell the user: "Polish it in Excalidraw if needed, then export as SVG with transparent background. Save to `public/diagrams/<id>.svg` and I'll wire up the integration steps."

5. Offer to complete the integration steps (steps 3–7 from Option A) once the user has the SVG ready.

---

## Phase 7: Review, backpropagate, and close the loop

This phase runs after the user provides the final SVG path and Excalidraw URL. It closes the loop between the polished diagram and all four source-of-truth files.

### Step 1: Wire up the project entry

Add `diagramFile: '<id>.svg'` and `diagramExcalidrawUrl: '<url>'` to the matching entry in `src/data/projects.ts`. Run `bun run build` to confirm no type errors.

### Step 2: Review the exported diagram against three sources

Compare the final Excalidraw rendering against:
- The approved Mermaid source (`src/diagrams/<id>.md`)
- The diagram brief (`docs/diagram-briefs.md`)
- The project card description (`src/data/projects.ts`)

For each discrepancy ask: "Was this a deliberate correction made during Excalidraw polish, or just visual layout?" Deliberate corrections must backpropagate. Layout choices (spacing, curvature) do not.

Common correction types to look for:
- Node label or role rename (e.g., "Pinecone" → "Vector Index")
- Edge direction or initiator change (e.g., widget→clientSite → candidate→clientSite)
- Combined vs split edges (e.g., two req-resp arrows → one combined edge)
- New insight surfaced during review (e.g., same embedding model constraint)

### Step 3: Backpropagate corrections to all four files

Apply the CLAUDE.md Content Sync Rule. For every correction identified in Step 2:

| File | What to update |
|------|---------------|
| `src/diagrams/<id>.md` | Node names, edge labels, intro paragraph |
| `docs/diagram-briefs.md` | Nodes table (alias, name, role, tech), edges list, design constraints |
| `src/data/projects.ts` | Description if a new architectural insight emerged |
| `docs/portfolio-blueprint.md` | Only if project scope or status changed |

### Step 4: Save new learnings

Evaluate every correction from Step 2 against the Phase 5 quality bar. Save any that are project-agnostic principles to `learnings/` and update `learnings/_index.md`.

### Step 5: Commit discipline

Always commit in two separate commits:
1. **Skill/learnings first**: `.claude/skills/diagram/` changes, any updated `docs/system-design.md`
2. **Diagram artifacts second**: `public/diagrams/<id>.svg`, `src/data/projects.ts`, `src/diagrams/<id>.md`, `docs/diagram-briefs.md`

This keeps learning evolution distinct from project work in git history, and ensures the skill is always in a clean state before the diagram commit references it.

---

## Reference files

- `.claude/skills/diagram/references/mermaid-c4-syntax.md`: C4 syntax, primitives, working TrueStory example
- `.claude/skills/diagram/references/color-palette.md`: node/edge color mappings, dark mode notes
- `.claude/skills/diagram/references/integration-checklist.md`: Phase 6 detailed checklist

## Learnings directory

- `.claude/skills/diagram/learnings/`: auto-maintained across sessions
- Read all `.md` files here at Phase 1 startup
- Write new files here after generic corrections in Phase 5
- Keep `_index.md` up to date after every write
