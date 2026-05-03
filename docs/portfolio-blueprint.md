# Portfolio Site Blueprint

> Single source of truth for `cmin764/portfolio`, a GitHub Pages static site served at `cmin764.github.io/portfolio`. Written for pickup by a fresh Claude Code session. Reflects actual shipped state as of the most recent content refresh commit.

## What We Built

A curated portfolio site for Cosmin Poieana (cmin764), Fractional AI Product Strategist. Goal: make B2B companies want to collaborate. Not a resume — a proof of systems thinking. Excalidraw architecture diagrams are the differentiator; most developer portfolios just show README excerpts.

Lives at `github.com/cmin764/portfolio`, served at `cmin764.github.io/portfolio`. The `cmin764` profile repo stays untouched (pure markdown, no build tooling). The existing CV PDF at `cmin764.github.io/cmin764/cv.pdf` is unaffected.

---

## Tech Stack (current)

| Tool | Version |
|------|---------|
| Vite | 8 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 3.4 |
| shadcn/ui | latest |
| lucide-react | 1.x |
| react-router-dom | 7 |
| tailwind-merge | 3.x |
| bun | latest (package manager) |

**Plugin note:** `@vitejs/plugin-react` (non-SWC). The SWC variant was swapped out early; do not reintroduce `@vitejs/plugin-react-swc`.

**lucide-react 1.x note:** Brand icons (`Github`, `Linkedin`, `Medium`) were removed in v1. Use inline SVGs for those; lucide for everything else.

**shadcn/ui components installed:** `badge`, `button`, `card`, `collapsible`. Never edit files in `src/components/ui/`.

**Removed deps:** `@tailwindcss/typography` (unused), `sonner`, `@calcom/embed-react`, `@vercel/analytics`.

---

## Repository

```
repo name:   portfolio
owner:       cmin764
pages URL:   https://cmin764.github.io/portfolio/
base path:   /portfolio/   (set in vite.config.ts: base: '/portfolio/')
```

`basename` in `App.tsx` is `"/portfolio/"` (trailing slash). This keeps logo clicks and page refreshes on the same canonical URL.

---

## Page Sections (scroll order)

1. Hero
2. Active Ventures
3. Startup Trials
4. Professional Work
5. Open Source
6. Frontend & Brand
7. Writing
8. Footer

---

## Key Files

### `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
```

`__BUILD_DATE__` is injected at build time. Declared in `src/vite-env.d.ts`:

```typescript
/// <reference types="vite/client" />
declare const __BUILD_DATE__: string;
```

Used in `Footer.tsx` to show "Updated Apr 14" (month + day only, no year — year already in copyright).

---

### `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter basename="/portfolio/">
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
```

---

### `src/lib/constants.ts`

```typescript
export const LINKS = {
  portfolioUrl: 'https://cmin764.github.io/portfolio/',
  cvPdfUrl: 'https://cmin764.github.io/cmin764/cv.pdf',
  wandercodeUrl: 'https://wandercode.ltd',
  calUrl: 'https://cal.com/wandercode/discovery-call',
  linkedinUrl: 'https://linkedin.com/in/cmin764',
  githubUrl: 'https://github.com/cmin764',
  mediumUrl: 'https://cmin764.medium.com',
  hobbyProjectsUrl: 'https://github.com/stars/cmin764/lists/portfolio',
  email: 'cmin764@gmail.com',
};
```

---

### `src/data/types.ts`

```typescript
export type Category =
  | 'active-venture'
  | 'startup-trial'
  | 'professional'
  | 'oss-hobby'
  | 'frontend-brand'
  | 'writing';

export type Complexity = 'low' | 'medium' | 'high';

export type ProjectStatus =
  | 'active'
  | 'shipped'
  | 'stealth'
  | 'in-progress'
  | 'discontinued';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: Category;
  complexity: Complexity;
  status: ProjectStatus;
  tags: string[];
  company?: string;
  period?: string;
  links: ProjectLink[];
  diagramFile?: string;       // e.g. "traced-ai.svg" (iteration 2)
  highlights?: string[];
  architectureNotes?: string; // diagram source only; never rendered in UI
}
```

---

### `src/data/categories.ts`

```typescript
export const CATEGORIES: CategoryMeta[] = [
  { id: 'active-venture',  label: 'Active Ventures',  description: 'Current operating entities',                                              order: 1 },
  { id: 'startup-trial',   label: 'Startup Trials',   description: 'Experiments, bets, and lessons learned',                                  order: 2 },
  { id: 'professional',    label: 'Professional Work', description: 'Client engagements: no source code, architecture diagrams tell the story', order: 3 },
  { id: 'oss-hobby',       label: 'Open Source',       description: 'Selected technical showcases',                                            order: 4 },
  { id: 'frontend-brand',  label: 'Frontend & Brand',  description: 'Product and design builds',                                               order: 5 },
  { id: 'writing',         label: 'Writing',           description: 'Published essays on tech, AI, engineering, and entrepreneurship',          order: 6 },
];
```

---

## File Structure (current)

```
portfolio/
  .github/
    workflows/
      deploy.yml
  public/
    favicon.svg
    diagrams/           (iteration 2 — not yet populated)
  src/
    components/
      layout/
        Layout.tsx
        Header.tsx      sticky, scroll-aware; "Portfolio" label + Wandercode link + theme toggle
        Footer.tsx      GitHub/LinkedIn/Medium/Email icons + CV PDF + wandercode.ltd + build date
      ui/               shadcn primitives: badge, button, card, collapsible
      CategorySection.tsx
      ComplexityBadge.tsx
      FilterBar.tsx
      ProjectCard.tsx   collapsed + expanded state in one component (no separate ProjectDetail)
      ScrollToTop.tsx
      TechTag.tsx
    data/
      types.ts
      categories.ts
      projects.ts
    hooks/
      useDocumentTitle.ts
      useFilter.ts
      useTheme.ts
    lib/
      constants.ts
      utils.ts
    pages/
      Index.tsx
      NotFound.tsx
    App.tsx
    main.tsx
    index.css
    vite-env.d.ts       declares __BUILD_DATE__
  docs/
    portfolio-blueprint.md   (this file)
    agent-context.md
    system-design.md         Excalidraw / C4 diagramming guidelines
    diagram-briefs.md        per-project node/edge tables for Excalidraw generation
    traced_ai_architecture_decision_v2.html
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
  components.json
  CLAUDE.md
  .gitignore
```

---

## GitHub Actions Workflow (current action versions)

```yaml
name: Deploy portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v5
        id: deployment
```

---

## Project Cards (current state)

Cards are defined in `src/data/projects.ts`. Editing content: change that file only, not the components.

### Active Ventures

| id | title | complexity | status |
|----|-------|------------|--------|
| `wandercode` | Wandercode | medium | active |
| `nomoreapply` | NoMoreApply | medium | active |

**wandercode links:** Site, Repo
**nomoreapply links:** Site, Services (GitHub Pages), Org

---

### Startup Trials

| id | title | complexity | status |
|----|-------|------------|--------|
| `traced-ai` | Traced AI | high | stealth |
| `truestory` | TrueStory | medium | discontinued |

**traced-ai links:** "In stealth. Talk to me." (cal.com)
**truestory links:** Org (savvybit), Deck, Blog

Notable: `traced-ai` has no repo link by design (stealth). Architecture details in `diagram-briefs.md` section 1.

---

### Professional Work (order: most-recent first)

| id | title | company | period | complexity |
|----|-------|---------|--------|------------|
| `vonq-meeting-assistant` | Meeting Assistant | VONQ | 2025-2026 | high |
| `vonq-knowledge-base` | Knowledge Base & Careers Agent | VONQ | 2025-2026 | high |
| `vonq-candidate-assessment` | Candidate Assessment & Language Evaluator | VONQ | 2025-2026 | high |
| `a5-gto-engine` | GTO / Reinforcement Learning Poker Engine | A5 Labs | 2025 | high |
| `sema4ai-action-server` | Action Server + AI Actions | Sema4.ai | 2023-2024 | high |
| `robocorp-rpa` | RPA Framework & Automation Libraries | Robocorp / Sema4.ai | 2021-2024 | high |
| `gorgias-appstore` | Gorgias App Store | Gorgias | 2021 | medium |
| `comfy-grpc` | gRPC Smart Building APIs | Comfy (→ Siemens) | 2019-2020 | high |

All professional cards have empty `links: []` except:
- `sema4ai-action-server`: Server (github.com/Sema4AI/actions), Gallery (github.com/Sema4AI/gallery)
- `robocorp-rpa`: Org (github.com/robocorp), Portal (robocorp.com/portal)
- `gorgias-appstore`: Docs (developers.gorgias.com)

No Cloudbase card. It was replaced by `gorgias-appstore`.

---

### Open Source

| id | title | complexity | status |
|----|-------|------------|--------|
| `deep-ice` | DeepIce | medium | shipped |
| `pulsr` | Pulsr | high | in-progress |

---

### Frontend & Brand

| id | title | complexity |
|----|-------|------------|
| `wandercode-site` | Wandercode website | medium |
| `nomads-nest` | Nomad's Nest website | medium |

---

### Interviews

| id | title | complexity | status | diagram |
|----|-------|------------|--------|---------|
| `content-moderation` | Content Moderation Platform | high | attempted | `content-moderation.svg` |
| `bulk-csv-ingest` | Bulk CSV Ingest | high | attempted | `bulk-csv-ingest.svg` |

Tags: AWS, S3, ECS Fargate, FastAPI, Python, MongoDB Atlas, SQS, Clerk, CloudFront, Multipart Upload, System Design

### Writing

| id | title | complexity | status |
|----|-------|------------|--------|
| `alchemy-entrepreneurship` | The Alchemy of Entrepreneurship | low | shipped |

Link: Read (cmin764.medium.com/the-alchemy-of-entrepreneurship-5de670f27fa2)

---

## Two-Iteration Approach

### Iteration 1 — Status: complete

Phase 1 (scaffold) and Phase 2 (data + components) are shipped.

### Phase 3 — Pending

- [ ] OG / Twitter Card meta tags in `index.html`
- [ ] `og-image.png` in `public/`
- [ ] Responsive testing: 375px / 768px / 1024px / 1440px
- [ ] Dark mode verification
- [ ] Accessibility: keyboard nav, `aria-expanded` on collapsibles
- [ ] Update `cmin764/cmin764` README.md with Portfolio section (see below)

---

### Iteration 2 — Architecture Diagrams (not started)

After Phase 3, generate Excalidraw diagrams per project. Source material for each diagram is in `docs/diagram-briefs.md` (node/edge tables) and `architectureNotes` on each `ProjectData` entry.

**How to generate:**
- Use `configs/system-design.excalidrawlib` from the `cmin764/configs` repo
- OR generate Excalidraw JSON via AI, then load into excalidraw.com
- Export each as SVG with transparent background
- Commit `.excalidraw` source to `src/diagrams/<id>.excalidraw`
- Commit exported SVG to `public/diagrams/<id>.svg`
- Set `diagramFile: '<id>.svg'` on the entry in `projects.ts`

**Dark mode:** `dark:invert` CSS class on the `<img>` in `DiagramViewer.tsx` (component not yet built). Or export two variants and swap on theme.

**Diagram priority:**

| # | Project | C4 level |
|---|---------|----------|
| 1 | Traced AI | Container |
| 2 | VONQ Meeting Assistant | Container |
| 3 | Sema4.ai Action Server | Container |
| 4 | A5 GTO Engine | Container |
| 5 | VONQ Knowledge Base | Container |
| 6 | VONQ Candidate Assessment | Container |
| 7 | TrueStory | Container |
| 8 | Pulsr | Container |
| 9 | DeepIce | Component |
| 10 | Robocorp RPA | Container |
| 11 | Comfy gRPC | Container |
| 12 | Gorgias App Store | Container |

---

## README.md Update (`cmin764/cmin764`) — pending

Replace current "Hobby projects" section with:

```markdown
## Portfolio

System design, tech breakdowns, and impact stories across professional work, ventures, and open source:

**[cmin764.github.io/portfolio](https://cmin764.github.io/portfolio/)**

Covering professional work (VONQ, Sema4.ai, A5 Labs), active ventures (Wandercode, NoMoreApply), startup trials (Traced AI, TrueStory), and open-source showcases.
```

---

## Key External Links

| Key | URL |
|-----|-----|
| `portfolioUrl` | https://cmin764.github.io/portfolio/ |
| `cvPdfUrl` | https://cmin764.github.io/cmin764/cv.pdf |
| `wandercodeUrl` | https://wandercode.ltd |
| `calUrl` | https://cal.com/wandercode/discovery-call |
| `linkedinUrl` | https://linkedin.com/in/cmin764 |
| `githubUrl` | https://github.com/cmin764 |
| `mediumUrl` | https://cmin764.medium.com |
| `hobbyProjectsUrl` | https://github.com/stars/cmin764/lists/portfolio |
| `email` | cmin764@gmail.com |

---

## Reference Repos

| Repo | Purpose |
|------|---------|
| `cmin764/wandercode` | Theme tokens, hooks, layout components source |
| `cmin764/configs` | Excalidraw library for iteration 2 diagrams |
| `cmin764/cmin764` | Profile repo — README update pending |
| `Sema4AI/gallery` | Public artifact for action-server card |
| `robocorp` org | Public artifact for robocorp-rpa card |
| `savvybit` org | TrueStory org link |
| `NoMoreApply` org | NoMoreApply org link |

---

## Do Not

- Add error boundaries, loading spinners, or suspense (data is synchronous)
- Create per-project detail pages (`ProjectCard.tsx` handles collapsed + expanded state)
- Add search (category filter tabs are sufficient)
- Add animation libraries (Tailwind transitions only; `animate-fade-in` is the only keyframe)
- Add a contact form (CTAs are external links)
- Use `@vitejs/plugin-react-swc` (swapped to non-SWC; do not re-add)
- Edit files in `src/components/ui/` (shadcn primitives)
- Hard-code colors like `bg-white` or `text-gray-700` (use semantic tokens; breaks dark mode)
- Commit `node_modules`

---

## Two Most Likely Failure Modes on Deploy

1. **Wrong `base` in `vite.config.ts`:** Must be `'/portfolio/'`. Assets load fine on localhost but 404 on GitHub Pages without it. Test with `bun run preview` before pushing.

2. **Wrong GitHub Pages source setting:** Must be "GitHub Actions" (not "Deploy from branch") in Settings → Pages. The deploy workflow uses `actions/deploy-pages`. Without this setting, the action succeeds but nothing is served.
