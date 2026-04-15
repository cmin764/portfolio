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

## Diagram Skill

Run `/diagram "Project Name"` to generate a C4 architecture diagram for any project card. The skill reads `docs/diagram-briefs.md`, `src/data/projects.ts`, and `docs/system-design.md`, iterates with you in Mermaid, then exports to SVG or directly to Excalidraw via MCP.

- Mermaid source files live in `src/diagrams/<id>.mmd` (committed)
- Exported SVGs go in `public/diagrams/<id>.svg` (committed)
- Preview files (`*-preview.md`, `*-preview.html`) are gitignored
- Learnings from corrections are saved in `.claude/skills/diagram/learnings/` and applied on the next run

## Do Not

- Add error boundaries, loading spinners, or suspense (data is synchronous)
- Create per-project detail pages (iteration 1: expandable cards only)
- Add search (category filter tabs are sufficient)
- Add animation libraries (Tailwind transitions only)
- Add a contact form (CTAs are external links)
