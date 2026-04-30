# Color Palette and Style Mappings

Derived from `docs/system-design.md` section 9.2 and the reference Excalidraw export (traced-ai.svg).
Hex codes are the authoritative values; use these for all Excalidraw exports and Mermaid overrides.

---

## Node colors by role

Each role has three paired values: a pastel fill, a darker border, and a matching text color that equals the border color. Text and border are always the same value; they form the "dark" half of the pair, the fill is the "light" half.

| Role | Fill (bg) | Stroke | Text | Notes |
|------|-----------|--------|------|-------|
| UI / Frontend / Web App | #a5d8ff | #1971c2 | #1971c2 | Light blue bg, dark blue border + text |
| Service / API / Worker | #96f2d7 | #099268 | #099268 | Light mint bg, dark teal border + text |
| Database / Data Store / Cache / Index / Registry | #ffd8a8 | #e8590c | #e8590c | Light peach bg, dark orange border + text. Includes caches, indexes, registries, key-value stores: any passive state holder. |
| Queue / Stream / Topic / Pub-Sub | #ffc9c9 | #e03131 | #e03131 | Light red bg, dark red border + text. Only true messaging primitives (queues, streams, topics, pub-sub buses). Mermaid: `ContainerQueue`. |
| External System / SaaS | #e9ecef | #868e96 | #868e96 | Near-white bg, gray border + text |
| Person | #dbe4ff | #748ffc | #748ffc | Light indigo bg, indigo border + text, distinct from UI sky blue. **Excalidraw: render as circle/ellipse** (`"type": "ellipse"`). Mermaid `Person()` is a fixed box with icon; no shape override possible. |
| Generated artifact / file | #fef9c3 | #ca8a04 | #ca8a04 | Light amber bg, amber border + text: for files, exports, generated documents (not live runtime actors). **Excalidraw: non-rounded rectangle** (`"type": "rectangle"`, `"roundness": null`, sharp 90° corners). Sharp corners contrast with rounded rectangles used by all active containers. Mermaid has no artifact primitive; use `System_Ext` with amber override. |

## Node text structure

**Mermaid C4**: four-parameter primitive already separates the tiers:
```
Container(alias, "Name", "Technology", "Description (status if applicable)")
```

**Excalidraw**: multiline bound text element, 2–4 lines:
```
Name                          ← ~16px, bold
<Type>                        ← ~12px  optional, e.g. <Container>, <Component>; omit when role is obvious from color or context
[Technology / stack]          ← ~12px  e.g. [Flask + REST], [PostgreSQL]
Short responsibility (status) ← ~12px  (planned) or (assumed) appended inline
```

Bracket semantics (Excalidraw only; Mermaid uses function names for type):
- `<>`: C4 abstraction level / role
- `[]`: technology stack
- `()`: optional status qualifier (`(planned)`, `(assumed)`)

Never use `[]` for both type and technology on the same node. All text color = node border color.

---

Seven semantic roles, each mapping to a genuinely distinct runtime character (UI, service, data store, messaging, external, person, artifact). Do not collapse them. The artifact amber applies only when a node is explicitly a generated file/export, not a live actor. The indigo person color is typically one node per diagram. In practice most diagrams use 4-5 of the seven roles.

**Color by runtime role, not technology.** Ask: "does this node execute business logic and respond to requests, or does it passively hold data?" If the latter, use the data store palette (peach/orange); even if it is Redis, Memcached, S3, or any product with "service" in its name. Caches, registries, indexes, and key-value stores that hold reference data are data stores. Only use teal if the node has its own endpoints and executes logic.

---

## Boundary / grouping boxes

Boundary boxes use neutral bronze tints. Shade depth signals nesting level; lighter for the outermost frame, one shade darker for any inner boundary nested inside it. Role distinction comes from the title color only, never the fill.

| Element | Fill | Stroke | Title text | When |
|---------|------|--------|------------|------|
| Outer / only boundary | `#f8f1ee` (bronze-1) | `#846358` | `#846358` | Default: the single boundary on a diagram, or the outermost in a nested pair |
| Inner boundary (nested) | `#eaddd7` (bronze-2) | `#846358` | `#846358` | Only when a smaller boundary sits visually inside a larger one |

Never go darker than bronze-2 unless you have three or more nesting levels (rare). Never use role-specific fills (blue, teal) for boundary boxes. The shade hierarchy provides depth; title color is the only other differentiator.

---

## Arrow colors

All arrows use `#1e1e1e`. Stroke/head combination encodes the full semantic, color adds nothing.

---

## Edge styles

Exactly four combinations. Line style and arrowhead together carry the full semantic; no other combination is valid.

| Meaning | Line | Arrowhead | Excalidraw JSON | Mermaid label suffix |
|---------|------|-----------|-----------------|----------------------|
| Sync call (default) | Solid | Filled triangle | `strokeStyle:"solid"`, `endArrowhead:"triangle"` | _(none)_ |
| Async / fire-and-forget | Solid | Open stick | `strokeStyle:"solid"`, `endArrowhead:"arrow"` | `[async]` |
| Cron / polling / dependency | Dashed | Filled triangle | `strokeStyle:"dashed"`, `endArrowhead:"triangle"` | `[cron]` |
| Secondary / background async | Dashed | Open stick | `strokeStyle:"dashed"`, `endArrowhead:"arrow"` | `[async, secondary]` |

**All arrows use `#1e1e1e`.** Never vary arrow color; stroke/head combination already encodes the full meaning.

**Arrowhead key: two values only, never `triangle_outline`:**
- `"triangle"` = closed filled triangle = sync (sender blocks waiting for return)
- `"arrow"` = open stick = async (sender continues immediately, no return expected)

**Decision tree:**
1. Sender blocks waiting for a return? → solid + `"triangle"`
2. Fire-and-forget on the primary runtime path? → solid + `"arrow"`
3. Scheduled/cron trigger or build-time dependency? → dashed + `"triangle"`
4. Secondary/background async (telemetry, log shipping)? → dashed + `"arrow"`

**Mermaid limitation:** C4Container has no native arrowhead or dash control. Use label suffixes (`[async]`, `[cron]`) to document the intent. Apply full visual styles only in Excalidraw exports.

Default to sync/solid when the brief does not specify.

---

## Edge label format

Normalize to `verb + object`:
- "creates order", "reads profile", "publishes OrderCreated"
- "queries by URL", "crawled articles", "hash(in) + hash(out)"

Strip noise: "via REST API" goes in the technology annotation field, not the label.

---

## Legend and annotation boxes

| Element | Fill | Stroke | Text |
|---------|------|--------|------|
| Legend box (arrow key, notes) | #ffec99 | none (borderless), `hachure` fillStyle | #1e1e1e |
| Warning / callout box | #fcc2d7 | #c2255c | #1e1e1e |

Legend box style: light yellow (#ffec99), **no border** (`strokeColor: "transparent"` or stroke width 0), **sharp corners** (`"roundness": null`, non-rounded rectangle), **hachure fill** (`fillStyle: "hachure"`), black text. Sharp corners and diagonal hatching distinguish the legend from diagram nodes, which all use rounded rectangles with solid fills and borders.

**Canonical legend content (mandatory on every diagram):**
```
Legend:
  ── (solid + filled ▶)   Sync call (sender blocks)
  ─▷ (solid + open ▷)    Async / fire-and-forget
  ╌╌ (dashed + filled ▶) Cron / polling / dependency
  ╌╌▷ (dashed + open ▷)  Secondary background async

  ↓ Arrows point from initiator to dependency

  Color → role:
  [blue]   UI / Frontend
  [teal]   Service / API
  [orange] DB / Cache / Store
  [red]    Queue / Stream / Topic
  [gray]   External system
  [indigo] Person / User
  [amber]  Generated artifact (sharp corners)

  ╌╌╌ GROUPING BOUNDARY (dashed)
  ─── ZOOM-IN / EXPANDED CONTAINER (solid)
```

The direction rule ("Arrows point from initiator to dependency") must appear in every legend. Readers must be able to understand edge direction without external documentation.

---

## Dark mode compatibility

**Scope:** `dark:invert` applies only to exported SVGs rendered via `<img>` in the portfolio. Mermaid C4 diagrams render on their own white canvas (in Cursor preview or a browser), so the pastel fills with dark text are already legible there regardless of editor dark mode; no special handling needed for the Mermaid preview.

The portfolio uses `dark:invert` on the `<img>` tag for diagram SVGs. This means:
- White/light backgrounds invert to dark; the light fills above (peach, mint, light blue) survive reasonably
- **Avoid pure black** (#000000) fills: they become pure white when inverted
- **Avoid very light fills below ~#e0e0e0**: they become very dark and swallow text
- The bronze boundary tint (#eaddd7) inverts to a dark brown, acceptable as a boundary
- The post-it yellow (#ffec99) inverts to a dark purple-blue, acceptable for legend boxes

---

## Mermaid C4 styling commands

Use the same pastel palette for both Mermaid and Excalidraw. The C4Container library renders its own light-background canvas, so pastel fills with `#1e1e1e` text remain legible regardless of editor dark mode.

```
UpdateElementStyle(alias, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")  // service
UpdateElementStyle(alias, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")  // database / cache / store
UpdateElementStyle(alias, $fontColor="#e03131", $bgColor="#ffc9c9", $borderColor="#e03131")  // queue / stream / topic
UpdateElementStyle(alias, $fontColor="#1971c2", $bgColor="#a5d8ff", $borderColor="#1971c2")  // UI
UpdateElementStyle(alias, $fontColor="#868e96", $bgColor="#e9ecef", $borderColor="#868e96")  // external
UpdateElementStyle(alias, $fontColor="#ca8a04", $bgColor="#fef9c3", $borderColor="#ca8a04")  // artifact (Mermaid: use System_Ext)
```

Apply only when the default Mermaid C4 colors diverge from this palette. Always override Person nodes explicitly; the default is a dark navy that clashes with dark text.

```
UpdateElementStyle(alias, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")  // person
```

**Note on Person shape in Mermaid C4:** The `Person` primitive renders as a fixed rectangular shape (box with person icon). No shape override is possible: `$shape="circle"` in `UpdateElementStyle` is silently ignored, and `EightSidedShape()` is not recognized by the bundled Mermaid version. Color is the only available differentiator; use the light indigo palette above.

**Excalidraw node fills** use the pastel palette from the "Node colors by role" table above (light bg + dark text). Never use saturated fills in Excalidraw; they work on dark Mermaid canvas but are too heavy on Excalidraw's light canvas.
