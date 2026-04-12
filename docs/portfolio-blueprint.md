# Portfolio Site Blueprint

> This file is the single source of truth for building `cmin764/portfolio`, a GitHub Pages static site served at `cmin764.github.io/portfolio`. Written for pickup by a fresh Claude Code session.

## What We're Building

A curated portfolio site for Cosmin Poieana (cmin764), Fractional AI Product Strategist. The goal is to make B2B companies want to collaborate. Not a resume — a proof of systems thinking. Excalidraw architecture diagrams are the differentiator; most developer portfolios just show README excerpts.

The site lives in a **separate `portfolio` repo** (`github.com/cmin764/portfolio`). The `cmin764` profile repo stays untouched (pure markdown, no build tooling). The existing CV PDF at `cmin764.github.io/cmin764/cv.pdf` is unaffected.

After the portfolio is live, the profile repo's "Hobby projects" section in `README.md` gets replaced with a "Portfolio" section pointing to `cmin764.github.io/portfolio`.

---

## Tech Stack

| Tool | Version | Source |
|------|---------|--------|
| Vite | 5 | matches `cmin764/wandercode` |
| React | 18 | matches `cmin764/wandercode` |
| TypeScript | 5 | matches `cmin764/wandercode` |
| Tailwind CSS | 3.4 | matches `cmin764/wandercode` |
| shadcn/ui | latest | matches `cmin764/wandercode` |
| lucide-react | latest | matches `cmin764/wandercode` |
| bun | latest | package manager |

Port `tailwind.config.ts`, `index.css` (theme tokens), `lib/utils.ts` (`cn()`), and `hooks/useTheme.ts` from `cmin764/wandercode`. Adapt `Layout.tsx`, `Header.tsx`, `Footer.tsx` nav links for the portfolio context.

---

## Repository Setup

```
repo name:   portfolio
owner:       cmin764
pages URL:   https://cmin764.github.io/portfolio
base path:   /portfolio   (set in vite.config.ts: base: '/portfolio/')
```

GitHub Actions workflow: push to `main` → `bun install` → `bun run build` → `actions/deploy-pages`.

---

## Page Structure

Single scrollable page. Category tabs for filtering. No multi-page routing in iteration 1. React Router wired up so detail pages can be added in future without restructuring.

Sections (scroll order):

1. Hero
2. Active Ventures
3. Startup Trials
4. Professional Work
5. Open Source Showcases
6. Frontend & Brand
7. Footer

---

## Full Project Data

### Section: Active Ventures

---

**Wandercode**
- Tagline: Fractional AI Product Strategy for B2B companies
- Description: Owner and operator of Wandercode — an embedded consulting practice helping B2B startups build intelligent products and adopt AI-driven engineering. Methodology: Blugen (blueprint-first code generation). Services: technical audits, AI product development, workshops. Results-based pricing, not hourly.
- Complexity: high
- Tags: `TypeScript`, `React`, `Vite`, `Tailwind`, `AI Strategy`, `Consulting`
- Links: site `https://www.wandercode.ltd/`, repo `https://github.com/cmin764/wandercode`
- Status: active
- Category: active-venture

---

**NoMoreApply**
- Tagline: Private engineer community for peer-based job referrals — no recruiters
- Description: Co-founded with Angel Aytov and Cata Waack. A trust-based talent network where engineers refer each other directly to companies they've worked at or know well. Vetting is peer-based, not algorithmic. The services brochure (linked below) was built with Claude-driven skill automation — it's a lightweight example of agentic content generation.
- Complexity: medium
- Tags: `Community`, `HR Tech`, `Claude Code`, `Automation`, `TypeScript`
- Links: site `https://nomoreapply.com`, services repo `https://github.com/NoMoreApply/services`
- Status: active
- Category: active-venture

---

### Section: Startup Trials & Experiments

---

**Traced AI** *(stealth)*
- Tagline: AI audit trail for compliance — proof that the AI decided correctly, when, under which rule
- Description: Built for regulated industries (banking, healthcare, defense) where "the AI decided" is not an acceptable answer. The traced-ai library auto-patches LLM clients (OpenAI, Anthropic, etc.) at import time. Raw inputs and outputs are written to a local SQLite store that never leaves the client perimeter. SHA-256 hashes of every I/O pair, plus the rationale string, are sent to an append-only chained ledger in the cloud. The rule registry (EU AI Act, ISO 42001, SOC 2 mappings) is the moat — it translates regulatory text into concrete logging requirements per decision type, updated from real auditor interactions.
- Architecture (for diagram):
  - **Client perimeter**: AI application + traced-ai library → local SQLite (raw I/O) → self-hosted dashboard (Docker, reads local store only)
  - **Cloud**: ingest API (receives hashes only, key auth) → chained ledger (append-only, signed) → rule registry (EU AI Act / ISO / SOC 2)
  - **Cross-zone outbound only**: hash(in) + hash(out) + rationale string. Raw data never crosses the network.
  - **Cross-zone inbound**: signed rule update packages from cloud to client (outbound-only from cloud)
  - Three deployment tiers: cloud (SaaS dashboard on tracedai.co), enterprise (self-hosted Docker, no inbound ports), air-gapped (signed rule packages offline)
  - The moat: versioned mapping of regulatory text to logging requirements, built from real auditor interactions. Copying the export format doesn't replicate the compliance intelligence.
- Complexity: high
- Tags: `Python`, `FastAPI`, `SQLite`, `Cryptography`, `Compliance`, `EU AI Act`, `TypeScript`, `Docker`
- Links: site (coming — tracedai.co), CTA: "In stealth — talk to me"
- Status: stealth
- Category: startup-trial

---

**TrueStory** *(failed venture, learned from)*
- Tagline: News aggregator surfacing contradictory stories to incentivize critical thinking
- Description: Co-founded at Startup Weekend Iași 2014. Won Best Marketing award. Built a Flask app on Google Cloud Platform exposing a REST API consumed by a Chrome extension (Bootstrap + jQuery). The extension surfaced conflicting news sources side-by-side for the same topic. Designed the full architecture, deployed infrastructure, built the API. Shut down due to monetization challenges and market timing, but the experience shaped how I think about information asymmetry and media bias.
- Complexity: medium
- Tags: `Python`, `Flask`, `GCP`, `REST API`, `Chrome Extension`, `Bootstrap`, `jQuery`
- Links:
  - repo: `https://github.com/savvybit/TrueStory`
  - deck: `https://slides.com/cmin/truestory-venturecup`
  - blog: `https://cosminslife.wordpress.com/2020/08/16/truestory-app-or-how-i-learned-to-stop-worrying-and-love-the-process/`
- Status: discontinued
- Category: startup-trial

---

### Section: Professional Work (No Source Code)

These were client engagements. Source code is confidential. System design diagrams are the primary artifact — they prove architectural thinking without disclosing implementation.

---

**Meeting Assistant** (VONQ, 2025-2026)
- Tagline: AI agent that joins Google Meet interviews, analyzes conversations, and gives private live insights to interviewers
- Description: VONQ is a recruitment marketing platform distributing jobs to 5,000+ channels. This feature was the first of its kind at VONQ. Integrated Recall.ai to join active Google Meet calls as a passive participant. The agent analyzed recruiter-candidate dialogue in real time, detected blocking moments (candidate too quiet, topic drift, answer quality signals), and delivered private hints to the interviewer without disrupting the call. Optionally could intervene to unblock dialogue. Backend in Python/Django, frontend signals via React.
- Architecture (for diagram): Recruiter triggers agent join → Recall.ai bot enters Meet → audio stream → speech-to-text → NLP analysis → private insight delivery to interviewer UI (WebSocket or polling) → optional agent intervention
- Complexity: high
- Tags: `Python`, `Django`, `Recall.ai`, `Google Meet`, `NLP`, `WebSocket`, `React`, `AI Agents`
- Company: VONQ
- Status: shipped (private)
- Category: professional

---

**Knowledge Base & Careers Agent** (VONQ, 2025-2026)
- Tagline: Automatic career site crawler feeding an AI agent that recommends jobs from uploaded CVs
- Description: Built a Firecrawl-powered crawler that ingests company career pages and indexes job listings into a vector store. On top of this, a Careers Agent accepts candidate CV uploads and chat input, runs retrieval-augmented generation to match candidates to relevant open roles, and routes them to origin job pages with high-confidence matches. Reduced time-to-application for candidates by removing the need to manually browse job boards.
- Architecture (for diagram): Career sites → Firecrawl crawler → vector store (embeddings) → Careers Agent (RAG) → candidate chat UI → matched job links
- Complexity: high
- Tags: `Python`, `Django`, `Firecrawl`, `RAG`, `Vector Store`, `LLM`, `React`, `AI Agents`
- Company: VONQ
- Status: shipped (private)
- Category: professional

---

**Candidate Assessment & Language Evaluator** (VONQ, 2025-2026)
- Tagline: Agentic pipeline for evaluating candidate quality, including a live language assessment MVP
- Description: Built an agentic automation system to evaluate candidates across multiple criteria (skills alignment, communication quality, role fit). Delivered a language assessment MVP for a major European client — candidates complete a structured interview and receive a language proficiency score with justification. Reduced manual screening time significantly. Full FE/BE delivery including failure state tracking and candidate stage transitions.
- Architecture (for diagram): Candidate input (text/audio) → assessment agent → multi-criteria scoring → human review queue → ATS stage update
- Complexity: high
- Tags: `Python`, `Django`, `AI Agents`, `Audio Processing`, `NLP`, `React`, `Assessment`
- Company: VONQ
- Status: shipped (private)
- Category: professional

---

**Action Server + AI Actions** (Sema4.ai, 2023-2024)
- Tagline: MCP-like FastAPI server giving GPT "hands and legs" — pluggable business logic executed post-reasoning
- Description: Before MCP was standardized, Sema4.ai (formerly Robocorp) built their own protocol for exposing callable actions to LLMs. Action Server is a FastAPI-based server that hosts AI Actions — discrete, type-safe Python functions with metadata that GPT can discover and invoke. Each action is a pluggable unit of business logic: read a spreadsheet, query a database, trigger a workflow, post to Slack. The gallery of actions became a reference implementation used by enterprise customers. Led the engineering effort from architecture to production.
- Architecture (for diagram): GPT / LLM → Action Server (FastAPI + action registry) → AI Action (Python function with schema) → external system (DB, API, file, etc.) → response back to LLM
- Complexity: high
- Tags: `Python`, `FastAPI`, `LLM`, `OpenAI`, `MCP`, `Plugin Architecture`, `Pydantic`, `Docker`
- Company: Sema4.ai
- Links: gallery `https://github.com/Sema4AI/gallery`
- Status: shipped (open source gallery)
- Category: professional

---

**GTO / Reinforcement Learning Poker Engine** (A5 Labs, 2025)
- Tagline: ML/AI system combining game theory optimal play and RL strategies for competitive online poker
- Description: A5 Labs builds AI for competitive online gaming. Designed and built the Python/FastAPI API layer on top of a C++ inference server running GTO (Game Theory Optimal) and reinforcement learning poker models. The system takes game state as input (hole cards, board, pot, player actions) and returns recommended actions with EV calculations. Low-latency is critical — the C++ layer handles the compute, Python handles orchestration and external communication.
- Architecture (for diagram): Game state input → FastAPI (Python) → C++ inference server (GTO/RL model) → action recommendation + EV output → client application
- Complexity: high
- Tags: `Python`, `FastAPI`, `C++`, `gRPC`, `Reinforcement Learning`, `GTO`, `ML Inference`, `Low Latency`
- Company: A5 Labs
- Status: shipped (private)
- Category: professional

---

**RPA Framework & Automation Libraries** (Robocorp → Sema4.ai, 2021-2024)
- Tagline: Open-source Python automation libraries enabling enterprise RPA at scale
- Description: Core contributor to Robocorp's open-source RPA framework — the Python-native successor to Robot Framework for enterprise automation. Built and maintained libraries for web automation, desktop automation, OCR, document processing, and data pipelines. These libraries are the foundation that hundreds of enterprise customers use to automate their workflows. Led library design, API surface, versioning, and contributor onboarding.
- Architecture (for diagram): Robot/task definition → robocorp runtime → library layer (web/desktop/OCR/docs) → target systems → execution log + artifacts
- Complexity: high
- Tags: `Python`, `Robot Framework`, `RPA`, `Selenium`, `OCR`, `Automation`, `PyPI`, `Open Source`
- Company: Robocorp / Sema4.ai
- Links: org `https://github.com/robocorp`
- Status: active open source
- Category: professional

---

**gRPC Smart Building APIs** (Comfy → Siemens, 2019-2020)
- Tagline: Language-agnostic microservices backbone for IoT smart building systems via gRPC with reverse-proxy transcoding
- Description: Comfy (acquired by Siemens ~2020) built software for smart buildings. Designed and implemented a gRPC-based API layer with a reverse-proxy transcoder (gRPC-gateway pattern) allowing HTTP/REST clients to consume gRPC services without rewriting. Enabled polyglot microservices — services written in Go, Python, and Node.js all communicated through a single typed interface. Served as the data transport backbone for occupancy sensing, HVAC control, and workspace management features.
- Architecture (for diagram): REST clients → gRPC-gateway (reverse proxy) → gRPC services (Go/Python/Node) → IoT devices + DB → responses transcoded back to JSON
- Complexity: high
- Tags: `gRPC`, `Go`, `Python`, `Protocol Buffers`, `REST`, `Microservices`, `IoT`, `Kubernetes`
- Company: Comfy (→ Siemens)
- Status: shipped (acquired)
- Category: professional

---

**Windows Cloud-Init Service** (Cloudbase Solutions, 2014-2015)
- Tagline: VM initialization agent for Windows on OpenStack IaaS — the cloud-init equivalent for Windows
- Description: Cloudbase Solutions specialized in OpenStack deployments for Windows environments. Built the Windows cloud-init service that runs at VM first boot, reads the OpenStack metadata API, and configures the instance: hostname, network interfaces, SSH keys, user accounts, and custom scripts. A critical piece of infrastructure for enterprise OpenStack operators who needed Windows workloads alongside Linux VMs.
- Architecture (for diagram): VM boot → cloud-init agent → OpenStack metadata API → instance configuration (hostname / network / SSH keys / user accounts) → ready state
- Complexity: medium
- Tags: `Python`, `Windows`, `OpenStack`, `IaaS`, `Cloud-Init`, `Infrastructure`, `DevOps`
- Company: Cloudbase Solutions
- Links: org `https://github.com/cloudbase`
- Status: shipped / open source
- Category: professional

---

### Section: Open Source Showcases

Only two projects shown on the page. The rest are behind a "Hobby Projects" button to the full GitHub stars list.

---

**DeepIce**
- Tagline: Idiomatic async Python web server template — how I approach backend development from scratch
- Description: A reference implementation of a production-grade FastAPI application. Shows the full stack: async request handling, SQLAlchemy 2.0 with async sessions, Pydantic v2 schema validation, Alembic migrations, Poetry dependency management, Docker Compose setup, and pytest with async test fixtures. Built to answer the question "what does well-structured Python API code look like" with a concrete, runnable example rather than a tutorial.
- Architecture (for diagram): HTTP request → FastAPI router → service layer → SQLAlchemy async session → PostgreSQL → Pydantic response schema
- Complexity: medium
- Tags: `Python`, `FastAPI`, `SQLAlchemy`, `PostgreSQL`, `Pydantic`, `Docker`, `asyncio`, `pytest`
- Links: repo `https://github.com/cmin764/deep-ice`
- Status: shipped
- Category: oss-hobby

---

**Pulsr**
- Tagline: Pipeline orchestration API for AI agents — ZenML-like infra for harnessing and scaling agents
- Description: Built to solve the problem of coordinating multiple AI agents across a DAG of steps with state management, retry logic, and observability. Inspired by ZenML and Prefect but focused on AI agent workflows rather than ML training pipelines. Agents are registered as pipeline steps, dependencies are declared explicitly, and execution is orchestrated via a FastAPI control plane.
- Architecture (for diagram): Pipeline definition (DAG) → Pulsr API (FastAPI) → step scheduler → agent execution (parallel/sequential) → state store → artifact registry → execution log
- Complexity: high
- Tags: `Python`, `FastAPI`, `MLOps`, `AI Agents`, `DAG`, `Orchestration`, `Pipeline`, `async`
- Links: repo `https://github.com/cmin764/pulsr`
- Status: in progress
- Category: oss-hobby

---

### Section: Frontend & Brand

---

**Wandercode Site**
- Tagline: Company site for the consultancy — built with the same stack I recommend to clients
- Complexity: medium
- Tags: `TypeScript`, `React`, `Vite`, `Tailwind`, `shadcn/ui`, `React Router`
- Links: site `https://www.wandercode.ltd/`, repo `https://github.com/cmin764/wandercode`
- Category: frontend-brand

---

**Nomad's Nest**
- Tagline: Short-term rental site for a self-catering apartment in Cyprus, built for digital nomads
- Complexity: low
- Tags: `TypeScript`, `Next.js`, `Tailwind`, `shadcn/ui`, `Vercel`
- Links: site `https://www.nomadsnest.live/`, repo `https://github.com/cmin764/nomads-nest`
- Category: frontend-brand

---

## TypeScript Data Interfaces

```typescript
// src/data/types.ts

export type Category =
  | 'active-venture'
  | 'startup-trial'
  | 'professional'
  | 'oss-hobby'
  | 'frontend-brand';

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
  id: string;                    // slug, used in diagram filename
  title: string;
  tagline: string;               // one-line problem statement
  description: string;           // 2-3 paragraph narrative
  category: Category;
  complexity: Complexity;
  status: ProjectStatus;
  tags: string[];
  company?: string;              // for professional projects
  period?: string;               // e.g. "2023-2024"
  links: ProjectLink[];
  diagramFile?: string;          // e.g. "traced-ai.svg" (iteration 2)
  highlights?: string[];         // bullet points for expanded view
  architectureNotes?: string;    // internal notes for diagram creation
}
```

```typescript
// src/data/categories.ts

export interface CategoryMeta {
  id: Category;
  label: string;
  description: string;
  order: number;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'active-venture',
    label: 'Active Ventures',
    description: 'Current operating entities',
    order: 1,
  },
  {
    id: 'startup-trial',
    label: 'Startup Trials',
    description: 'Experiments, bets, and lessons learned',
    order: 2,
  },
  {
    id: 'professional',
    label: 'Professional Work',
    description: 'Client engagements — no source code, architecture diagrams tell the story',
    order: 3,
  },
  {
    id: 'oss-hobby',
    label: 'Open Source',
    description: 'Selected technical showcases',
    order: 4,
  },
  {
    id: 'frontend-brand',
    label: 'Frontend & Brand',
    description: 'Product and design builds',
    order: 5,
  },
];
```

---

## File Structure

```
portfolio/
  .github/
    workflows/
      deploy.yml            -- bun install, bun run build, deploy-pages
  public/
    diagrams/               -- (iteration 2) exported SVGs, one per project
    favicon.svg
    og-image.png
  src/
    components/
      layout/
        Layout.tsx           -- Header + main + Footer
        Header.tsx           -- site name, theme toggle, nav
        Footer.tsx           -- links: GitHub, CV PDF, wandercode, cal, LinkedIn
      ui/                    -- shadcn/ui primitives (Button, Badge, Card, Collapsible)
      ProjectCard.tsx        -- collapsed state: title, tagline, badges, tags, links
      ProjectDetail.tsx      -- expanded state: diagram + description + highlights
      CategorySection.tsx    -- section header + project grid
      ComplexityBadge.tsx    -- low / medium / high indicator
      TechTag.tsx            -- pill-style tech tag
      FilterBar.tsx          -- category tab filter (All | Ventures | Trials | Professional | OSS | FE)
      DiagramViewer.tsx      -- (iteration 2) SVG display with dark mode handling
    data/
      types.ts               -- interfaces (above)
      projects.ts            -- ProjectData[] (all project data)
      categories.ts          -- CategoryMeta[] (above)
    hooks/
      useTheme.ts            -- dark mode (port from wandercode)
      useFilter.ts           -- active category filter state
    lib/
      utils.ts               -- cn() utility
      constants.ts           -- CV_PDF_URL, WANDERCODE_URL, CAL_URL, etc.
    pages/
      Index.tsx              -- assembles all 7 sections
    App.tsx                  -- React Router setup
    main.tsx                 -- React entry point
    index.css                -- Tailwind base + theme tokens (from wandercode)
    vite-env.d.ts
  index.html                 -- HTML shell with meta tags, OG, Twitter Card
  package.json
  tsconfig.json
  vite.config.ts             -- base: '/portfolio/'
  tailwind.config.ts
  postcss.config.js
  components.json            -- shadcn/ui config
  CLAUDE.md                  -- dev guidance (inherit from wandercode conventions)
  .gitignore
```

---

## GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
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
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## vite.config.ts Base Path

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

---

## Two-Iteration Approach

### Iteration 1: Ship the Cards

Get the site live with project cards, descriptions, and tech tags. No diagrams yet — diagram placeholders (grey box with label) where the SVG will go.

**Phases:**

**Phase 1 — Scaffold**
1. Create `portfolio` repo on GitHub (initialize empty, no template)
2. `bun create vite portfolio --template react-swc-ts` locally
3. Add Tailwind, shadcn/ui, lucide-react
4. Port from `cmin764/wandercode`:
   - `tailwind.config.ts` theme tokens (dark mode class strategy, custom colors)
   - `src/index.css` (CSS variables for light/dark)
   - `src/lib/utils.ts` (`cn()`)
   - `src/hooks/useTheme.ts`
   - `Layout.tsx`, `Header.tsx`, `Footer.tsx` (adapt nav links)
5. Set `base: '/portfolio/'` in `vite.config.ts`
6. Add `deploy.yml`
7. Push, enable Pages (source: GitHub Actions), verify site loads at `cmin764.github.io/portfolio`

**Phase 2 — Data + Components**
1. Create `src/data/types.ts` with interfaces (above)
2. Create `src/data/categories.ts` (above)
3. Create `src/data/projects.ts` — populate all projects from this blueprint
4. Build components (in order of dependency):
   - `ComplexityBadge.tsx`
   - `TechTag.tsx`
   - `ProjectCard.tsx` (collapsed, no diagram yet)
   - `ProjectDetail.tsx` (expanded with diagram placeholder)
   - `CategorySection.tsx`
   - `FilterBar.tsx`
5. Build `src/hooks/useFilter.ts`
6. Build `src/pages/Index.tsx` — assembles all sections
7. Update `App.tsx` to render `<Index />`
8. Add "Hobby Projects" link button (opens `https://github.com/stars/cmin764/lists/portfolio` in new tab)

**Phase 3 — Polish Iteration 1**
1. Add OG/Twitter Card meta tags in `index.html`
2. Add `og-image.png` (simple text-based design)
3. Responsive testing: 375px, 768px, 1024px, 1440px
4. Dark mode verification
5. Accessibility: keyboard nav, ARIA on collapsibles
6. Check TrueStory card has deck + blog links
7. Check NoMoreApply card has services repo link
8. Update `cmin764/cmin764` README.md (see section below)

---

### Iteration 2: Architecture Diagrams

After iteration 1 ships, research each project's architecture and generate Excalidraw diagrams. Focus on AI-related projects first.

**How to generate diagrams:**
- Use Excalidraw (excalidraw.com) with the `configs/system-design.excalidrawlib` library (in `cmin764/configs` repo)
- OR generate Excalidraw JSON via AI (describe component interactions → Claude generates the JSON) then load into Excalidraw
- Export each as SVG with transparent background
- Commit `.excalidraw` source to `src/diagrams/<id>.excalidraw`
- Commit exported SVG to `public/diagrams/<id>.svg`
- Add `diagramFile: '<id>.svg'` to the corresponding entry in `projects.ts`

**Dark mode handling:**
- SVGs use transparent background
- Apply `dark:invert` CSS class on the `<img>` tag in `DiagramViewer.tsx`
- OR export two variants (light/dark) and swap based on theme

**Diagram priority (AI projects first):**

| Priority | Project | Key components to show |
|----------|---------|----------------------|
| 1 | Traced AI | Client perimeter (library + SQLite + dashboard) ↔ Cloud (ingest API + ledger + rule registry). Outbound-only data flow for hashes. |
| 2 | VONQ Meeting Assistant | Recall bot → Meet → audio → NLP → private insight UI |
| 3 | Sema4.ai Action Server | LLM → Action Server → action registry → AI Actions → external systems |
| 4 | A5 Labs GTO Engine | FastAPI → C++ inference → game state I/O |
| 5 | VONQ Knowledge Base | Firecrawl → vector store → RAG → chat UI → job links |
| 6 | TrueStory | Flask/GCP → REST API → Chrome extension |
| 7 | Pulsr | DAG → API → step scheduler → agents → state store |
| 8 | DeepIce | HTTP → FastAPI → service layer → SQLAlchemy → PostgreSQL |
| 9 | Others | Robocorp RPA, Comfy gRPC, Cloudbase cloud-init |

---

## README.md Update (cmin764/cmin764)

In `README.md`, replace the current "Hobby projects" section:

```markdown
## 📌 Hobby projects

- **[Portfolio](https://github.com/stars/cmin764/lists/portfolio)** - collection of various hobby projects showcasing technical abilities
- **[DeepIce](https://github.com/cmin764/deep-ice)** - idiomatic Python web development template with async FastAPI
- **[TrueStory](https://github.com/savvybit)** - incentivize critical thinking in the polarized space of news ([deck](https://slides.com/cmin/truestory-venturecup) | [blog](https://cosminslife.wordpress.com/2020/08/16/truestory-app-or-how-i-learned-to-stop-worrying-and-love-the-process/))
```

With:

```markdown
## 🗂 Portfolio

System design, tech breakdowns, and impact stories across professional work, ventures, and open source:

**[cmin764.github.io/portfolio](https://cmin764.github.io/portfolio)**

Covering professional work (VONQ, Sema4.ai, A5 Labs), active ventures (Wandercode, NoMoreApply), startup trials (Traced AI, TrueStory), and open-source showcases.
```

---

## Key External Links (for `constants.ts`)

```typescript
export const LINKS = {
  portfolioUrl: 'https://cmin764.github.io/portfolio',
  cvPdfUrl: 'https://cmin764.github.io/cmin764/cv.pdf',
  wandercodeUrl: 'https://wandercode.ltd',
  calUrl: 'https://cal.com/wandercode/discovery-call',
  linkedinUrl: 'https://linkedin.com/in/cmin764',
  githubUrl: 'https://github.com/cmin764',
  hobbyProjectsUrl: 'https://github.com/stars/cmin764/lists/portfolio',
  email: 'cmin764@gmail.com',
};
```

---

## Reference Repos (for onboarding a new session)

| Repo | Purpose |
|------|---------|
| `cmin764/wandercode` | Port theme tokens, layout components, hooks |
| `cmin764/nomads-nest` | Reference for typed data file pattern (`src/data/listing-content.ts`) |
| `cmin764/configs` | Excalidraw library (`system-design.excalidrawlib`) for diagrams |
| `cmin764/cmin764` | Profile repo — update README.md after portfolio ships |
| `savvybit/TrueStory` | TrueStory repo link for the card |
| `NoMoreApply/services` | Services brochure repo link for the NoMoreApply card |
| `Sema4AI/gallery` | Public link for the Action Server / AI Actions card |
| `robocorp` org | Public link for the Robocorp RPA card |

---

## Verification Checklist

### Iteration 1
- [ ] `bun run build` completes without errors
- [ ] Site loads at `cmin764.github.io/portfolio`
- [ ] All 15 project cards render with correct data, tags, and complexity badges
- [ ] Category filter tabs work (All, Ventures, Trials, Professional, OSS, FE)
- [ ] Expandable cards toggle open/close
- [ ] "Hobby Projects" button opens GitHub stars list in new tab
- [ ] TrueStory card shows deck and blog links
- [ ] NoMoreApply card shows services repo link
- [ ] Traced AI card shows "In stealth — talk to me" CTA (no repo link)
- [ ] Dark mode toggle works
- [ ] Mobile responsive at 375px / 768px / 1024px / 1440px
- [ ] CV PDF at `cmin764.github.io/cmin764/cv.pdf` still works (unaffected)
- [ ] Profile README updated with Portfolio section

### Iteration 2 (additional)
- [ ] Each AI project card shows its diagram in expanded state
- [ ] Diagrams render correctly in both light and dark mode
- [ ] `.excalidraw` source files committed alongside SVGs
- [ ] No broken image references
