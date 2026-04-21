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
| Rule Registry | Container (service) | EU AI Act / ISO 42001 / SOC 2 mappings; Upstash (Redis) |

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

| Name | Role | Tech |
|------|------|------|
| Recruiter | Person | Triggers agent join via VONQ UI |
| Google Meet | External system | Active interview call |
| Recall.ai Bot | External system (SaaS) | Joins Meet as passive participant; streams audio |
| Webhook Receiver | Container (API endpoint) | Django; receives real-time transcript events |
| Analysis Engine | Container (service) | OpenAI API; analyzes turn-by-turn dialogue |
| TTS Service | External system (SaaS) | ElevenLabs; text-to-speech for agent voice |
| Recall Listened Page | External system | Recall.ai's audio injection endpoint |
| Interviewer UI | Container (web app) | React; shows private hints in real time |
| Candidate | Person (external) | In the Meet call; cannot see/hear private hints |

### Key edges

- Recruiter → VONQ UI: `triggers agent join` (sync)
- VONQ UI → Recall.ai Bot: `bot join request` (sync, REST)
- Recall.ai Bot → Google Meet: `joins as participant` (sync)
- Google Meet → Recall.ai Bot: `audio stream` (async, continuous)
- Recall.ai Bot → Webhook Receiver: `real-time transcript events` (async, webhook POST)
- Webhook Receiver → Analysis Engine: `transcript turn` (sync, OpenAI API call)
- Analysis Engine → Interviewer UI: `private insight` (async, WebSocket or polling)
- Analysis Engine → TTS Service: `reply text` (sync, when agent decides to speak)
- TTS Service → Recall Listened Page: `audio stream` (async)
- Recall Listened Page → Google Meet: `injects audio into call` (async)

### Design constraints worth showing visually

- **Two outputs from Analysis Engine**: one to Interviewer UI (private, silent), one optionally to ElevenLabs → call (audible). Show the branch.
- Candidate never receives the interviewer hint path. Can annotate with a dashed "not visible to candidate" boundary.
- The Recall Listened Page is the injection mechanism: audio goes in via an API endpoint that Recall exposes specifically for this pattern.

---

## 3. Sema4.ai Action Server

**C4 level:** Container
**Primary concern:** How an LLM discovers and invokes callable business logic
**Flow direction:** Left-to-right (LLM on left, external systems on right)

### Nodes

| Name | Role | Tech |
|------|------|------|
| LLM / GPT | External system | OpenAI GPT-4; generates tool-use requests |
| Action Server | Container (API) | FastAPI; hosts action registry + discovery endpoint |
| Action Registry | Container (data store) | In-memory or file-based; maps action names to Python functions |
| AI Action | Container (function) | Python function decorated with `@action`; type-safe, Pydantic-validated |
| External System | External system | Database, REST API, file system, Slack, etc. |

### Key edges

- LLM → Action Server: `action discovery (GET /actions)` (sync, REST)
- LLM → Action Server: `action invocation (POST /actions/{name})` (sync, JSON payload)
- Action Server → Action Registry: `resolve action by name` (sync, in-process)
- Action Registry → AI Action: `invoke with validated params` (sync)
- AI Action → External System: `execute business logic` (sync, protocol varies)
- External System → AI Action: `response` (sync)
- AI Action → Action Server: `typed result` (sync)
- Action Server → LLM: `structured JSON response` (sync)

### Design constraints worth showing visually

- Pre-MCP: annotate Action Server with "precedes MCP standard" to give historical context.
- The discovery step (GET /actions) returns an OpenAPI-compatible schema; LLM uses this to form subsequent calls.
- Each AI Action is a discrete, versioned, deployable unit. Show multiple AI Action boxes to emphasize the pluggability.
- The gallery (Sema4AI/gallery) is a collection of reference AI Actions. Can show as a separate "Actions Gallery" container pointing into Action Registry.

---

## 4. A5 GTO Engine

**C4 level:** Container
**Primary concern:** Python orchestration over C++ compute; low-latency service mesh
**Flow direction:** Left-to-right (game client → Python layer → C++ inference)

### Nodes

| Name | Role | Tech |
|------|------|------|
| Game Client | External system | Sends game state (hole cards, board, pot, action history) |
| GTO Service | Container (API) | Python + FastAPI; implements GTO decision logic |
| Strategy Service | Container (API) | Python + FastAPI; implements RL-based strategy |
| Glue Service | Container (API) | Python + FastAPI; routes between GTO/Strategy under time constraints |
| C++ Inference Server | Container (service) | C++ + Drogon framework; runs GTO/RL models |
| Benchmark Runner | Container (tool) | Python; analysis + regression/performance benchmark |
| Bitbucket CI | External system | Triggers benchmark runs on push |

### Key edges

- Game Client → Glue Service: `game state` (sync, REST)
- Glue Service → GTO Service: `route to GTO` (sync, internal)
- Glue Service → Strategy Service: `route to Strategy` (sync, internal)
- GTO Service → C++ Inference Server: `inference request` (sync, low-latency, HTTP)
- Strategy Service → C++ Inference Server: `inference request` (sync, low-latency, HTTP)
- C++ Inference Server → GTO Service / Strategy Service: `action + EV output` (sync)
- Glue Service → Game Client: `recommended action + EV` (sync)
- Bitbucket CI → Benchmark Runner: `trigger on push` (async)
- Benchmark Runner → GTO Service / Strategy Service: `regression + quality test` (async)

### Design constraints worth showing visually

- Label the **response-time constraint** on the Glue Service routing decision. It does not wait indefinitely for C++.
- C++ Inference Server is the compute-heavy core. Visually separate Python orchestration layer (left) from C++ compute layer (right).
- Benchmark Runner is a CI-only path. Show with dashed lines or a separate lane.

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

| Name | Role | Tech |
|------|------|------|
| Candidate | Person | Text or audio input |
| Chat Interface | Container (web UI) | React; initial text-based screening |
| Retell | External system (SaaS) | Audio web interview with retry-on-drop |
| Assessment Agent | Container (service) | Python + Django; orchestrates multi-criteria evaluation |
| Language Scorer | Container (service) | Evaluates vocabulary, speech fluency, semantics, coherence |
| ATS System | External system | Tracks candidate stage; receives stage updates |
| Recruiter UI | Container (web UI) | React; human review queue |
| PDF Dossier | Container (artifact) | Generated report: scores, justification, exportable |
| Recruiter | Person | Reviews dossier; approves/rejects |

### Key edges

- Candidate → Chat Interface: `text answers` (sync)
- Candidate → Retell: `audio interview` (sync; retry on connection drop)
- Chat Interface → Assessment Agent: `text transcript` (sync)
- Retell → Assessment Agent: `audio transcript` (async, webhook)
- Assessment Agent → Language Scorer: `transcript for scoring` (sync)
- Language Scorer → Assessment Agent: `scores (vocabulary, fluency, semantics, coherence)` (sync)
- Assessment Agent → PDF Dossier: `generates report` (sync)
- Assessment Agent → ATS System: `stage update` (async)
- Assessment Agent → Recruiter UI: `queues for human review` (async)
- Recruiter → Recruiter UI: `reviews + approves/rejects` (sync)
- Recruiter UI → PDF Dossier: `download/share` (sync)

### Design constraints worth showing visually

- Retell's retry logic: annotate the edge with "auto-retry on drop".
- The PDF dossier is the final human-facing artifact. End the flow there visually.

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
| GCP Infrastructure | External system | Hosting for Flask app |

### Key edges

- User → Chrome Extension: `browser interaction` (sync)
- Chrome Extension → Flask REST API: `query: current article URL` (sync, REST)
- News Sources → Flask REST API: `crawled articles` (async, cron)
- Flask REST API → Chrome Extension: `contradicting articles` (sync, JSON)
- Chrome Extension → User: `shows side-by-side contradictions` (sync, DOM injection)

---

## 8. Pulsr

**C4 level:** Container
**Primary concern:** DAG-based agent pipeline orchestration
**Flow direction:** Top-to-bottom (definition → execution → output)

### Nodes

| Name | Role | Tech |
|------|------|------|
| User / Developer | Person | Defines pipeline as DAG |
| Pulsr API | Container (API) | FastAPI; accepts pipeline definitions and run triggers |
| Step Scheduler | Container (service) | Resolves DAG dependencies; dispatches steps in order |
| Agent Executor | Container (service) | Runs individual agent steps (parallel or sequential) |
| State Store | Database | Tracks pipeline + step status; enables retries |
| Artifact Registry | Database | Stores step outputs for downstream consumption |
| Execution Log | Database | Immutable run history; observability |

### Key edges

- User → Pulsr API: `pipeline definition (DAG)` (sync, REST)
- User → Pulsr API: `trigger run` (sync, REST)
- Pulsr API → Step Scheduler: `enqueue DAG` (sync)
- Step Scheduler → State Store: `read/write step state` (sync)
- Step Scheduler → Agent Executor: `dispatch step` (async)
- Agent Executor → Artifact Registry: `store step output` (sync)
- Agent Executor → State Store: `update step status` (sync)
- Agent Executor → Execution Log: `append log entry` (async)
- Agent Executor → Step Scheduler: `signal completion` (async, triggers next step)

---

## 9. DeepIce

**C4 level:** Component (inside the FastAPI container)
**Primary concern:** Layered async Python API; shows idiomatic project structure
**Flow direction:** Top-to-bottom (HTTP in, Postgres out)

### Nodes

| Name | Role | Tech |
|------|------|------|
| HTTP Client | Person / External | Any REST consumer |
| FastAPI Router | Component | Route declarations, request validation |
| Service Layer | Component | Business logic; transaction boundaries |
| SQLModel Session | Component | Async ORM; Pydantic + SQLAlchemy combined |
| PostgreSQL | Database | Primary data store |
| Redis | Database (cache) | Response caching layer |
| Alembic | Container (tool) | Schema migrations; run via invoke tasks |

### Key edges

- HTTP Client → FastAPI Router: `HTTP request` (sync)
- FastAPI Router → Redis: `cache lookup` (sync, before hitting service)
- Redis → FastAPI Router: `cache hit → early return` (sync)
- FastAPI Router → Service Layer: `invoke service method` (sync)
- Service Layer → SQLModel Session: `async query / mutation` (async)
- SQLModel Session → PostgreSQL: `SQL via asyncpg` (async)
- PostgreSQL → SQLModel Session: `result set` (async)
- Service Layer → FastAPI Router: `domain object` (sync)
- FastAPI Router → HTTP Client: `Pydantic response schema (JSON)` (sync)

---

## 10. Robocorp RPA

**C4 level:** Container
**Primary concern:** How the library layer sits between robot definitions and target systems
**Flow direction:** Top-to-bottom

### Nodes

| Name | Role | Tech |
|------|------|------|
| Robot / Task Definition | Container | Robot Framework .robot files or Python tasks |
| Robocorp Runtime | Container | Task execution engine; manages environment + secrets |
| Web Automation Library | Container (library) | Selenium + Playwright; browser automation |
| Desktop Library | Container (library) | Windows/Linux desktop automation |
| OCR Library | Container (library) | Document reading, screen text extraction |
| Docs / PDF Library | Container (library) | PDF parsing and generation |
| Target Systems | External system | Web apps, desktop apps, file systems, ERPs |
| Execution Log + Artifacts | Database | Run reports, screenshots, extracted data |
| robocorp.com/portal | External system | Public library discovery + documentation |

### Key edges

- Robot / Task Definition → Robocorp Runtime: `execute task` (sync)
- Robocorp Runtime → Web Automation Library: `dispatch web step` (sync)
- Robocorp Runtime → Desktop Library: `dispatch desktop step` (sync)
- Robocorp Runtime → OCR Library: `dispatch OCR step` (sync)
- Robocorp Runtime → Docs / PDF Library: `dispatch docs step` (sync)
- Web Automation Library → Target Systems: `browser actions` (sync)
- Desktop Library → Target Systems: `desktop actions` (sync)
- OCR Library → Target Systems: `screen capture + extract` (sync)
- Robocorp Runtime → Execution Log + Artifacts: `write log + artifacts` (async)

---

## 11. Comfy gRPC Smart Building APIs

**C4 level:** Container
**Primary concern:** gRPC-gateway pattern enabling REST clients to consume gRPC services
**Flow direction:** Left-to-right

### Nodes

| Name | Role | Tech |
|------|------|------|
| REST Client (FE / mobile) | External system | Sends HTTP/JSON; never speaks gRPC directly |
| gRPC-gateway | Container (reverse proxy) | Transcodes HTTP/JSON ↔ gRPC; generated from .proto |
| gRPC Service (Go) | Container (service) | Go; occupancy sensing, core smart building logic |
| gRPC Service (Python) | Container (service) | Python; data processing, analytics |
| gRPC Service (Node.js) | Container (service) | Node.js; notification + event fanout |
| IoT Devices | External system | Sensors, HVAC, access control |
| Database | Database | Primary relational store |
| Geolocation Service | Container (service) | Python + PostGIS + Mapbox; BMW campus nav |
| Kubernetes | External system | Deployment + service discovery |

### Key edges

- REST Client → gRPC-gateway: `HTTP/JSON` (sync)
- gRPC-gateway → gRPC Service (Go): `gRPC call` (sync)
- gRPC-gateway → gRPC Service (Python): `gRPC call` (sync)
- gRPC-gateway → gRPC Service (Node.js): `gRPC call` (sync)
- gRPC Service (Go) → IoT Devices: `read/write device state` (sync)
- gRPC Service (Go) → Database: `persist` (sync)
- gRPC-gateway → REST Client: `JSON response (transcoded)` (sync)
- REST Client → Geolocation Service: `campus nav request` (sync, REST)
- Geolocation Service → Database: `PostGIS spatial query` (sync)

### Design constraints worth showing visually

- All services share the same `.proto` definitions. Annotate the proto file as the contract between gateway and services.
- Geolocation service is a separate, parallel track (BMW campus work). Can show in a separate bounded context box.
- The mock-data pattern: during spec-first development, gateway returns mock responses until services are ready. Annotate as a dashed "mock path" that was replaced.

---

## 12. Gorgias App Store

**C4 level:** Container
**Primary concern:** OAuth2 Authorization Code Grant flow for third-party app installation
**Flow direction:** Top-to-bottom (developer publishes → merchant installs → token exchange)

### Nodes

| Name | Role | Tech |
|------|------|------|
| External Developer | Person | Builds and publishes an app to Gorgias App Store |
| Merchant (Shopify) | Person | Installs a third-party app into their Gorgias account |
| Gorgias App Store | Container (web UI) | App listing, install button |
| Auth0 | External system (SaaS) | Identity provider; issues authorization codes |
| authlib | Container (library) | Flask extension implementing OAuth2 flows |
| Gorgias API | Container (API) | Flask + PostgreSQL; REST API for helpdesk data |
| Third-party App | External system | Developer's app; receives access token and calls API |

### Key edges

- External Developer → Gorgias App Store: `submits app` (sync)
- Merchant → Gorgias App Store: `clicks Install` (sync)
- Gorgias App Store → Auth0: `redirect: authorization request` (sync, OAuth2 redirect)
- Auth0 → Merchant: `login + consent screen` (sync)
- Auth0 → Gorgias App Store: `authorization code` (sync, redirect callback)
- Gorgias App Store → Auth0: `exchange code for token` (sync, back-channel)
- Auth0 → Gorgias App Store: `access token` (sync)
- Gorgias App Store → Third-party App: `access token delivered` (sync)
- Third-party App → Gorgias API: `API calls with token` (sync, REST)
- Gorgias API → PostgreSQL: `data access` (sync)

### Design constraints worth showing visually

- Show the **front-channel** (browser redirects) vs **back-channel** (server-to-server token exchange) split. This is the security-critical part of Authorization Code Grant.
- Third-party app ends up installed in the merchant's account context; annotate with "merchant-scoped access token".
