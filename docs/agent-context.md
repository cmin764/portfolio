# Agent Context Brief

> Read this before `portfolio-blueprint.md`. It covers decisions already made, local environment details, exact coding conventions from the reference repos, and pitfalls. The blueprint has the what; this has the why and the how.

---

## Who You're Building For

**Cosmin Poieana** — Fractional AI Product Strategist, 13+ years Python, digital nomad, two prior company exits (Fashwell→Apple, Comfy→Siemens). He thinks in systems, moves fast, and hates speculative complexity. YAGNI is a hard constraint, not a suggestion. If it doesn't serve the current phase, don't build it.

His operating style: blueprint first, then execution. He will review your output critically. He'll accept an unusual architectural choice without pushback if it's well-reasoned, but he'll push back immediately on anything that looks like generic AI output or over-engineering.

**Blugen** is his proprietary methodology — blueprint-first code generation, wrapping non-deterministic AI generation in deterministic blueprints. It's how he works and what he sells to clients. Worth knowing when writing the Wandercode card description.

---

## Local Environment

All repos live at `/Users/cmin/Work/cmin764/`. The key ones for this project:

| Path | Purpose |
|------|---------|
| `/Users/cmin/Work/cmin764/wandercode` | Primary reference — port theme, layout, hooks, CLAUDE.md rules |
| `/Users/cmin/Work/cmin764/nomads-nest` | Secondary reference — typed data file pattern |
| `/Users/cmin/Work/cmin764/cmin764` | Profile repo — update README.md after portfolio ships |
| `/Users/cmin/Work/cmin764/configs` | Excalidraw library for diagrams (iteration 2) |

The `portfolio` repo doesn't exist yet. You'll create it locally, then push. See Phase 1 in the blueprint.

---

## Key Decisions Already Made (Don't Relitigate)

**Repo: `portfolio` (not `cmin764.github.io`)**
The canonical GitHub user site would be `cmin764.github.io` repo, but Cosmin prefers a repo named `portfolio` serving at `cmin764.github.io/portfolio`. The profile repo (`cmin764`) stays pure markdown — its CLAUDE.md explicitly says no build system, no dependencies. Don't propose merging the portfolio into the profile repo.

**Stack: Vite + React + Tailwind (not Astro, not Next.js)**
Cosmin already uses this stack in wandercode. Don't propose alternatives. Vite builds static output; GitHub Pages serves it. `nomads-nest` uses Next.js 16 with App Router — ignore that, it's heavier than needed for a static page with no server-side requirements.

**Content: TypeScript data files (not markdown, not a CMS)**
~15 projects. A typed `projects.ts` array is sufficient. No MDX, no frontmatter parsing, no content pipeline.

**Single page with expandable cards (not multi-page)**
Category filter tabs. No click-through detail pages in iteration 1. React Router wired up so routes can be added later without restructuring, but don't build them now.

**Two iterations, not one**
Iteration 1 ships cards with text and tags. Iteration 2 adds Excalidraw diagrams. Don't block iteration 1 on diagrams. Use grey placeholder boxes for the diagram slots.

---

## Exact wandercode Dependencies to Replicate

From `package.json` — use these exact packages (versions can be latest):

**Runtime deps to carry over:**
```json
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"lucide-react": "^0.462.0",
"react": "^18.3.1",
"react-dom": "^18.3.1",
"react-router-dom": "^6.30.1",
"tailwind-merge": "^2.6.0",
"tailwindcss-animate": "^1.0.7"
```

**Runtime deps to skip for portfolio** (wandercode-specific):
- `@calcom/embed-react` — portfolio uses a plain external link to cal.com
- `@vercel/analytics` — portfolio deploys to GitHub Pages, not Vercel
- `sonner` — no toast notifications needed on a static portfolio

**Dev deps to carry over:**
```json
"@vitejs/plugin-react-swc": "^3.11.0",
"@types/node": "^22.16.5",
"autoprefixer": "^10.4.21",
"postcss": "^8.5.6",
"tailwindcss": "^3.4.17",
"typescript": "^5.8.3",
"@tailwindcss/typography": "^0.5.16"
```

**Package manager: bun only.** Never npm or yarn.

---

## Wandercode: Exact Files to Port

Copy these verbatim, then adapt where noted:

| Source file | Destination | Adaptation needed |
|-------------|-------------|-------------------|
| `src/lib/utils.ts` | `src/lib/utils.ts` | None — copy as-is |
| `src/hooks/useTheme.ts` | `src/hooks/useTheme.ts` | None — copy as-is |
| `src/hooks/useDocumentTitle.ts` | `src/hooks/useDocumentTitle.ts` | None — copy as-is |
| `src/index.css` | `src/index.css` | Keep all CSS vars; remove `@calcom` overrides if any |
| `tailwind.config.ts` | `tailwind.config.ts` | Keep color tokens + `cta` variant; update `content` paths if needed |
| `components.json` | `components.json` | Copy as-is (same alias structure) |
| `src/components/ScrollToTop.tsx` | `src/components/ScrollToTop.tsx` | None — needed for hash nav |
| `src/components/layout/Layout.tsx` | `src/components/layout/Layout.tsx` | Swap children composition if different |
| `src/components/layout/Header.tsx` | `src/components/layout/Header.tsx` | Remove Cal.com button; simplify nav: "Portfolio" + theme toggle only |
| `src/components/layout/Footer.tsx` | `src/components/layout/Footer.tsx` | Change links to: GitHub, CV PDF, wandercode.ltd, LinkedIn, email |

**shadcn/ui components installed in wandercode** (only 3): `button`, `tooltip`, `sonner`.

The portfolio needs more — add these via `bunx shadcn@latest add <name>`:
- `badge` (for tech tags and complexity indicator)
- `card` (project card container)
- `collapsible` (expandable project detail)
- `button` (already exists, copy from wandercode)

Do not edit files in `src/components/ui/` — they're shadcn primitives. Customize via props, `cn()`, or theme tokens only.

---

## Theme System (Exact Values)

The CSS custom properties in `src/index.css` use HSL format. Light and dark values:

```css
/* Key light mode tokens */
--background: 60 9% 98%;       /* warm white */
--foreground: 220 20% 10%;     /* near-black */
--card: 0 0% 100%;
--muted: 220 14% 96%;
--muted-foreground: 220 10% 50%;
--border: 220 14% 90%;
--primary: 220 20% 10%;        /* same as foreground */
--cta: 220 20% 7%;             /* custom CTA background */

/* Key dark mode tokens */
--background: 220 20% 7%;      /* dark navy */
--foreground: 60 9% 98%;       /* warm white */
--card: 220 20% 10%;
--muted: 220 14% 14%;
--muted-foreground: 220 10% 60%;
--border: 220 14% 18%;
```

Font: Inter (Google Fonts). Use only semantic color tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-muted`). Never hard-code `bg-white` or `text-gray-700` — they break in dark mode.

Dark mode strategy: `darkMode: ["class"]` in `tailwind.config.ts`. The `dark` class is toggled on `<html>` by `useTheme`. There's an inline script in `index.html` that reads `localStorage` before React mounts to prevent a flash of the wrong theme — copy this from wandercode's `index.html`.

---

## Coding Rules (from wandercode CLAUDE.md — apply to portfolio)

**Navigation**
- `<Link to="...">` for all internal navigation. Never `<a href="...">` for same-origin paths.
- External links: `target="_blank" rel="noopener noreferrer"`.
- `mailto:` links use plain `<a href="mailto:...">`.

**Styling**
- `cn()` for all className composition. Never concatenate class strings manually.
- `inline style` only for `animationDelay` and one-off constraints with no Tailwind equivalent.
- All page sections use the `container` class (centered, max-width 1200px, 2rem padding).

**Components**
- Static data arrays (nav links, project list, etc.) live outside the component function.
- `interface` for component props; type aliases for data shapes.
- No `React.FC`. Use function declarations: `function ProjectCard({ ... }: Props)`.
- No `any`. Use `unknown` with narrowing if type is genuinely unknown.
- `import type` for type-only imports.

**Accessibility**
- Icon-only buttons need `aria-label`.
- Collapsible project cards need `aria-expanded={isOpen}`.
- `@media (prefers-reduced-motion: reduce)` fallback in `index.css` for any CSS animations.

**SEO**
- Set document title via `useDocumentTitle` hook. Pattern: `"Portfolio | Cosmin Poieana"` (single page, so just the one title).
- Add `<meta name="description">`, OG tags, and Twitter Card in `index.html`.

**Constants**
- All URLs (GitHub, CV PDF, wandercode, cal.com) in `src/lib/constants.ts`. Never inline them.

---

## App.tsx Router Pattern

wandercode's App.tsx wraps everything in `TooltipProvider` and `BrowserRouter`. For the portfolio, simpler:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
```

No `TooltipProvider` unless you use Tooltip. No `Toaster` unless you add toast notifications. Keep it minimal.

**GitHub Pages SPA routing note:** With `base: '/portfolio/'` in `vite.config.ts` and a single route at `/`, deep links aren't a concern in iteration 1. If detail pages are added later, add a `public/404.html` that redirects to `index.html` (standard GitHub Pages SPA workaround).

---

## vite.config.ts Critical Detail

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/portfolio/',   // ← CRITICAL: without this, all asset paths break on GitHub Pages
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

Test locally with `bun run preview` (not `bun dev`) — preview serves from the `/portfolio/` base, so broken asset paths surface before you push.

---

## nomads-nest Data Pattern

The typed data file pattern to replicate for `projects.ts`. From `src/data/listing-content.ts`:

```typescript
// Pattern: exported typed constants, no default export, no class
export interface SomeShape {
  field: string;
  items: string[];
}

export const myData: SomeShape[] = [
  { field: "value", items: ["a", "b"] },
];
```

No JSON files. No markdown. Pure TypeScript with exported typed constants.

---

## Project Context: Extra Details Not in the Blueprint

**Professional project dates (useful for card `period` field):**
- VONQ: Jun 2025 – Feb 2026 (Python/Django + React)
- A5 Labs: Jan 2025 – Jul 2025
- Sema4.ai: Nov 2023 – Jul 2024
- Robocorp: Sep 2021 – Nov 2023 (progressed Senior → Lead)
- Comfy → Siemens: Jul 2019 – Dec 2020 (acquired ~2020)
- Cloudbase: Oct 2014 – Dec 2015

**VONQ context:** Recruitment marketing platform distributing to 5,000+ channels via deep ATS integrations. Cosmin was embedded fractionally across multiple product streams. The Meeting Assistant was novel — first of its kind at VONQ. The AI Adoption work is worth calling out in its own highlight: "drove team-wide adoption by example, not mandate — battle-tested AI-generated code against manual craft, weeks compressed to minutes as demonstrated fact."

**Sema4.ai context:** This is the rebrand/evolution of Robocorp. Action Server and AI Actions predate the MCP standard — they solved the same problem (giving LLMs callable tools) before the protocol was formalized. Good differentiating detail for the card.

**Comfy acquisition:** The Siemens acquisition happened mid-engagement. Cosmin was already embedded when the deal closed. Worth a brief mention on the card ("acquired by Siemens during tenure").

**TrueStory deck and blog are essential** — they're the only artifacts showing the startup's story since the repo doesn't have a deployed product. The deck URL is `https://slides.com/cmin/truestory-venturecup`. Don't bury these as footnotes; surface them in the card's link row alongside the repo link.

**Traced AI ADR** is at `./docs/traced_ai_architecture_decision_v2.html`. Read it for the full architecture. Key design decisions embedded in it:
1. Raw I/O never leaves the client (local SQLite, architectural constraint not policy)
2. Only SHA-256 hashes cross the network (32 bytes per event)
3. Dashboard ships as a Docker image for enterprise (no inbound ports)
4. Rule registry (EU AI Act / ISO 42001 / SOC 2 mappings) is the moat — not the code

The moat framing: "The code is copyable. The Docker image is inspectable. The moat is the versioned mapping of regulatory text to concrete logging requirements, built from real auditor interactions." This is what should be in the card description.

**NoMoreApply/services repo** is a lightweight Claude-driven brochure, not a complex technical project. Frame it as "built with agentic content generation (Claude Code skills)" rather than as a full product. It demonstrates the methodology, not the engineering depth.

---

## What NOT to Do

- Don't add error boundaries, loading spinners, or suspense. Everything renders synchronously from a static typed array.
- Don't create a `useProjects` hook. The data is a static import, not fetched.
- Don't add Framer Motion or any animation library. Tailwind transitions only.
- Don't add a contact form. CTAs are external links to wandercode.ltd and cal.com.
- Don't create per-project detail pages in iteration 1. Expandable cards only.
- Don't add search. Category filter tabs are sufficient.
- Don't add `@vercel/analytics` (wrong platform) or `@calcom/embed-react` (plain link is fine).
- Don't copy wandercode's `useCalPopup` hook — it's complex for what's needed. Use a plain `<a href="https://cal.com/wandercode/discovery-call" target="_blank">` link.
- Don't commit `node_modules`. Check `.gitignore` includes it before first push.

---

## Two Most Likely Failure Modes on First Deploy

1. **Missing `base: '/portfolio/'`** in `vite.config.ts`. Vite builds with absolute paths by default. Everything loads fine on `localhost` then 404s on GitHub Pages. Test with `bun run preview` before pushing — it surfaces this immediately.

2. **Wrong GitHub Pages source setting.** Must be "GitHub Actions" (not "Deploy from branch") in Settings → Pages. The deploy workflow uses `actions/deploy-pages`. Without this setting, the action succeeds but nothing is served. Set it before the first push.

---

## Communication Style Notes

Cosmin's preferences (observed in this session and from his CLAUDE.md):
- Short, direct responses. No sycophantic openers.
- No em dashes. Use commas, colons, or parentheses.
- Don't summarize what you just did at the end of a response.
- Show reasoning without announcing it. Write the code, explain the key decision if non-obvious.
- When in doubt, write the code and show it. He'll say if it's wrong.
- He will say "let me know if" type questions — answer directly, don't re-ask.
