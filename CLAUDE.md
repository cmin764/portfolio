# Portfolio Dev Guide

Static portfolio site for Cosmin Poieana. Vite + React + TypeScript + Tailwind + shadcn/ui. Deploys to `cmin764.github.io/portfolio` via GitHub Actions.

## Commands

```bash
bun dev          # dev server
bun run build    # typecheck + build (always run before pushing)
bun run preview  # serves from /portfolio/ base, use this to catch asset path issues
bun run typecheck
```

## Stack

- **React 19** + TypeScript 5, **Vite 8**, `@vitejs/plugin-react` (not `-swc`, no SWC plugins in use)
- **Tailwind CSS 3.4** — HSL color tokens as CSS custom properties in `src/index.css`, `darkMode: ["class"]`
- **shadcn/ui** — primitives in `src/components/ui/`, never edit directly
- **React Router DOM 7** — single route in `src/App.tsx`, `basename="/portfolio"`
- **lucide-react 1.x** — brand icons (`Github`, `Linkedin`, `Medium`) were removed in v1; use inline SVGs for those, lucide for everything else
- **Package manager**: bun only, never npm or yarn

## Copy and Voice

All text in `src/data/` and `src/pages/` is published content. Write like a person, not a language model.

**Never use em dashes (—).** Replace with:
- Colon to introduce a list, explanation, or result
- Comma for closely related clauses
- Period + new sentence when two independent thoughts follow each other
- Parentheses for incidental asides

Also avoid: "seamlessly", "robust", "leverage", trailing summaries restating what was just said, and any opener that could appear in a default ChatGPT response. One clear thought per sentence.

## Coding Rules

**Styling**
- `cn()` from `@/lib/utils` for all className composition. Never concatenate class strings manually.
- Semantic color tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-muted`, `bg-secondary`, `bg-cta`, `text-cta-foreground`, etc. Never `bg-white` or `text-gray-700`.
- `animate-fade-in` is the only animation class (hero section). Add no others without adding the keyframe to `tailwind.config.ts` and a `prefers-reduced-motion` fallback in `index.css`.
- Inline `style` only for values with no Tailwind equivalent (e.g. `animationDelay`).

**Navigation**
- `<Link to="...">` for all internal navigation. Never `<a href="...">` for same-origin paths.
- External links: `target="_blank" rel="noopener noreferrer"`.

**TypeScript**
- No `any`. No `React.FC`. `import type` for type-only imports.
- `interface` for component props, `type` for data shapes.

**Components**
- Static data arrays belong outside component functions. Inside, they create new references on every render.
- Never edit `src/components/ui/`. Customize via props, `cn()`, or theme extension.
- All URLs in `src/lib/constants.ts`, never inline.

**Accessibility**
- Icon-only interactive elements need `aria-label`.
- Collapsible elements need `aria-expanded={bool}`.

## Architecture

```
src/
  data/             # typed TS constants — the single source of truth for all content
    types.ts        # ProjectData, Category, Complexity, ProjectStatus, ProjectLink
    categories.ts   # CATEGORIES array
    projects.ts     # PROJECTS array (edit content here, not in components)
  components/
    ui/             # shadcn primitives — never edit
    layout/         # Header, Footer, Layout
    ProjectCard.tsx, CategorySection.tsx, ComplexityBadge.tsx, TechTag.tsx, FilterBar.tsx
  hooks/            # useTheme, useDocumentTitle, useFilter
  lib/              # cn() + constants
  pages/            # Index (single scrollable page), NotFound
```

The `architectureNotes` field on `ProjectData` is for diagram generation only. Never render it in the UI.

## Content Sync Rule

Four files describe each project. They must stay consistent with each other at all times:

| File | What it owns |
|------|-------------|
| `src/data/projects.ts` | Published card copy: description, tags, period, links, `architectureNotes` |
| `src/diagrams/<id>.md` | Mermaid diagram source — nodes, edges, styling |
| `docs/diagram-briefs.md` | Canonical node/edge table and design constraints for diagram generation |
| `docs/portfolio-blueprint.md` | High-level project inventory and status |

When you change one, propagate to the others:
- Remove a node or concept from the diagram? Remove it from the brief's nodes table and from the card description/tags.
- Update the card description or tags? Check the brief and diagram for stale references.
- Update the brief (nodes, edges, constraints)? Reflect the change in the diagram source and card copy.
- Update the blueprint project table? Confirm the card entry in `projects.ts` matches.

The brief and blueprint are the planning layer; the card and diagram are the published layer. They must tell the same story.

## Diagram Skill

Run `/diagram "Project Name"` to generate a C4 architecture diagram for any project card. The skill is a closed loop: it reads the brief and project description, produces a Mermaid draft, iterates with the user, exports to Excalidraw for polish, reviews the final result, backpropagates corrections to all source files, and saves new learnings for the next run.

**Full loop (7 phases):**
1. Research: read `docs/diagram-briefs.md`, `src/data/projects.ts`, `docs/system-design.md`, and all `learnings/`
2. Interview: resolve ambiguities in the brief
3. Draft Mermaid in `src/diagrams/<id>.md`
4. Preview in Cursor (Cmd+Shift+V)
5. Refine with user; save project-agnostic corrections as learnings
6. Export: SVG via mermaid-cli (option a) or Excalidraw via MCP for polish (option b)
7. Review the exported diagram against Mermaid source, brief, and card; backpropagate any corrections to all four files; commit skill/learnings first, then diagram artifacts

**File locations:**
- Mermaid source: `src/diagrams/<id>.md` (committed)
- Exported SVGs: `public/diagrams/<id>.svg` (committed)
- Preview files: `*-preview.html` (gitignored)
- Learnings: `.claude/skills/diagram/learnings/` (auto-maintained, applied on next run)

**After Excalidraw export:** ask for the shareable URL (`https://excalidraw.com/#json=...`) and save it as `diagramExcalidrawUrl` in `src/data/projects.ts`. This makes the SVG clickable, linking it back to the live editable diagram.

**Commit discipline:** always two commits per diagram — skill/learnings changes first, then the diagram artifacts (SVG, projects.ts, diagram source, brief). Keeps learning evolution separate from project work in git history.

**Style guide sync:** whenever you update `docs/system-design.md`, `.claude/skills/diagram/SKILL.md`, or any learnings file, check `docs/diagram-style-guide.md` and `src/components/DiagramLegend.tsx` for stale content and update them in the same commit. The pipeline is: research → `system-design.md` + skill/learnings → `diagram-style-guide.md` + `DiagramLegend.tsx` (conventions layer), then per-diagram: briefs → Mermaid sources → Excalidraw exports → backpropagate to briefs + Mermaid if the export reveals deviations. Every layer must stay in sync.

## Do Not

- Add error boundaries, loading spinners, or suspense (data is synchronous)
- Create per-project detail pages (iteration 1: expandable cards only)
- Add search (category filter tabs are sufficient)
- Add animation libraries (Tailwind transitions only)
- Add a contact form (CTAs are external links)
