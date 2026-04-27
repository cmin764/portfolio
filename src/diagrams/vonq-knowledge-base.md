# VONQ: Knowledge Base & Careers Agent (2025–2026) — Container Diagram

Two-lane RAG pipeline: a cron-triggered Career Site Crawler scrapes client career pages,
stores Documents in a Postgres Knowledge Base, and publishes events that drive an async
Embedding Sync Worker to embed via OpenAI and upsert into the Vector Index (Pinecone).
On the chat lane, a candidate interacts with a React widget embedded on the client's site;
the Careers Agent embeds the query with the same OpenAI model, runs k-NN retrieval against
the Vector Index, and feeds the results into a chat completion call to return matched roles.
The candidate then navigates directly to the job URL on the client career site.

Design notes that Mermaid C4 cannot fully render (preserved for the Excalidraw pass):
- The Candidate Chat Widget is embedded inside the Client Career Site, not on a VONQ
  domain. `widget` is wrapped in a boundary labeled "Embedded on client career site" in
  both Mermaid and Excalidraw. Excalidraw uses bronze boundary tint (#eaddd7 / #846358).
  All edges use plain Rel() — no directional hints (layout-001).
- Two distinct flows share the Vector Index: the async crawl-and-index lane (top) and
  the sync chat lane (bottom). Keep them visually separated.
- Arrow styles for Excalidraw (UML 2.5 §17.4.4.1, system-design.md §9.3):
  - Sync (9 edges, default): strokeStyle "solid", endArrowhead "triangle" (closed filled)
  - Async (crawler → syncer, label [async]): strokeStyle "solid", endArrowhead "arrow" (open stick)
  - Cron (crawler → clientSite, label [cron]): strokeStyle "dashed", endArrowhead "triangle" (closed filled)
- Node fills for Excalidraw (pastel palette, text = border color):
  - Services (crawler, syncer, agent): bg #96f2d7, stroke #099268
  - Data stores (kb): bg #ffd8a8, stroke #e8590c
  - External data store (pinecone): System_Ext primitive, but styled orange (bg #ffd8a8, stroke #e8590c) — external infra, owned data
  - UI (widget): bg #a5d8ff, stroke #1971c2
  - External (clientSite, openai): bg #e9ecef, stroke #868e96
- All Excalidraw elements: roughness 1, fontFamily 1 (Virgil).
- Use bound text via containerId, not inline label, per learnings/integration-001.md.

```mermaid
C4Container
  title VONQ: Knowledge Base & Careers Agent (2025–2026)

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Person(candidate, "Candidate", "Uploads CV, sends chat messages")

  System_Ext(clientSite, "Client Career Site", "Hosts the chat widget; crawl target for job listings")
  System_Ext(openai, "OpenAI API", "Embeddings and chat completion")

  Container(crawler, "Career Site Crawler", "Firecrawl, Python", "Cron-triggered; scrapes job listings from client career sites")
  ContainerDb(kb, "Knowledge Base", "PostgreSQL", "Stores crawled Documents; source of truth before vectorisation")
  Container(syncer, "Embedding Sync Worker", "Python", "Event-driven; reads Documents, embeds, upserts vectors")
  System_Ext(pinecone, "Vector Index", "Pinecone — external managed vector store; we own the data, not the infra")
  Container(agent, "Careers Agent", "Python, Django", "RAG orchestration: retrieves roles, composes reply")
  Boundary(clientEmbed, "Embedded on client career site", "deployment") {
    Container(widget, "Candidate Chat Widget", "React", "Embeddable UI on client career site")
  }

  Rel(crawler, clientSite, "crawls [cron]")
  Rel(crawler, kb, "stores Document")
  Rel(crawler, syncer, "doc ready [async]")
  Rel(syncer, kb, "reads Document")
  Rel(syncer, openai, "embed text")
  Rel(syncer, pinecone, "upserts vectors")

  Rel(candidate, widget, "CV + message")
  Rel(widget, agent, "CV + query / matched roles + URLs")
  Rel(agent, openai, "embed + completion")
  Rel(agent, pinecone, "k-NN search")
  Rel(candidate, clientSite, "applies to job")

  UpdateElementStyle(candidate, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(widget, $fontColor="#1971c2", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(crawler, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(syncer, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(agent, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(kb, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")
  UpdateElementStyle(pinecone, $fontColor="#e8590c", $bgColor="#ffd8a8", $borderColor="#e8590c")
  UpdateElementStyle(clientSite, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
  UpdateElementStyle(openai, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
```
