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
    complexity: 'high',
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
      { label: 'Services', url: 'https://github.com/NoMoreApply/services' },
    ],
    architectureNotes: undefined,
  },

  // Startup Trials
  {
    id: 'traced-ai',
    title: 'Traced AI',
    tagline: 'AI audit trail for compliance: proof that the AI decided correctly, when, and under which rule',
    description:
      'Built for regulated industries (banking, healthcare, defense) where "the AI decided" is not an acceptable answer. The traced-ai library auto-patches LLM clients (OpenAI, Anthropic, etc.) at import time. Raw inputs and outputs are written to a local SQLite store that never leaves the client perimeter. SHA-256 hashes of every I/O pair, plus the rationale string, are sent to an append-only chained ledger in the cloud. The rule registry (EU AI Act, ISO 42001, SOC 2 mappings) is the moat: it translates regulatory text into concrete logging requirements per decision type, updated from real auditor interactions.',
    category: 'startup-trial',
    complexity: 'high',
    status: 'stealth',
    tags: ['Python', 'FastAPI', 'SQLite', 'Cryptography', 'Compliance', 'EU AI Act', 'TypeScript', 'Docker'],
    links: [
      { label: 'In stealth. Talk to me.', url: 'https://cal.com/wandercode/discovery-call' },
    ],
    architectureNotes:
      'Client perimeter: AI application + traced-ai library → local SQLite (raw I/O) → self-hosted dashboard (Docker, reads local store only). Cloud: ingest API (receives hashes only, key auth) → chained ledger (append-only, signed) → rule registry (EU AI Act / ISO / SOC 2). Cross-zone outbound only: hash(in) + hash(out) + rationale string. Raw data never crosses the network. Three deployment tiers: cloud (SaaS dashboard on tracedai.co), enterprise (self-hosted Docker, no inbound ports), air-gapped (signed rule packages offline).',
  },
  {
    id: 'truestory',
    title: 'TrueStory',
    tagline: 'News aggregator surfacing contradictory stories to incentivize critical thinking',
    description:
      'Co-founded at Startup Weekend Iași 2014. Won Best Marketing award. Built a Flask app on Google Cloud Platform exposing a REST API consumed by a Chrome extension (Bootstrap + jQuery). The extension surfaced conflicting news sources side-by-side for the same topic. Designed the full architecture, deployed infrastructure, built the API. Shut down due to monetization challenges and market timing, but the experience shaped how I think about information asymmetry and media bias.',
    category: 'startup-trial',
    complexity: 'medium',
    status: 'discontinued',
    tags: ['Python', 'Flask', 'GCP', 'REST API', 'Chrome Extension', 'Bootstrap', 'jQuery'],
    links: [
      { label: 'Repo', url: 'https://github.com/savvybit/TrueStory' },
      { label: 'Deck', url: 'https://slides.com/cmin/truestory-venturecup' },
      { label: 'Blog', url: 'https://cosminslife.wordpress.com/2020/08/16/truestory-app-or-how-i-learned-to-stop-worrying-and-love-the-process/' },
    ],
    architectureNotes: 'Flask/GCP → REST API → Chrome extension',
  },

  // Professional
  {
    id: 'vonq-meeting-assistant',
    title: 'Meeting Assistant',
    tagline: 'AI agent that joins Google Meet interviews, analyzes conversations, and gives private live insights to interviewers',
    description:
      'VONQ is a recruitment marketing platform distributing jobs to 5,000+ channels. This feature was the first of its kind at VONQ. Integrated Recall.ai to join active Google Meet calls as a passive participant. The agent analyzed recruiter-candidate dialogue in real time, detected blocking moments (candidate too quiet, topic drift, answer quality signals), and delivered private hints to the interviewer without disrupting the call. Optionally could intervene to unblock dialogue. Backend in Python/Django, frontend signals via React.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Recall.ai', 'Google Meet', 'NLP', 'WebSocket', 'React', 'AI Agents'],
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
      'Built a Firecrawl-powered crawler that ingests company career pages and indexes job listings into a vector store. On top of this, a Careers Agent accepts candidate CV uploads and chat input, runs retrieval-augmented generation to match candidates to relevant open roles, and routes them to origin job pages with high-confidence matches. Reduced time-to-application for candidates by removing the need to manually browse job boards.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'Firecrawl', 'RAG', 'Vector Store', 'LLM', 'React', 'AI Agents'],
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
      'Built an agentic automation system to evaluate candidates across multiple criteria (skills alignment, communication quality, role fit). Delivered a language assessment MVP for a major European client: candidates complete a structured interview and receive a language proficiency score with justification. Reduced manual screening time significantly. Full FE/BE delivery including failure state tracking and candidate stage transitions.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'Django', 'AI Agents', 'Audio Processing', 'NLP', 'React', 'Assessment'],
    company: 'VONQ',
    period: '2025-2026',
    links: [],
    architectureNotes:
      'Candidate input (text/audio) → assessment agent → multi-criteria scoring → human review queue → ATS stage update',
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
      { label: 'Gallery', url: 'https://github.com/Sema4AI/gallery' },
    ],
    architectureNotes:
      'GPT / LLM → Action Server (FastAPI + action registry) → AI Action (Python function with schema) → external system (DB, API, file, etc.) → response back to LLM',
  },
  {
    id: 'a5-gto-engine',
    title: 'GTO / Reinforcement Learning Poker Engine',
    tagline: 'ML/AI system combining game theory optimal play and RL strategies for competitive online poker',
    description:
      'A5 Labs builds AI for competitive online gaming. Designed and built the Python/FastAPI API layer on top of a C++ inference server running GTO (Game Theory Optimal) and reinforcement learning poker models. The system takes game state as input (hole cards, board, pot, player actions) and returns recommended actions with EV calculations. Low-latency is critical: the C++ layer handles the compute, Python handles orchestration and external communication.',
    category: 'professional',
    complexity: 'high',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'C++', 'gRPC', 'Reinforcement Learning', 'GTO', 'ML Inference', 'Low Latency'],
    company: 'A5 Labs',
    period: '2025',
    links: [],
    architectureNotes:
      'Game state input → FastAPI (Python) → C++ inference server (GTO/RL model) → action recommendation + EV output → client application',
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
    tags: ['Python', 'Robot Framework', 'RPA', 'Selenium', 'OCR', 'Automation', 'PyPI', 'Open Source'],
    company: 'Robocorp / Sema4.ai',
    period: '2021-2024',
    links: [
      { label: 'Org', url: 'https://github.com/robocorp' },
    ],
    architectureNotes:
      'Robot/task definition → robocorp runtime → library layer (web/desktop/OCR/docs) → target systems → execution log + artifacts',
  },
  {
    id: 'comfy-grpc',
    title: 'gRPC Smart Building APIs',
    tagline: 'Language-agnostic microservices backbone for IoT smart building systems via gRPC with reverse-proxy transcoding',
    description:
      'Comfy (acquired by Siemens ~2020) built software for smart buildings. Designed and implemented a gRPC-based API layer with a reverse-proxy transcoder (gRPC-gateway pattern) allowing HTTP/REST clients to consume gRPC services without rewriting. Enabled polyglot microservices: services written in Go, Python, and Node.js all communicated through a single typed interface. Served as the data transport backbone for occupancy sensing, HVAC control, and workspace management features.',
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
  {
    id: 'cloudbase-cloud-init',
    title: 'Windows Cloud-Init Service',
    tagline: 'VM initialization agent for Windows on OpenStack IaaS, the cloud-init equivalent for Windows',
    description:
      'Cloudbase Solutions specialized in OpenStack deployments for Windows environments. Built the Windows cloud-init service that runs at VM first boot, reads the OpenStack metadata API, and configures the instance: hostname, network interfaces, SSH keys, user accounts, and custom scripts. A critical piece of infrastructure for enterprise OpenStack operators who needed Windows workloads alongside Linux VMs.',
    category: 'professional',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'Windows', 'OpenStack', 'IaaS', 'Cloud-Init', 'Infrastructure', 'DevOps'],
    company: 'Cloudbase Solutions',
    period: '2014-2015',
    links: [
      { label: 'Org', url: 'https://github.com/cloudbase' },
    ],
    architectureNotes:
      'VM boot → cloud-init agent → OpenStack metadata API → instance configuration (hostname / network / SSH keys / user accounts) → ready state',
  },

  // OSS / Hobby
  {
    id: 'deep-ice',
    title: 'DeepIce',
    tagline: 'Idiomatic async Python web server template, showing how I approach backend development from scratch',
    description:
      'A reference implementation of a production-grade FastAPI application. Shows the full stack: async request handling, SQLAlchemy 2.0 with async sessions, Pydantic v2 schema validation, Alembic migrations, Poetry dependency management, Docker Compose setup, and pytest with async test fixtures. Built to answer the question "what does well-structured Python API code look like" with a concrete, runnable example rather than a tutorial.',
    category: 'oss-hobby',
    complexity: 'medium',
    status: 'shipped',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Pydantic', 'Docker', 'asyncio', 'pytest'],
    links: [
      { label: 'Repo', url: 'https://github.com/cmin764/deep-ice' },
    ],
    architectureNotes:
      'HTTP request → FastAPI router → service layer → SQLAlchemy async session → PostgreSQL → Pydantic response schema',
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
    title: 'Wandercode Site',
    tagline: 'Company site for the consultancy, built with the same stack I recommend to clients',
    description:
      'The public-facing site for Wandercode. Built to practice what I preach: fast, accessible, and maintainable. Same stack as my client recommendations: Vite + React + TypeScript + Tailwind + shadcn/ui.',
    category: 'frontend-brand',
    complexity: 'medium',
    status: 'active',
    tags: ['TypeScript', 'React', 'Vite', 'Tailwind', 'shadcn/ui', 'React Router'],
    links: [
      { label: 'Site', url: 'https://www.wandercode.ltd/' },
      { label: 'Repo', url: 'https://github.com/cmin764/wandercode' },
    ],
  },
  {
    id: 'nomads-nest',
    title: "Nomad's Nest",
    tagline: 'Short-term rental site for a self-catering apartment in Cyprus, built for digital nomads',
    description:
      'A Next.js site for a short-term rental property in Cyprus. Built for SEO and performance: static generation, responsive design, Tailwind + shadcn/ui. Deployed on Vercel.',
    category: 'frontend-brand',
    complexity: 'low',
    status: 'active',
    tags: ['TypeScript', 'Next.js', 'Tailwind', 'shadcn/ui', 'Vercel'],
    links: [
      { label: 'Site', url: 'https://www.nomadsnest.live/' },
      { label: 'Repo', url: 'https://github.com/cmin764/nomads-nest' },
    ],
  },
];
