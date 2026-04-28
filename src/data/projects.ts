import type { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
  // Active Ventures
  {
    id: 'wandercode',
    title: 'Wandercode',
    tagline: 'Fractional AI Product Strategy for B2B companies',
    description:
      'Owner and operator of Wandercode, an embedded consulting practice helping B2B startups build intelligent products and adopt AI-driven engineering. Methodology: Blugen (blueprint-first code generation). Services: technical audits, AI product development, workshops. Results-based pricing, not hourly.',
    category: 'active-venture',
    complexity: 'medium',
    status: 'active',
    tags: ['TypeScript', 'React', 'Vite', 'Tailwind', 'AI Strategy', 'Consulting'],
    links: [
      { label: 'Site', url: 'https://www.wandercode.ltd/' },
      { label: 'Repo', url: 'https://github.com/cmin764/wandercode' },
    ],
    architectureNotes: undefined,
  },
  {
    id: 'nomoreapply',
    title: 'NoMoreApply',
    tagline: 'Private engineer community for peer-based job referrals. No recruiters.',
    description:
      'Co-founded with Angel Aytov and Cata Waack. A trust-based talent network where engineers refer each other directly to companies they\'ve worked at or know well. Vetting is peer-based, not algorithmic. The services brochure (linked below) was built with Claude-driven skill automation: a lightweight example of agentic content generation.',
    category: 'active-venture',
    complexity: 'medium',
    status: 'active',
    tags: ['Community', 'HR Tech', 'Claude Code', 'Automation', 'TypeScript'],
    links: [
      { label: 'Site', url: 'https://nomoreapply.com' },
      { label: 'Services', url: 'https://nomoreapply.github.io/services/' },
      { label: 'Org', url: 'https://github.com/NoMoreApply' },
    ],
    architectureNotes: undefined,
  },

  // Startup Trials
  {
    id: 'traced-ai',
    title: 'Traced AI',
    tagline: 'AI audit trail for compliance: proof that the AI decided correctly, when, and under which rule',
    description:
      'Built for regulated industries (banking, healthcare, defense) where "the AI decided" is not an acceptable answer. The traced-ai library auto-patches LLM clients (OpenAI, Anthropic, etc.) at import time. Raw inputs and outputs are written to a local SQLite store that never leaves the client perimeter. SHA-256 hashes of every I/O pair, plus the rationale string, are sent to an append-only chained ledger in the cloud. The dashboard ships as a Docker image for self-hosted deployments or as a hosted app on tracedai.co, backed by Supabase for managed Postgres and Upstash for Redis. The rule registry (EU AI Act, ISO 42001, SOC 2 mappings) is the moat: it translates regulatory text into concrete logging requirements per decision type, updated from real auditor interactions.',
    category: 'startup-trial',
    complexity: 'high',
    status: 'stealth',
    period: 'Apr 2026 – present',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'TypeScript', 'Fly.io', 'Vercel', 'Supabase', 'Compliance', 'EU AI Act'],
    links: [
      { label: 'In stealth. Talk to me.', url: 'https://cal.com/wandercode/discovery-call' },
    ],
    architectureNotes:
      'Client perimeter: AI application + traced-ai library → local SQLite (raw I/O) → self-hosted dashboard (Docker image or tracedai.co, reads local store only). Backend on Fly.io: FastAPI ingest API (receives hashes only) → a) rule lookup in rule registry (EU AI Act / ISO / SOC 2), b) appends signed entry to chained ledger. Library periodically pulls signed rule packages from rule registry. Data stores: Supabase (Postgres), Upstash (Redis). Cross-zone outbound only: hash(in) + hash(out) + rationale string. Raw data never crosses the network.',
    diagramFile: 'traced-ai.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=SbmFE1tRL0Yjwyir8d_AB,B_Syf48mjYf_8c672QG0FQ',
  },
  {
    id: 'truestory',
    title: 'TrueStory',
    tagline: 'News aggregator surfacing contradictory stories to incentivize critical thinking',
    description:
      'Co-founded in April 2019 with a team of four (AI, math, FE, and BE backgrounds). The idea: a Chrome extension surfacing contradicting news articles side-by-side for the same topic, letting readers be their own journalists without trusting a single source. Built a Flask app on Google Cloud Platform with a REST API powering the extension. Qualified for Innovation Labs Iași, then for the national Bucharest phase. Shut down in 2020 due to monetization challenges and market timing, but the process reshaped how I think about information asymmetry, product validation, and why "why" matters more than "how".',
    category: 'startup-trial',
    complexity: 'medium',
    status: 'discontinued',
    tags: ['Python', 'Flask', 'GCP', 'REST API', 'Chrome Extension', 'Bootstrap', 'jQuery'],
    links: [
      { label: 'Org', url: 'https://github.com/savvybit' },
      { label: 'Deck', url: 'https://slides.com/cmin/truestory-venturecup' },
      { label: 'Blog', url: 'https://cosminslife.wordpress.com/2020/08/16/truestory-app-or-how-i-learned-to-stop-worrying-and-love-the-process/' },
    ],
    diagramFile: 'truestory.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=H_bjzjVwgnLere2f58TW0,t5_z6jZ2DPPigMFn4N4uYw',
    architectureNotes: 'Chrome extension → Flask REST API (GCP): article URL / contradicting articles (sync REST). Flask API → News Sources: crawls articles on cron schedule.',
  },

  // Professional
  {
    id: 'vonq-meeting-assistant',
    title: 'Meeting Assistant',
    tagline: 'AI agent that joins Google Meet interviews, analyzes conversations, and gives private live insights to interviewers',
    description:
      'VONQ is a recruitment marketing platform distributing jobs to 5,000+ channels. This feature was the first of its kind at VONQ. Recall.ai connects to Google Meet as a bot participant and streams real-time transcripts via webhooks to the Django backend. OpenAI API analyzes the conversation and generates a live reply when the agent decides to intervene. ElevenLabs converts that text to speech, which streams back through Recall\'s listened page into the active call. The result: private live hints for the interviewer and optional unblocking dialogue, all without disrupting the session.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Recall.ai', 'Google Meet', 'OpenAI', 'ElevenLabs', 'WebSocket', 'AI Agents'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
    diagramFile: 'vonq-meeting-assistant.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=xbIm4bAe4sVKXbuSTg1R9,dNL8ZKhwVkkjrMvaqXEeWA',
    architectureNotes:
      'Recruiter triggers agent join → Recall.ai bot enters Meet → audio stream → speech-to-text → NLP analysis → private insight delivery to interviewer UI (WebSocket or polling) → optional agent intervention',
  },
  {
    id: 'vonq-knowledge-base',
    title: 'Knowledge Base & Careers Agent',
    tagline: 'Automatic career site crawler feeding an AI agent that recommends jobs from uploaded CVs',
    description:
      'Built a Firecrawl-powered crawler that ingests company career pages on a cron schedule and indexes job listings into Pinecone using OpenAI embeddings. The Careers Agent is delivered as an embeddable chat widget on the client\'s career site: candidates upload their CV and chat, the agent embeds the query with the same model used at index time, runs a k-NN search against the stored vectors, and feeds the retrieved listings into a completion call to narrow down matching roles. High-confidence matches route the candidate directly to the right job URL. Removed the need to manually browse job boards.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Firecrawl', 'RAG', 'Pinecone', 'LLM', 'React', 'AI Agents'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
    diagramFile: 'vonq-knowledge-base.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=OF5K2y8CG7m_HinJ8gYnu,73JNhJqrqjYYLmGtdnX-lQ',
    architectureNotes:
      'Career sites → Firecrawl crawler → vector store (embeddings) → Careers Agent (RAG) → candidate chat UI → matched job links',
  },
  {
    id: 'vonq-candidate-assessment',
    title: 'Candidate Assessment & Language Evaluator',
    tagline: 'Agentic pipeline for evaluating candidate quality, including a live language assessment MVP',
    description:
      'Built an agentic automation system to evaluate candidates across multiple criteria (skills alignment, communication quality, role fit). Added retry capability for audio web interviews via Retell: when a connection drops or the candidate cannot be heard, the session recovers gracefully. Delivered a language assessment MVP for a major European client, from initial chat-based screening through to a final PDF dossier for the recruiter with embedded language scores (vocabulary, speech fluency, semantics, coherence) exportable and shareable directly.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Retell', 'AI Agents', 'Audio Processing', 'React', 'Assessment', 'PDF', 'VONQ EQO'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
    diagramFile: 'vonq-candidate-assessment.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=PBAn3lK2lFTiBWWCXWXCx,fgXtn3MMwr6AnTJ-TuDN7w',
    architectureNotes:
      'Candidate input (text/audio) → assessment agent → multi-criteria scoring → VONQ EQO (review queue + stage update) → PDF dossier',
  },
  {
    id: 'a5-gto-engine',
    title: 'GTO / Reinforcement Learning Poker Engine',
    tagline: 'ML/AI system combining game theory optimal play and RL strategies for competitive online poker',
    description:
      'A5 Labs builds AI for competitive online gaming. Maintained and contributed to a micro-service mesh combining a Python/FastAPI orchestration layer with a C++ RL inference server (Drogon framework). The Python side has three services: a GTO service, a Strategy service, and a glue service routing between them under response-time constraints. Built an analysis benchmark for detecting regressions and measuring quality of strategy improvements, automated via Bitbucket CI data-science scripting.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'C++', 'Drogon', 'Reinforcement Learning', 'GTO', 'ML Inference', 'Bitbucket CI'],
    company: 'A5 Labs',
    period: '2025',
    links: [],
    diagramFile: 'a5-gto-engine.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=Je7AlNXFvYZ36fBvb8x12,wn0GHF8pjxgugy66RyPbrA',
    architectureNotes:
      'Game state input → FastAPI (Python) → C++ inference server (GTO/RL model) → action recommendation + EV output → client application',
  },
  {
    id: 'gorgias-appstore',
    title: 'Gorgias App Store',
    tagline: 'OAuth2 developer platform enabling third-party apps inside e-commerce support automation',
    description:
      'Gorgias is an e-commerce helpdesk targeting Shopify merchants. Led the Developer Experience team and built the technical foundation for the App Store: a Developer Portal for app registration and review, and an OAuth2 server (Flask + authlib) that issues tokens to third-party integrations. Auth0 handles merchant SSO login separately. External developers publish apps connecting their services to the Gorgias helpdesk platform, scoped per merchant account. Improved the REST API and developer docs.',
    category: 'professional',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'Flask', 'OAuth2', 'Auth0', 'PostgreSQL', 'REST API', 'E-commerce'],
    company: 'Gorgias',
    period: '2021',
    links: [
      { label: 'Docs', url: 'https://developers.gorgias.com/docs/private-vs-public-app' },
    ],
    diagramFile: 'gorgias-appstore.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=ZOqMjp6C3TSFrwp2qG9As,6Z1pzfP2NeZcjqNRjpqAXA',
    architectureNotes:
      'Developer Portal (Web UI) → App Store + OAuth Server (Flask + authlib): a) redirects to install URL, b) front-channel auth request / auth code, c) back-channel code-for-token. Auth0 = merchant SSO only. PostgreSQL: helpdesk data + app & OAuth state (configs, tokens, clients, codes). Third-party app calls Gorgias API with bearer token.',
  },
  {
    id: 'comfy-grpc',
    title: 'gRPC Smart Building APIs',
    tagline: 'Language-agnostic microservices backbone for IoT smart building systems via gRPC with reverse-proxy transcoding',
    description:
      'Comfy (acquired by Siemens ~2020) built software for smart buildings. Designed and implemented a gRPC-based API layer with a reverse-proxy transcoder (gRPC-gateway pattern) allowing HTTP/REST clients to consume gRPC services without rewriting. Enabled polyglot microservices: services written in Go, Python, and Node.js all communicated through a single typed interface. Protobuf spec-first development let FE and BE teams work in parallel, with mock data returned from the gateway until backend logic was ready. Also built a geolocation service for BMW campus navigation in Germany, with Mapbox-compliant APIs backed by PostGIS.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['gRPC', 'Go', 'Python', 'Protocol Buffers', 'REST', 'Microservices', 'IoT', 'Kubernetes'],
    company: 'Comfy (→ Siemens)',
    period: '2019-2020',
    links: [],
    architectureNotes:
      'REST clients → gRPC-gateway (reverse proxy) → gRPC services (Go/Python/Node) → IoT devices + DB → responses transcoded back to JSON',
  },
  // OSS / Hobby
  {
    id: 'robocorp-rpa',
    title: 'RPA Framework & Automation Libraries',
    tagline: 'Open-source Python automation libraries enabling enterprise RPA at scale',
    description:
      'Core contributor to Robocorp\'s open-source RPA framework, the Python-native successor to Robot Framework for enterprise automation. Built and maintained libraries for web automation, desktop automation, OCR, document processing, and data pipelines. These libraries are the foundation that hundreds of enterprise customers use to automate their workflows. Led library design, API surface, versioning, and contributor onboarding.',
    category: 'oss-hobby',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Robot Framework', 'RPA', 'Selenium', 'Playwright', 'OCR', 'Automation', 'PyPI', 'Open Source'],
    company: 'Robocorp / Sema4.ai',
    period: '2021-2024',
    links: [
      { label: 'Org', url: 'https://github.com/robocorp' },
      { label: 'Portal', url: 'https://robocorp.com/portal' },
    ],
    diagramFile: 'robocorp-rpa.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=A700XbNd1TvXyZ4A0-fL9,Uc2184W-YKO7N2aNi1C1jw',
    architectureNotes:
      'Developer → RCC CLI (builds env, rcc pull/run/cloud push) + robocorp-tasks (@task decorator) → Automation Libraries (robocorp-*: browser/windows/workitems/vault/storage/log; rpaframework-*: pdf/recognition/aws/google/openai/hubspot/windows) → Target Systems; robocorp-log → log.html + artifacts [async]; Control Room schedules + triggers RCC [async]; robocorp.com/portal feeds example-* repos to Developer + RCC',
  },
  {
    id: 'sema4ai-action-server',
    title: 'Action Server + AI Actions',
    tagline: 'MCP-like FastAPI server giving GPT "hands and legs": pluggable business logic executed post-reasoning',
    description:
      'Before MCP was standardized, Sema4.ai (formerly Robocorp) built their own protocol for exposing callable actions to LLMs. Action Server is a FastAPI-based server that hosts AI Actions: discrete, type-safe Python functions with metadata that GPT can discover and invoke. Each action is a pluggable unit of business logic: read a spreadsheet, query a database, trigger a workflow, post to Slack. The gallery of actions became a reference implementation used by enterprise customers. Led the engineering effort from architecture to production.',
    category: 'oss-hobby',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'LLM', 'OpenAI', 'MCP', 'Plugin Architecture', 'Pydantic', 'Docker'],
    company: 'Sema4.ai',
    period: '2023-2024',
    links: [
      { label: 'Server', url: 'https://github.com/Sema4AI/actions' },
      { label: 'Gallery', url: 'https://github.com/Sema4AI/gallery' },
    ],
    architectureNotes:
      'Developer authors @action | @tool Python (VS Code SDK) → Action Package (package.yaml + RCC env); Power User configures Sema4.ai Studio (LLM + connections + access); Studio discovers Action Server OpenAPI/MCP spec → LLM tool-use → Studio invokes Action Server → dispatches typed AI Action → External Systems (DB/API/browser/SaaS); Actions Gallery feeds both Developer and Studio',
    diagramFile: 'sema4ai-action-server.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=VI6ctFzzTysEXExIBwlXG,mssCYSqHaaao4pX6Pn6uqw',
  },
  {
    id: 'deep-ice',
    title: 'DeepIce',
    tagline: 'Idiomatic async Python web server template, showing how I approach backend development from scratch',
    description:
      'A reference implementation of a production-grade FastAPI application. Shows the full stack: async request handling, SQLModel for combined Pydantic + SQLAlchemy ORM, Alembic migrations, uv for dependency management, invoke for task automation, Redis for caching, Docker Compose setup, and pytest with async test fixtures. Built to answer "what does well-structured Python API code look like" with a concrete, runnable example rather than a tutorial.',
    category: 'oss-hobby',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'SQLModel', 'PostgreSQL', 'Redis', 'Pydantic', 'Docker', 'asyncio', 'pytest'],
    diagramFile: 'deep-ice.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=QdD3r77o1Olk8bWC_d9is,IvBnOu4HZEyz8MeTOYkXug',
    links: [
      { label: 'Repo', url: 'https://github.com/cmin764/deep-ice' },
    ],
    architectureNotes:
      'HTTP request → FastAPI router → service layer → SQLModel async session → PostgreSQL. CARD payments enqueued to Redis → ARQ worker confirms or cancels order. Alembic runs migrations at startup. Sentry for error tracking.',
  },
  {
    id: 'pulsr',
    title: 'Pulsr',
    period: '2025–present',
    tagline: 'Pipeline orchestration API for AI agents: ZenML-like infra for harnessing and scaling agents',
    description:
      'Built to solve the problem of coordinating multiple AI agents across a DAG of steps with state management, retry logic, and observability. Inspired by ZenML and Prefect but focused on AI agent workflows rather than ML training pipelines. Agents are registered as pipeline steps, dependencies are declared explicitly, and execution is orchestrated via a FastAPI control plane.',
    category: 'oss-hobby',
    complexity: 'high',
    status: 'in-progress',
    tags: ['Python', 'FastAPI', 'MLOps', 'AI Agents', 'DAG', 'Orchestration', 'Pipeline', 'async'],
    links: [
      { label: 'Repo', url: 'https://github.com/cmin764/pulsr' },
    ],
    architectureNotes:
      'Developer triggers pipeline run via REST API → Executor Service selects a Worker Agent → Worker Agent routes each step to a pluggable Execution Backend (Local subprocess or Docker container) and polls for completion → all state (pipelines, runs, steps, artifacts) persisted in a single SQLite DB',
    diagramFile: 'pulsr.svg',
    diagramExcalidrawUrl: 'https://excalidraw.com/#json=h7_u9DQNbw0r6uxv7ZyLH,LjyBiXM-29nE-X_XV-qaOQ',
  },

  // Frontend & Brand
  {
    id: 'wandercode-site',
    title: 'Wandercode website',
    tagline: 'Company site for the consultancy, built with the same stack I recommend to clients',
    description:
      'The public-facing site for Wandercode, deployed on Vercel. Built to practice what I preach: fast, accessible, and maintainable. Stack: Vite + React + TypeScript + Tailwind + shadcn/ui, managed with bun. Uses a /frontend-review skill for agentic self-review before merging.',
    category: 'frontend-brand',
    complexity: 'medium',
    status: 'active',
    tags: ['TypeScript', 'React', 'Vite', 'Tailwind', 'shadcn/ui', 'React Router', 'Vercel'],
    links: [
      { label: 'Site', url: 'https://www.wandercode.ltd/' },
      { label: 'Repo', url: 'https://github.com/cmin764/wandercode' },
    ],
  },
  {
    id: 'nomads-nest',
    title: "Nomad's Nest website",
    tagline: 'Short-term rental site for a self-catering apartment in Cyprus, built for digital nomads',
    description:
      'A Next.js site for a short-term rental property in Cyprus. 10+ page types: marketing, gallery with per-room sub-pages, booking, check-in guide, and legal. Framer Motion for scroll-triggered animations, lightbox gallery, reviews carousel, transport modal. Deployed on Vercel, managed with bun. Uses a /frontend-review skill for agentic self-review before merging.',
    category: 'frontend-brand',
    complexity: 'medium',
    status: 'active',
    tags: ['TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui', 'Framer Motion', 'Vercel Analytics', 'Vercel'],
    links: [
      { label: 'Site', url: 'https://www.nomadsnest.live/' },
      { label: 'Repo', url: 'https://github.com/cmin764/nomads-nest' },
    ],
  },

  // Writing
  {
    id: 'alchemy-entrepreneurship',
    title: 'The Alchemy of Entrepreneurship',
    tagline: 'An essay on startup failure as personal transformation, not loss',
    description:
      'Published on Medium. A reflection on the TrueStory startup journey: what a year of building a failed startup actually produces, why the process compounds even when the product does not, and how asking "why" more than "how" reshapes how you approach problems and people.',
    category: 'writing',
    complexity: 'low',
    status: 'shipped',
    tags: ['Writing', 'Entrepreneurship', 'Startups', 'Medium'],
    links: [
      { label: 'Read', url: 'https://cmin764.medium.com/the-alchemy-of-entrepreneurship-5de670f27fa2' },
    ],
  },
];
