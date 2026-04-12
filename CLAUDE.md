# Portfolio Dev Guide

Static portfolio site for Cosmin Poieana. Vite + React + TypeScript + Tailwind + shadcn/ui. Deploys to `cmin764.github.io/portfolio` via GitHub Actions.

## Commands

```bash
bun dev          # dev server
bun run build    # typecheck + build (always test this before pushing)
bun run preview  # serves from /portfolio/ base — use this to catch asset path issues
bun run typecheck
```

## Key Rules

- Package manager: **bun only**. Never npm or yarn.
- `cn()` for all className composition (from `@/lib/utils`).
- Semantic color tokens only (`bg-background`, `text-foreground`, etc.). Never `bg-white` or `text-gray-700`.
- All URLs in `src/lib/constants.ts`. Never inline them.
- External links: `target="_blank" rel="noopener noreferrer"`.
- `<Link to="...">` for internal nav. Never `<a href="...">` for same-origin paths.
- No `React.FC`. Function declarations: `function Foo({ ... }: Props)`.
- No `any`. `interface` for props, `type` for data shapes.
- `import type` for type-only imports.
- Static data arrays live outside component functions.
- Icon-only buttons need `aria-label`.
- Collapsible elements need `aria-expanded`.

## Architecture

- `src/data/` — typed TS data files (no JSON, no markdown, no CMS)
- `src/components/ui/` — shadcn primitives, never edit directly
- `src/components/` — portfolio components built on shadcn primitives
- `src/hooks/` — useTheme, useDocumentTitle, useFilter
- `src/lib/` — cn() utility + constants
- `src/pages/` — Index (single page), NotFound

## Do Not

- Add error boundaries, loading spinners, or suspense — data is synchronous
- Create per-project detail pages (iteration 1: expandable cards only)
- Add search (category filter tabs are sufficient)
- Add animation libraries (Tailwind transitions only)
- Add a contact form (CTAs are external links)
- Edit files in `src/components/ui/` — use props, `cn()`, or theme tokens
- The `architectureNotes` field in ProjectData is for diagram creation only — never render it in the UI
