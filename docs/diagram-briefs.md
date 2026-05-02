# Diagram Briefs

Structured input for Excalidraw diagram generation. One section per project.
Each brief is complementary to `portfolio-blueprint.md` (which has the narrative) and `projects.ts` (which has the one-line `architectureNotes`). This file has the node/edge breakdown, C4 level choice, and non-obvious design constraints.

---

## Priority order

| # | Project | Level | Why first |
|---|---------|-------|-----------|
| 1 | Traced AI | Container | Trust story depends on the diagram; data-boundary split is the entire value prop |
| 2 | VONQ Meeting Assistant | Container | Novel pipeline; hard to explain in text alone |
| 3 | Sema4.ai Action Server | Container | Pre-MCP, so needs context to land; diagram makes the analogy obvious |
| 4 | A5 GTO Engine | Container | Polyglot service mesh, C++/Python split not obvious from tags |
| 5 | VONQ Knowledge Base | Container | RAG pipeline with widget delivery angle |
| 6 | VONQ Candidate Assessment | Container | Multi-stage pipeline ending in PDF dossier |
| 7 | TrueStory | Container | Simple; fast win; good for testing diagram style |
| 8 | Pulsr | Container | DAG-based; good Mermaid-to-Excalidraw test case |
| 9 | DeepIce | Component | Layered FastAPI stack; useful reference pattern |
| 10 | Robocorp RPA | Container | Library-tree shape; shows contributor scope |
| 11 | Comfy gRPC | Container | gRPC-gateway pattern; protobuf spec-first |
| 12 | Gorgias App Store | Container | OAuth2 Authorization Code Grant flow |

---

## 1. Traced AI

**C4 level:** Container
**Primary concern:** Data-boundary (what crosses the network vs. what stays local)
**Flow direction:** Left-to-right (client perimeter on left, cloud on right)

### Nodes

| Name | Role | Tech |
|------|------|------|
| AI Application | External system (customer's code) | Any LLM-using app |
| traced-ai library | Container (library/SDK) | Python, monkey-patches LLM clients at import time |
| Local SQLite | Database | Raw I/O store; never leaves client machine |
| Self-hosted Dashboard | Container (web app) | Next.js + shadcn/ui on tracedai.co (SaaS tier) or Docker image (enterprise tier) |
| FastAPI Ingest API | Container (API) | Python + FastAPI on Fly.io; receives hashes only |
| Chained Ledger | Database | Append-only, cryptographically signed; Supabase (Postgres) |
| Rule Registry | Database / data store | EU AI Act / ISO 42001 / SOC 2 mappings; Upstash (Redis) |

### Key edges

- AI Application → traced-ai library: `LLM call intercepted` (sync, monkey-patch at import time)
- traced-ai library → Local SQLite: `raw I/O written` (sync, append-only write)
- traced-ai library → FastAPI Ingest API: `hash(in) + hash(out) + rationale` (async, HTTPS, outbound only, 32 bytes per event)
- FastAPI Ingest API → Rule Registry: `rule lookup on ingest` (sync)
- FastAPI Ingest API → Chained Ledger: `appends signed entry` (sync, with rule references baked in)
- traced-ai library → Rule Registry: `pulls signed rule packages` (async, periodic, verified on client before apply)
- Self-hosted Dashboard → Local SQLite: `reads raw I/O` (sync, local only, no network)

### Design constraints worth showing visually

- **Hard boundary line** between client perimeter (left) and cloud (right). Label it "no raw data crosses this boundary".
- Only one edge crosses from client to cloud: the hash + rationale payload.
- Only one edge crosses from cloud to client: signed rule update packages.
- Dashboard reads directly from local SQLite. Never from cloud.
- Three deployment tiers (annotate as callout or legend):
  - SaaS: dashboard on Vercel (tracedai.co)
  - Enterprise: dashboard as Docker image, no inbound ports
  - Air-gapped: signed rule packages delivered offline

---

## 2. VONQ Meeting Assistant

**C4 level:** Container
**Primary concern:** Real-time streaming pipeline from audio to private interviewer insight
**Flow direction:** Top-to-bottom (signal flows down through the pipeline)

### Nodes

| Alias | Name | Role | Tech |
|-------|------|------|------|
| `recruiter` | Recruiter | Person | Triggers agent join via VONQ UI |
| `candidate` | Candidate | Person | In the Meet call; cannot see/hear private hints |
| `ui` | VONQ Interviewer UI | Container (web app) | React; trigger control and private live insights |
| `webhook` | Webhook Receiver | Container (API endpoint) | Python, Django; ingests real-time transcript events |
| `engine` | Analysis Engine | Container (service) | Python, Django; orchestrates turn-by-turn reasoning and intervention |
| `meet` | Google Meet | External system | Live interview call, visible to all participants |
| `bot` | Recall.ai Bot | External system (SaaS) | Joins Meet as 3rd participant; streams audio and transcripts |
| `openai` | OpenAI API | External system | LLM reasoning over transcript turns |
| `tts` | ElevenLabs | External system (SaaS) | Text-to-speech for agent voice |
| `listened` | Recall Listened Page | External system | Recall.ai's audio injection endpoint back into the call |

### Key edges

- Recruiter → VONQ Interviewer UI: `triggers agent join` (sync)
- Recruiter → Google Meet: `joins call` (sync)
- Candidate → Google Meet: `joins call` (sync)
- VONQ Interviewer UI → Recall.ai Bot: `bot join request` (sync, REST)
- Recall.ai Bot → Google Meet: `joins as 3rd participant` (sync)
- Google Meet → Recall.ai Bot: `audio stream [async]` (async, continuous)
- Recall.ai Bot → Webhook Receiver: `transcript events [async webhook]` (async, webhook POST)
- Webhook Receiver → Analysis Engine: `transcript turn` (sync)
- Analysis Engine → OpenAI API: `analyze turn` (sync)
- Analysis Engine → VONQ Interviewer UI: `private insight [async, WebSocket]` (async)
- Analysis Engine → ElevenLabs: `reply text on intervene` (sync, conditional)
- ElevenLabs → Recall Listened Page: `audio stream [async]` (async)
- Recall Listened Page → Google Meet: `injects audio [async]` (async)

### Design constraints worth showing visually

- **Two outputs from Analysis Engine**: one to VONQ Interviewer UI (private, silent hint), one optionally to ElevenLabs → Recall Listened Page → call (audible reply). Show the branch clearly.
- Candidate never receives the private hint path. Annotate with a dashed "not visible to candidate" boundary (bronze tint).
- The bot IS visible to all call participants (shows in Meet roster). Only the hints sent to the interviewer UI are private.
- The Recall Listened Page is the audio injection mechanism: audio sent to this endpoint is injected back into the active call by Recall's infrastructure.

---

## 3. Sema4.ai Action Server

**C4 level:** Container
**Primary concern:** How typed Python functions become LLM-callable tools via an OpenAPI/MCP-compatible server
**Flow direction:** Left-to-right (authoring left, external systems right)

### Nodes (14)

| Alias | Name | Type | Role / Tech |
|-------|------|------|-------------|
| `dev` | Developer | Person | Authors `@action` \| `@tool` Python functions via VS Code SDK |
| `powerUser` | Power User | Person | Configures Studio: LLM provider, connections, OAuth, access grants |
| `gallery` | Actions Gallery | System_Ext | `github.com/Sema4AI/gallery` — reference Action Packages |
| `llm` | LLM / GPT | System_Ext | OpenAI / Azure / Bedrock — tool-use reasoning |
| `externalSystems` | External Systems | System_Ext | SharePoint, SAP, DBs, browsers, SaaS APIs |
| `actionPkg` | Action Package | Container | `package.yaml` + `@action` Python; RCC-managed env |
| `actionServer` | Action Server | Container | FastAPI + RCC; exposes `/openapi.json`, `/mcp`, `/actions/{name}`. Precedes MCP standard. |
| `registry` | Action Registry | ContainerDb | In-memory; name → Pydantic schema → OpenAPI spec; built at startup |
| `studio` | Sema4.ai Studio | Container | Desktop chat app; ingests OpenAPI/MCP spec; drives LLM tool-use loop |
| `actionA` | query_database | Container (AI Action) | Python `@action`; Postgres / Snowflake query |
| `actionB` | post_to_slack | Container (AI Action) | Python `@action`; SaaS API call |
| `actionC` | read_sheet | Container (AI Action) | Python `@action`; SharePoint / Sheets read |

Boundary `aiActions`: "AI Actions (Pydantic-typed Python, loaded from Action Package)" — contains `actionA`, `actionB`, `actionC`.

### Key edges (~15, all sync)

- `dev → actionPkg`: authors (`@action` | `@tool`, VS Code SDK)
- `dev → gallery`: contributes + pulls reference packages
- `powerUser → studio`: configures LLM + connections + access grants
- `studio → gallery`: browses + installs Action Packages
- `actionServer → actionPkg`: scans + loads `@action` functions at startup
- `actionServer → registry`: populates + looks up by name
- `studio → actionServer`: discovers actions (GET `/openapi.json` + `/mcp`)
- `studio → llm`: prompt + tool schema / tool-call response
- `studio → actionServer`: invokes action (POST `/actions/{name}`, validated JSON)
- `actionServer → actionA`: dispatches with validated params
- `actionServer → actionB`: dispatches with validated params
- `actionServer → actionC`: dispatches with validated params
- `actionA → externalSystems`: queries DB
- `actionB → externalSystems`: POSTs to SaaS API
- `actionC → externalSystems`: reads doc / sheet

### Design constraints

- Passive-store rule: `registry` has only incoming edges — `actionServer` is the initiator for both populate and lookup.
- Pull-direction: `dev → gallery` and `studio → gallery` point consumer → producer.
- "Precedes MCP standard" note lives in `actionServer`'s description string, not a separate node.
- Two `studio → actionServer` edges are distinct (discover vs invoke); separate arrows in Excalidraw with focus offsets.
- Edge label convention: `/` = req/resp split (left sent, right returned); `|` = logical OR alternative.

---

## 4. A5 GTO Engine

**C4 level:** Container
**Primary concern:** Polyglot service mesh; three sibling decision services behind a Glue router; C++/Python split
**Flow direction:** Top-down (game client → Glue → GTO / Strategy / RL; CI lane on the right)
**Diagram source:** `src/diagrams/a5-gto-engine.md`

### Nodes

| Name | Role | Tech |
|------|------|------|
| Game Client | External system | Sends game state (hole cards, board, pot, action history) |
| Glue Service | Container (API) | Python + FastAPI; routing + orchestration under response-time budget |
| GTO Service | Container (API) | Python + FastAPI; game-theory-optimal decision logic |
| Strategy Service | Container (API) | Python + FastAPI; non-GTO strategy heuristics |
| RL Service | Container (service) | C++ + Drogon; in-process inference server with trained RL models loaded at startup |
| Acebench | Container (tool) | Python; MLOps benchmark: regression detection + quality/latency tracking against baselines |
| Bitbucket CI | External system | Pipelines triggered on push / cron |

### Boundaries

- `Python tier (FastAPI)` — wraps Glue, GTO, Strategy
- `CI / MLOps` — wraps Bitbucket CI and Acebench

### Key edges

- Game Client → Glue Service: `game state / action + EV` (sync, combined req/resp)
- Glue Service → GTO Service: `route under time budget` (sync)
- Glue Service → Strategy Service: `route under time budget` (sync)
- Glue Service → RL Service: `route under time budget` (sync, low-latency HTTP)
- Bitbucket CI → Acebench: `triggers on push | cron` (dashed + filled triangle = cron trigger)
- Acebench → Glue Service: `runs regression + quality benchmarks` (sync, system-level)

### Design constraints

- RL Service stands outside the Python boundary to mark the C++ runtime split.
- Acebench targets Glue only (system-level end-to-end), not individual decision services.
- Response-time budget is in Glue's description and edge labels, not a separate visual element.
- Trained models live inside the RL Service description; no separate artifact node.

---

## 5. VONQ Knowledge Base & Careers Agent

**C4 level:** Container
**Primary concern:** Crawl-to-chat RAG pipeline with embedded widget delivery
**Flow direction:** Top-to-bottom (crawl+index pipeline on top, candidate chat lane at bottom)

### Nodes

| Alias | Name | Role | Tech |
|-------|------|------|------|
| `clientSite` | Client Career Site | External system | Any company careers page; crawl target and widget host |
| `openai` | OpenAI API | External system | Embeddings and chat completion |
| `crawler` | Career Site Crawler | Container (service) | Firecrawl, Python; cron-triggered scraper |
| `kb` | Knowledge Base | Database | PostgreSQL; stores crawled Documents; source of truth before vectorisation |
| `syncer` | Embedding Sync Worker | Container (service) | Python; event-driven; reads Documents, embeds, upserts vectors |
| `pinecone` | Vector Index | Database (vector store) | Pinecone; stores job embeddings; serves k-NN search |
| `agent` | Careers Agent | Container (service) | Python, Django; RAG orchestration; chat completion |
| `widget` | Candidate Chat Widget | Container (web UI) | React; embeddable on client career site |
| `candidate` | Candidate | Person | Uploads CV, types chat query |

### Key edges

Crawl + index pipeline (top lane):
- Career Site Crawler → Client Career Site: `crawls [cron]` (dashed + filled arrowhead; cron-triggered)
- Career Site Crawler → Knowledge Base: `stores Document` (sync)
- Career Site Crawler → Embedding Sync Worker: `doc ready [async]` (solid + open arrowhead; fire-and-forget event)
- Embedding Sync Worker → Knowledge Base: `reads Document` (sync)
- Embedding Sync Worker → OpenAI API: `embed text` (sync; blocks for vector result)
- Embedding Sync Worker → Vector Index: `upserts vectors` (sync)

Chat lane (bottom lane):
- Candidate → Candidate Chat Widget: `CV + message` (sync)
- Candidate Chat Widget → Careers Agent: `CV + query / matched roles + URLs` (sync req-resp; combined edge, widget initiates)
- Careers Agent → OpenAI API: `embed + completion` (sync; two sequential calls: embed query then chat completion)
- Careers Agent → Vector Index: `k-NN search` (sync)
- Candidate → Client Career Site: `applies to job` (sync; candidate navigates via link returned by agent — person crosses boundary, not widget)

### Design constraints worth showing visually

- The widget is **embedded on the client's own career site**, not on a VONQ domain. Wrap `widget` in a boundary labeled "Embedded on client career site" (bronze tint).
- Two distinct lanes share the Vector Index as the retrieval surface: keep the crawl pipeline (top) and chat lane (bottom) visually separated.
- The widget→agent interaction is a single combined req-resp edge (never split into two arrows per edge-semantics-001/003).
- The candidate (person) navigates to the job URL — not the widget. The widget only renders the link.
- OpenAI must appear once as an external node called by both the sync worker (embed text) and the agent (embed + completion). Same embedding model at index time and query time is an intentional constraint: vectors are only comparable within the same embedding space.

---

## 6. VONQ Candidate Assessment & Language Evaluator

**C4 level:** Container
**Primary concern:** Multi-stage evaluation pipeline ending in recruiter PDF dossier
**Flow direction:** Left-to-right (candidate input → assessment → recruiter output)

### Nodes

| Alias | Name | Role | Tech |
|-------|------|------|------|
| `candidate` | Candidate | Person | Text or audio input |
| `chat` | Chat Interface | Container (web UI) | React; initial text-based screening |
| `retell` | Retell | External system (SaaS) | Audio web interview with retry-on-drop |
| `agent` | Assessment Agent | Container (service) | Python + Django; orchestrates multi-criteria evaluation |
| `openai` | OpenAI API | External system | LLM prompting |
| `profile` | Candidate Profile DB | Container (database) | Postgres; scores, transcripts, stage |
| `scorer` | Language Scorer | Container (service) | Evaluates vocabulary, fluency, semantics, coherence; MVP add-on |
| `recruiter` | Recruiter | Person | Reviews dossier; approves/rejects |
| `ats` | VONQ EQO | Container (web UI) | React; review queue + stage management |
| `pdfService` | PDF Renderer | External system | HTML template + data to PDF |
| `pdf` | PDF Dossier | Container (artifact, amber) | Generated file; shareable snapshot of candidate profile; amber palette (#fef9c3/#ca8a04) distinguishes artifacts from data stores |

### Boundaries

- `inputSide` — Candidate Input (external): candidate, retell, chat
- `pipeline` — Assessment Pipeline (internal): agent, openai, profile
- `langEval` — Language Evaluator (MVP add-on) (feature): scorer
- `reviewSide` — Recruiter Review (internal): recruiter, ats, pdfService, pdf

### Key edges

- Candidate → Chat Interface: `text answers` (sync)
- Candidate → Retell: `audio interview` (sync)
- Chat Interface → Assessment Agent: `text transcript` (sync)
- Retell → Assessment Agent: `audio transcript [async]` (async, webhook)
- Assessment Agent → OpenAI API: `prompts + completions` (sync)
- Assessment Agent → Language Scorer: `transcript / language scores` (sync, combined req/resp)
- Language Scorer → OpenAI API: `prompts + completions` (sync)
- Assessment Agent → Candidate Profile DB: `writes scores + transcripts` (sync)
- Assessment Agent → VONQ EQO: `stage update + queues for review [async]` (async)
- Recruiter → VONQ EQO: `reviews, approves/rejects` (sync)
- VONQ EQO → Candidate Profile DB: `reads profile` (sync)
- VONQ EQO → PDF Renderer: `render PDF` (sync)
- PDF Renderer → PDF Dossier: `produces PDF` (sync)
- Recruiter → PDF Dossier: `downloads / shares` (sync)

### Design constraints

- Language Evaluator boundary wraps only Language Scorer to show it is an MVP add-on, not core pipeline.
- OpenAI is shared by both the assessment agent and the language scorer; no embeddings are used — LLM prompting only.
- The combined `agent ↔ scorer` arrow (transcript / language scores) represents a sync req/resp; the boundary already shows the feature split so two arrows are not needed.
- PDF Dossier is a passive artifact (sink only); no arrows originate from it.
- Plain `Rel()` throughout — no directional hints (avoids layout collapse with boundaries).

---

## 7. TrueStory

**C4 level:** Container
**Primary concern:** Chrome extension consuming a REST API backed by Flask/GCP
**Flow direction:** Left-to-right

### Nodes

| Name | Role | Tech |
|------|------|------|
| User / Reader | Person | In browser, reading news |
| Chrome Extension | Container (browser extension) | Bootstrap + jQuery; injects UI into news pages |
| Flask REST API | Container (API) | Python + Flask on GCP; aggregates + scores news |
| News Sources | External system | RSS feeds / crawled news sites |

### Key edges

- User → Chrome Extension: `opens extension / views contradictions` (sync)
- Chrome Extension → Flask REST API: `article URL / contradicting articles` (sync, REST — combined req-resp)
- Flask REST API → News Sources: `crawls articles [cron]` (cron — API initiates, dashed+filled in Excalidraw)

---

## 8. Pulsr

**C4 level:** Container
**Primary concern:** DAG-based agent pipeline orchestration
**Flow direction:** Top-to-bottom (definition → execution → output)

### Nodes

| Alias | Name | Role | Tech |
|-------|------|------|------|
| `user` | Developer | Person | Defines pipelines as DAGs and triggers runs |
| `api` | Pulsr API | Container (API) | FastAPI; accepts pipeline definitions and run triggers |
| `executor` | Executor Service | Container (service) | Python; orchestrates workers and backends; manages step state |
| `worker` | Worker Agent | Container (service) | Python / threading; routes steps to backends; polls execution status via daemon threads |
| `backend` | Execution Backend | Container (service) | Python; pluggable: Local (subprocess) or Docker container |
| `db` | SQLite | Database | Single store: pipelines, runs, steps, artifacts |

### Key edges

- User → Pulsr API: `pipeline definition (DAG)` (sync, REST)
- User → Pulsr API: `trigger run` (sync, REST)
- Pulsr API → SQLite: `creates pipeline / run / step records` (sync)
- Pulsr API → Executor Service: `dispatches step execution` (sync)
- Executor Service → SQLite: `reads / writes step run state` (sync)
- Executor Service → Worker Agent: `submits step` (sync)
- Worker Agent → Execution Backend: `runs step command` (async — fire-and-forget to backend)
- Worker Agent → Execution Backend: `polls execution status` (cron — daemon thread every 5 s)

### Design constraints

- All persistence is in a single SQLite database; the three logical concerns (run state, artifacts, logs) are separate tables within it, not separate containers.
- Worker Agent runs in-process with the API as daemon threads (heartbeat every 60 s, status check every 5 s). In a future distributed deployment, Worker Agents would be separate processes on remote machines (similar to GitHub Actions self-hosted runners).
- The `api → executor` dispatch is wired but the trigger_run background task integration is in-progress on `feature/interview`.
- Execution Backend is pluggable: Local (subprocess) and Docker are the two shipped implementations.

---

## 9. DeepIce

**C4 level:** Component (FastAPI internals as hero; outer containers shown for deployment context)
**Primary concern:** Layered async Python API; shows idiomatic project structure inside a real deployment topology
**Flow direction:** Top-to-bottom

**Boundary structure:** `System_Boundary(deepice)` → `Container_Boundary(fastapi)` → `Component()` nodes. The outer System boundary holds all owned containers; the inner Container boundary zooms into the FastAPI app. External actors and systems sit outside both.

**Color note:** All nodes use their runtime role palette (mint for services/workers, peach for data stores, blue for UI, gray for external systems). Role color takes precedence over boundary depth — no visual recede applied.

### Nodes

| Alias | Name | Role | Tech | Palette |
|-------|------|------|------|---------|
| `client` | REST Client | Person | Any HTTP consumer | Indigo (Person) |
| `router` | FastAPI Router | Component | Python / FastAPI | Mint (Service) |
| `service` | Service Layer | Component | Python | Mint (Service) |
| `session` | SQLModel Session | Component | SQLModel / asyncpg | Mint (Service) |
| `worker` | ARQ Worker | Container | Python / ARQ | Mint (Service) |
| `postgres` | PostgreSQL | ContainerDb | PostgreSQL / asyncpg | Peach (Data Store) |
| `redis` | Redis | ContainerDb | Redis | Peach (Data Store) |
| `alembic` | Alembic | Container | Python / Alembic | Mint (Service) |
| `sentry` | Sentry | System_Ext | — | Gray (External) |
| `nextjs` | Next.js Frontend | Container_Ext | TypeScript / Next.js | Blue (UI, planned) |
| `elk` | ELK Stack | System_Ext | Logstash + Elasticsearch + Kibana | Gray (External, planned) |
| `prometheus` | Prometheus / Grafana | System_Ext | — | Gray (External, planned) |

### Key edges

- `client` → `router`: `HTTP request / response` — REST/JSON (sync)
- `router` → `redis`: `cache lookup / stats write` (sync)
- `router` → `service`: `invokes service method` (sync)
- `service` → `session`: `async query / mutation` (async)
- `session` → `postgres`: `SQL via asyncpg` (async)
- `router` → `redis`: `enqueues payment task` (async — CARD payments only; second edge, parallel to cache edge)
- `worker` → `redis`: `polls for tasks` (cron — ARQ pull model)
- `worker` → `postgres`: `confirms or cancels order` — SQL via asyncpg (async)
- `alembic` → `postgres`: `applies migrations` (cron — once at startup)
- `router` → `sentry`: `reports errors` (async, secondary)
- `worker` → `sentry`: `reports errors` (async, secondary)
- `nextjs` → `router`: `API calls (planned)` — REST/JSON (sync, planned)
- `router` → `elk`: `ships app logs (planned)` (async, secondary, planned) — log shipping originates at the app/ASGI level, not from the ORM layer
- `prometheus` → `router`: `scrapes metrics (planned)` (cron, planned)

**Passive-store check:** No edge originates from `postgres`, `redis`, or `elk`. Pull direction on `worker → redis` is correct (ARQ worker initiates poll). `elk` remains passive: the app pushes logs to it, not the reverse.

---

## 10. Robocorp RPA

**C4 level:** Container
**Primary concern:** How RCC, robocorp-tasks, and two library families wire together from developer authoring to enterprise orchestration
**Flow direction:** Top-to-bottom

### Nodes

| Alias | Name | Role | Tech |
|-------|------|------|------|
| `dev` | Developer | Person | Automation engineer authoring robots |
| `portal` | robocorp.com/portal + example-* repos | External system | Gallery of pullable example robots hosted on GitHub |
| `rcc` | RCC CLI | Container | Go; OSS — self-contained Python envs; rcc pull / run / cloud push |
| `taskPkg` | Task Package | Container | robot.yaml + conda.yaml + tasks.py; one-robot deployable unit |
| `tasks` | robocorp-tasks | Container | Python; @task decorator, entry point + logging bootstrap |
| `libBrowser` | Browser lib | Container (inside boundary) | robocorp-browser / rpaframework (Selenium + Playwright) |
| `libDesktop` | Desktop lib | Container (inside boundary) | robocorp-windows / rpaframework-windows |
| `libDocs` | Docs + OCR lib | Container (inside boundary) | rpaframework-pdf + rpaframework-recognition |
| `libCloud` | Cloud integrations | Container (inside boundary) | rpaframework-aws / -google / -openai / -hubspot |
| `libData` | Data plumbing | Container (inside boundary) | robocorp-workitems + -vault + -storage |
| `libLog` | robocorp-log | Container (inside boundary) | Python; structured execution logging |
| `artifacts` | log.html + artifacts | Database | Run report, screenshots, extracted data |
| `targets` | Target Systems | External system | Web apps, desktop apps, cloud SaaS, filesystems, ERPs |
| `controlRoom` | Control Room | External system | Enterprise orchestration: scheduling, secrets, scaling |

**Boundary:** `libs` — "Automation Libraries (OSS on GitHub, published to PyPI — robocorp-* + rpaframework-*)" containing libBrowser, libDesktop, libDocs, libCloud, libData, libLog.

### Key edges

- dev → portal: `browses example repos` (sync)
- dev → rcc: `rcc pull / rcc run / rcc cloud push` (sync)
- dev → taskPkg: `authors` (sync)
- rcc → portal: `rcc pull example-* repos` (sync; consumer→producer)
- rcc → taskPkg: `builds env + executes` (sync)
- rcc → controlRoom: `submits + pushes` (sync)
- controlRoom → rcc: `schedules + triggers` (async — fire-and-forget)
- taskPkg → tasks: `imports @task` (sync)
- tasks → libBrowser: `dispatch` (sync)
- tasks → libDesktop: `dispatch` (sync)
- tasks → libDocs: `dispatch` (sync)
- tasks → libCloud: `dispatch` (sync)
- tasks → libData: `dispatch` (sync)
- tasks → libLog: `writes log events` (sync)
- libBrowser → targets: `browser actions` (sync)
- libDesktop → targets: `desktop actions` (sync)
- libDocs → targets: `document + screen` (sync)
- libCloud → targets: `API calls` (sync)
- libData → targets: `fetch/write work items + secrets` (sync)
- libLog → artifacts: `log.html + screenshots` (async — fire-and-forget)

---

## 11. Comfy gRPC Smart Building APIs

**C4 level:** Container
**Primary concern:** gRPC-gateway pattern enabling REST clients to consume polyglot gRPC services; spec-first contract per service
**Flow direction:** Left-to-right

### Boundaries

| Alias | Label | Type | Notes |
|-------|-------|------|-------|
| `k8s` | Kubernetes Cluster | Outer (bronze-1) | Wraps all deployed containers; K8s is a boundary, not a runtime node |
| `grpcSvcs` | gRPC Services | Inner (bronze-2) | Groups the three polyglot services + their per-service proto artifacts |
| `bmw` | BMW Campus Track | Inner (bronze-2) | Separate parallel track for geolocation work |

### Nodes

| Alias | Name | Role | Tech | Palette |
|-------|------|------|------|---------|
| `restClient` | REST Client | External system | HTTP/JSON only; never speaks gRPC | Gray |
| `iot` | IoT Devices | External system | Sensors, HVAC, access control hardware | Gray |
| `gateway` | gRPC-gateway | Container (reverse proxy) | Go; transcodes HTTP/JSON ↔ gRPC | Mint |
| `db` | Comfy DB | ContainerDb | PostgreSQL; sensor + occupancy records | Peach |
| `goSvc` | Occupancy Service | Container (service) | Go; sensing + core smart-building logic | Mint |
| `pySvc` | Data Service | Container (service) | Python; processing + analytics | Mint |
| `nodeSvc` | Notification Service | Container (service) | Node.js; event fanout | Mint |
| `protoOcc` | occupancy.proto | Artifact (diamond) | Protocol Buffers contract — occupancy + sensor API stubs | Amber |
| `protoData` | analytics.proto | Artifact (diamond) | Protocol Buffers contract — analytics API stubs | Amber |
| `protoNotif` | notification.proto | Artifact (diamond) | Protocol Buffers contract — notification + event API stubs | Amber |
| `geoSvc` | Geolocation Service | Container (service) | Python + PostGIS + Mapbox; BMW campus navigation | Mint |
| `geoDb` | 3D Maps DB | ContainerDb | PostgreSQL + PostGIS; spatial index for campus map data | Peach |

### Key edges

**Runtime (sync, solid + filled triangle):**
- `restClient → gateway`: `HTTP/JSON req / resp`
- `gateway → goSvc`: `gRPC: occupancy APIs`
- `gateway → pySvc`: `gRPC: analytics APIs`
- `gateway → nodeSvc`: `gRPC: notifications APIs`
- `goSvc → iot`: `read / write device state`
- `goSvc → db`: `persist sensor + occupancy data`
- `restClient → geoSvc`: `campus nav request`
- `geoSvc → geoDb`: `PostGIS spatial query`

**Build-time dependencies (dashed + filled triangle, consumers → spec):**
- `gateway → protoOcc`: `uses client stub`
- `gateway → protoData`: `uses client stub`
- `gateway → protoNotif`: `uses client stub`
- `goSvc → protoOcc`: `consumes spec`
- `pySvc → protoData`: `consumes spec`
- `nodeSvc → protoNotif`: `consumes spec`

### Design constraints worth showing visually

- One proto artifact per service (diamond shape, amber). Each has two inbound build-time edges: one from its service (implements server stub) and one from the gateway (uses client stub). This makes the per-service client/server contract pairing visible.
- Geolocation is a separate parallel track (BMW campus work) with its own spatial DB — isolated in the BMW Campus Track boundary.
- Mock-data dev pattern excluded: diagram documents the shipped runtime only.

---

## 12. Gorgias App Store

**C4 level:** Container
**Primary concern:** OAuth2 Authorization Code Grant flow — front-channel vs back-channel split, Developer Portal lifecycle, Gorgias as the OAuth server
**Flow direction:** Top-to-bottom

**Architectural note:** Gorgias runs its own OAuth2 server (Flask + authlib). The third-party app is the OAuth client. Auth0 is the merchant SSO identity provider only — it does not participate in third-party token issuance. The Developer Portal is a Web UI; all DB writes go through the App Store Flask backend.

### Nodes

| Name | Role | Tech | Palette |
|------|------|------|---------|
| External Developer | Person | Registers app; drives install + token exchange | Indigo |
| Merchant | Person | Browses App Store; authorizes third-party access | Indigo |
| Auth0 | External system | Merchant SSO identity provider (Gorgias login only) | Gray |
| Third-party App | External system | OAuth client; stores client credentials + tokens | Gray |
| Developer Portal | Container (Web UI) | App registration, OAuth2 config, review gate | Blue |
| App Store + OAuth Server | Container (API) | Flask + authlib + Auth0 SDK; app marketplace + OAuth2 server (/oauth/authorize, /oauth/token, consent UI) | Mint |
| Gorgias API | Container (API) | Flask + REST; helpdesk REST API at /api/*; validates bearer tokens | Mint |
| Gorgias DB | ContainerDb | PostgreSQL; helpdesk data + App & OAuth state: configs, tokens, clients, codes | Peach |

### Key edges (all sync)

- External Developer → Developer Portal: `registers + configures app`
- Developer Portal → App Store + OAuth Server: `publishes approved app listing`
- Merchant → App Store + OAuth Server: `browses + clicks Install + authorizes consent`
- Merchant → Auth0: `SSO login`
- App Store + OAuth Server → Third-party App: `a) redirects to install URL`
- Third-party App → App Store + OAuth Server: `b) auth request / auth code` (front-channel, browser redirect)
- Third-party App → App Store + OAuth Server: `c) code-for-token / access + refresh tokens` (back-channel, server-to-server)
- App Store + OAuth Server → Gorgias DB: `persists app registrations + review state`
- App Store + OAuth Server → Gorgias DB: `persists OAuth state`
- Third-party App → Gorgias API: `REST: bearer token`
- Gorgias API → Gorgias DB: `validates token + queries helpdesk data`

Note: edges b) and c) are parallel (same source/target pair). Mermaid renders only the last one; Excalidraw is authoritative. Same applies to the two App Store → DB edges.

### Design constraints worth showing visually

- Step labels a/b/c on the install flow make the OAuth sequence readable without a separate sequence diagram.
- Front-channel (b) vs back-channel (c) is the security-critical split — two visually distinct parallel arrows between Third-party App and App Store.
- Developer Portal has no direct DB edge — all writes route through the App Store backend (Web UI → API → DB layering).
- Auth0 has exactly one incoming arrow (SSO login) and zero outgoing — isolated from the OAuth code/token flow.

---

## 13. Bulk CSV Ingest

**C4 level:** Container
**Primary concern:** control-plane / data-plane split; presigned multipart upload path never touching the API; event-driven parser workers
**Flow direction:** left-to-right (user → upload path on top; S3 → SQS → parser → DB on bottom)

### Nodes (13)

| Alias | Name | Role | Tech |
|---|---|---|---|
| user | End User | Person | Browser; uploads CSV/XLSX, reviews rows, triggers avatar gen |
| dashboard | Dashboard | Container (SPA) | React + TS, served by CloudFront over private S3 origin |
| clerk | Clerk | External system (auth) | Hosted auth: orgs, roles, JWT; FastAPI middleware verifies tokens |
| alb | Application Load Balancer | Container (ingress) | AWS ALB; TLS termination |
| api | Ingest API | Container (service) | Python + FastAPI on ECS Fargate; presigned URLs, status, on-demand avatar; control-plane only |
| s3uploads | Uploads Bucket | Container (object store) | AWS S3, SSE-KMS; prefix `org/{orgId}/upload/{uploadId}/`; lifecycle: Standard → Standard-IA @30d → Glacier IR @90d; never expire |
| s3avatars | Avatars Bucket | Container (object store) | AWS S3; key by deterministic seed `hash(orgId, recordId)`; presigned reads |
| sqs | Ingest Queue | Container (queue) | AWS SQS Standard; consumes S3 ObjectCreated events |
| dlq | Dead-Letter Queue | Container (queue) | AWS SQS; captures failed parse messages after max retries |
| parser | Parser Worker | Container (worker) | Python on ECS Fargate; autoscaled on queue depth; stream-parses, validates email syntax, bulk-inserts valid + invalid rows |
| mongo | Personal Data Store | Container (database) | MongoDB Atlas, sharded; shard key `(orgId, uploadId)`; collections: `uploads`, `records`, `processing_status` |
| imageapi | Image Gen API | External system | Replicate or OpenAI `gpt-image-1`; identicon-style prompts seeded by `hash(orgId, recordId)` |
| secrets | Secrets Manager | Container (config) | Clerk backend secret + image API key; IAM-scoped to FastAPI task role |

### Edges

- `user → dashboard`: uses (sync)
- `dashboard → clerk`: sign-in, fetch JWT (sync)
- `dashboard → alb`: HTTPS request with Clerk JWT in header (sync)
- `alb → api`: forward request (sync)
- `api → secrets`: fetch Clerk verification key + image API key (sync, cached)
- `api → s3uploads`: create multipart upload, generate presigned part URLs (sync)
- `api → mongo`: create `uploads` doc, query `records` (sync)
- `dashboard → s3uploads`: PUT parts via presigned URLs — resumable multipart (sync per part)
- `s3uploads → sqs`: ObjectCreated event on CompleteMultipartUpload (async, S3 event notification)
- `parser → sqs`: polls (sync; consumer-pulls-queue per edge-direction convention)
- `parser → s3uploads`: GET object stream (sync)
- `parser → mongo`: bulk-insert valid + invalid rows; update `uploads.status`; append `processing_status` (sync)
- `sqs → dlq`: dead-letter after max retries (async, dashed)
- `api → imageapi`: generate identicon for `recordId` (sync HTTPS, on-demand, after cache miss)
- `api → s3avatars`: store image keyed by seed; subsequent calls hit cache (sync)
- `dashboard → s3avatars`: GET avatar via presigned URL (sync)

### Design constraints worth showing visually

- Three boundaries: one outer `System_Boundary("Bulk CSV Ingest")`; inner `Container_Boundary("Control Plane")` groups `alb`, `api`, and `secrets`; inner `Container_Boundary("Ingest Plane")` groups `sqs` + `dlq` + `parser`. Makes the control/data-plane split visible at a glance.
- Multi-tenant isolation visible in node labels: S3 prefix `org/{orgId}/upload/{uploadId}/`, MongoDB shard key `(orgId, uploadId)`.
- Avatar generation is on-demand (no avatar queue, no fan-out worker). FastAPI calls external API only on user click; result cached in S3 by deterministic seed.
- Default upload path is raw multipart. Optional client-side zstd compression is not drawn (opt-in toggle, not the default path).
- Validation: email syntax only (RFC 5322 simplified). Structured error codes (`INVALID_EMAIL_SYNTAX`, `MISSING_FIELD`) stored per row — extensible without schema churn.
- S3 lifecycle annotation on `s3uploads`: Standard → Standard-IA @30d → Glacier IR @90d, never expire.
- `s3uploads → sqs` is the one passive-store edge; justified by S3 event notifications being an active AWS push (exception to passive-store rule).
