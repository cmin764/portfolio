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
      'Built for regulated industries (banking, healthcare, defense) where "the AI decided" is not an acceptable answer. The traced-ai library auto-patches LLM clients (OpenAI, Anthropic, etc.) at import time. Raw inputs and outputs are written to a local SQLite store that never leaves the client perimeter. SHA-256 hashes of every I/O pair, plus the rationale string, are sent to an append-only chained ledger in the cloud. The dashboard is a Next.js + shadcn/ui app deployed on Vercel, backed by Supabase for managed Postgres, Upstash for Redis, and Clerk for auth. The rule registry (EU AI Act, ISO 42001, SOC 2 mappings) is the moat: it translates regulatory text into concrete logging requirements per decision type, updated from real auditor interactions.',
    category: 'startup-trial',
    complexity: 'high',
    status: 'stealth',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'TypeScript', 'Fly.io', 'Vercel', 'Supabase', 'Clerk', 'Compliance', 'EU AI Act'],
    links: [
      { label: 'In stealth. Talk to me.', url: 'https://cal.com/wandercode/discovery-call' },
    ],
    architectureNotes:
      'Client perimeter: AI application + traced-ai library → local SQLite (raw I/O) → self-hosted dashboard (Next.js on Vercel, reads local store only). Backend on Fly.io: FastAPI ingest API (receives hashes only) → append-only chained ledger → rule registry (EU AI Act / ISO / SOC 2). Data stores: Supabase (Postgres), Upstash (Redis). Auth: Clerk. Cross-zone outbound only: hash(in) + hash(out) + rationale string. Raw data never crosses the network.',
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
    architectureNotes: 'Flask/GCP → REST API → Chrome extension',
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
    architectureNotes:
      'Recruiter triggers agent join → Recall.ai bot enters Meet → audio stream → speech-to-text → NLP analysis → private insight delivery to interviewer UI (WebSocket or polling) → optional agent intervention',
  },
  {
    id: 'vonq-knowledge-base',
    title: 'Knowledge Base & Careers Agent',
    tagline: 'Automatic career site crawler feeding an AI agent that recommends jobs from uploaded CVs',
    description:
      'Built a Firecrawl-powered crawler that ingests company career pages on a cron schedule and indexes job listings into Pinecone. The Careers Agent is delivered as an embeddable chat widget on the client\'s career site: candidates upload their CV and chat, RAG narrows down matching roles based on the conversation, and high-confidence matches route them directly to the right job URL on the client\'s site. Removed the need to manually browse job boards.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Firecrawl', 'RAG', 'Pinecone', 'LLM', 'React', 'AI Agents'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
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
    tags: ['Python', 'Django', 'Retell', 'AI Agents', 'Audio Processing', 'React', 'Assessment', 'PDF'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
    architectureNotes:
      'Candidate input (text/audio) → assessment agent → multi-criteria scoring → human review queue → ATS stage update',
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
    architectureNotes:
      'Game state input → FastAPI (Python) → C++ inference server (GTO/RL model) → action recommendation + EV output → client application',
  },
  {
    id: 'sema4ai-action-server',
    title: 'Action Server + AI Actions',
    tagline: 'MCP-like FastAPI server giving GPT "hands and legs": pluggable business logic executed post-reasoning',
    description:
      'Before MCP was standardized, Sema4.ai (formerly Robocorp) built their own protocol for exposing callable actions to LLMs. Action Server is a FastAPI-based server that hosts AI Actions: discrete, type-safe Python functions with metadata that GPT can discover and invoke. Each action is a pluggable unit of business logic: read a spreadsheet, query a database, trigger a workflow, post to Slack. The gallery of actions became a reference implementation used by enterprise customers. Led the engineering effort from architecture to production.',
    category: 'professional',
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
      'GPT / LLM → Action Server (FastAPI + action registry) → AI Action (Python function with schema) → external system (DB, API, file, etc.) → response back to LLM',
  },
  {
    id: 'robocorp-rpa',
    title: 'RPA Framework & Automation Libraries',
    tagline: 'Open-source Python automation libraries enabling enterprise RPA at scale',
    description:
      'Core contributor to Robocorp\'s open-source RPA framework, the Python-native successor to Robot Framework for enterprise automation. Built and maintained libraries for web automation, desktop automation, OCR, document processing, and data pipelines. These libraries are the foundation that hundreds of enterprise customers use to automate their workflows. Led library design, API surface, versioning, and contributor onboarding.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Robot Framework', 'RPA', 'Selenium', 'Playwright', 'OCR', 'Automation', 'PyPI', 'Open Source'],
    company: 'Robocorp / Sema4.ai',
    period: '2021-2024',
    links: [
      { label: 'Org', url: 'https://github.com/robocorp' },
      { label: 'Portal', url: 'https://robocorp.com/portal' },
    ],
    architectureNotes:
      'Robot/task definition → robocorp runtime → library layer (web/desktop/OCR/docs) → target systems → execution log + artifacts',
  },
  {
    id: 'gorgias-appstore',
    title: 'Gorgias App Store',
    tagline: 'OAuth2 developer platform enabling third-party apps inside e-commerce support automation',
    description:
      'Gorgias is an e-commerce helpdesk targeting Shopify merchants. Led the Developer Experience team and laid the technical foundation for an App Store: OAuth2 Authorization Code Grant flow (via Flask + authlib + Auth0), enabling external developers to publish and monetize integrations inside Gorgias. Improved the REST API and developer docs. Fast-paced startup environment with direct exposure to DX leadership and partner ecosystem building.',
    category: 'professional',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'Flask', 'OAuth2', 'Auth0', 'PostgreSQL', 'REST API', 'E-commerce'],
    company: 'Gorgias',
    period: '2021',
    links: [
      { label: 'Docs', url: 'https://developers.gorgias.com/docs/private-vs-public-app' },
    ],
    architectureNotes:
      'External developer → OAuth2 Authorization Code Grant (Flask + authlib + Auth0) → Gorgias API access token → third-party app installed in merchant account',
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
    id: 'deep-ice',
    title: 'DeepIce',
    tagline: 'Idiomatic async Python web server template, showing how I approach backend development from scratch',
    description:
      'A reference implementation of a production-grade FastAPI application. Shows the full stack: async request handling, SQLModel for combined Pydantic + SQLAlchemy ORM, Alembic migrations, uv for dependency management, invoke for task automation, Redis for caching, Docker Compose setup, and pytest with async test fixtures. Built to answer "what does well-structured Python API code look like" with a concrete, runnable example rather than a tutorial.',
    category: 'oss-hobby',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'SQLModel', 'PostgreSQL', 'Redis', 'Pydantic', 'Docker', 'asyncio', 'pytest'],
    links: [
      { label: 'Repo', url: 'https://github.com/cmin764/deep-ice' },
    ],
    architectureNotes:
      'HTTP request → FastAPI router → service layer → SQLModel async session → PostgreSQL → Pydantic response schema',
  },
  {
    id: 'pulsr',
    title: 'Pulsr',
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
      'Pipeline definition (DAG) → Pulsr API (FastAPI) → step scheduler → agent execution (parallel/sequential) → state store → artifact registry → execution log',
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
