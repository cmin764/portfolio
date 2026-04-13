# Portfolio Dev Guide

Static portfolio site for Cosmin Poieana. Vite + React + TypeScript + Tailwind + shadcn/ui. Deploys to `cmin764.github.io/portfolio` via GitHub Actions.

## Commands

```bash
bun dev          # dev server
bun run build    # typecheck + build (always run before pushing)
bun run preview  # serves from /portfolio/ base — use this to catch asset path issues
bun run typecheck
```

## Stack

- **React 19** + TypeScript 5, **Vite 8**, `@vitejs/plugin-react` (not `-swc`, no SWC plugins in use)
- **Tailwind CSS 3.4** — HSL color tokens as CSS custom properties in `src/index.css`
- **shadcn/ui** — primitives in `src/components/ui/`, never edit directly
- **React Router DOM 7** — single route in `src/App.tsx`, `basename="/portfolio/"`
- **lucide-react 1.x** — brand icons (`Github`, `Linkedin`, `Medium`) removed in v1; use inline SVGs for those
- **Package manager**: bun only, never npm or yarn

## Copy and Voice

All text in `src/data/` and `src/pages/` is published content. Write like a person, not a language model.

**Never use em dashes (—).** Replace with:
- Colon to introduce a list, explanation, or result
- Comma (or comma + "which"/"so") for closely related clauses
- Period + new sentence when two independent thoughts follow each other
- Parentheses for incidental asides

Also avoid: "seamlessly", "robust", "leverage", "delve into", trailing summaries restating what was just said, and any opener that could appear in a default ChatGPT response. One clear thought per sentence.

## Coding Rules

**Package manager and build**
- bun only. Never npm or yarn.
- `bun run build` runs `tsc --noEmit && vite build`. Both must pass before pushing.

**Styling**
- `cn()` from `@/lib/utils` for all className composition. Never concatenate class strings manually.
- Semantic color tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-muted`, `bg-cta`, `text-cta-foreground`, etc. Never `bg-white` or `text-gray-700`.
- Inline `style` only for values with no Tailwind equivalent (e.g. `animationDelay`, `clamp()` font sizes).

**Navigation**
- `<Link to="...">` for all internal navigation. Never `<a href="...">` for same-origin paths.
- External links: `target="_blank" rel="noopener noreferrer"`.
- `mailto:` links use plain `<a href="mailto:...">`.

**TypeScript**
- No `any`. Use `unknown` with narrowing if type is genuinely unknown.
- No `React.FC`. Standard function declarations with typed parameters.
- `import type` for type-only imports.
- `interface` for component props, `type` for data shapes.

**Components**
- Never edit `src/components/ui/`. Customize via props, `cn()`, or theme extension.
- Static data arrays (projects, categories) belong outside component functions. Inside, they create new references on every render.

**Constants**
- All URLs in `src/lib/constants.ts`. Never inline them.

**Accessibility**
- Icon-only interactive elements need `aria-label`.
- Collapsible/expandable elements need `aria-expanded={bool}`.

**Dark mode**
- `darkMode: ["class"]`. The `dark` class is toggled on `<html>` by `useTheme`. Every component must work in both themes.

## Architecture

```
src/
  data/         # typed TS data files (no JSON, no markdown, no CMS)
    types.ts    # ProjectData, Category, Complexity, ProjectStatus
    categories.ts
    projects.ts
  components/
    ui/         # shadcn primitives — never edit
    layout/     # Header, Footer, Layout
    ProjectCard.tsx
    CategorySection.tsx
    ComplexityBadge.tsx
    TechTag.tsx
    FilterBar.tsx
  hooks/        # useTheme, useDocumentTitle, useFilter
  lib/          # cn() + constants
  pages/        # Index (single page), NotFound
```

`src/data/projects.ts` is the single source of truth for all project content. Edit here, not in components.

The `architectureNotes` field on `ProjectData` is for diagram generation only. Never render it in the UI.

## Do Not

- Add error boundaries, loading spinners, or suspense — data is synchronous
- Create per-project detail pages (iteration 1: expandable cards only)
- Add search (category filter tabs are sufficient)
- Add animation libraries (Tailwind transitions only)
- Add a contact form (CTAs are external links)
- Add `architectureNotes` content to any rendered component
