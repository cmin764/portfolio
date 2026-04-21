# Knowledge Base & Careers Agent — Container Diagram (2025-2026)

Two-lane RAG pipeline: a cron-triggered Firecrawl crawler scrapes client career sites,
stores Documents in a Postgres Knowledge Base, and publishes events that drive an async
Embedding Sync Worker to embed and upsert into Pinecone. On the chat lane, a candidate
interacts with a React widget embedded on the client's site; the Careers Agent runs k-NN
retrieval against Pinecone and calls OpenAI for chat completion, returning matched role
links back through the widget.

Design notes that Mermaid C4 cannot fully render (preserved for the Excalidraw pass):
- The Candidate Chat Widget is embedded inside the Client Career Site, not on a VONQ
  domain. In Excalidraw, wrap `widget` in a boundary labeled "Embedded on client career
  site" using the bronze boundary tint (#eaddd7 / #846358).
- Two distinct flows share the Vector Index: the async crawl-and-index lane (top) and
  the sync chat lane (bottom). Keep them visually separated.
- Arrow styles for Excalidraw (UML 2.5 §17.4.4.1, system-design.md §9.3):
  - Sync (9 edges, default): strokeStyle "solid", endArrowhead "triangle" (closed filled)
  - Async (crawler → syncer, label [async]): strokeStyle "solid", endArrowhead "arrow" (open stick)
  - Cron (crawler → clientSite, label [cron]): strokeStyle "dashed", endArrowhead "triangle" (closed filled)
- Node fills for Excalidraw (pastel palette, text #1e1e1e):
  - Services (crawler, syncer, agent): bg #96f2d7, stroke #099268
  - Data stores (kb, pinecone): bg #ffd8a8, stroke #e8590c
  - UI (widget): bg #a5d8ff, stroke #1971c2
  - External (clientSite, openai): bg #e9ecef, stroke #868e96
- All Excalidraw elements: roughness 1, fontFamily 1 (Virgil).
- Use bound text via containerId, not inline label, per learnings/integration-001.md.

```mermaid
C4Container
  title Container Diagram for VONQ Knowledge Base & Careers Agent (2025-2026)

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  Person(candidate, "Candidate", "Uploads CV, sends chat messages")

  System_Ext(clientSite, "Client Career Site", "Hosts the chat widget; crawl target for job listings")
  System_Ext(openai, "OpenAI API", "Embeddings and chat completion")

  Container(crawler, "Career Site Crawler", "Firecrawl, Python", "Cron-triggered; scrapes job listings from client career sites")
  ContainerDb(kb, "Knowledge Base", "PostgreSQL", "Stores crawled Documents; source of truth before vectorisation")
  Container(syncer, "Embedding Sync Worker", "Python", "Event-driven; reads Documents, embeds, upserts vectors")
  ContainerDb(pinecone, "Vector Index", "Pinecone", "Stores and serves job embeddings for semantic retrieval")
  Container(agent, "Careers Agent", "Python, Django", "RAG orchestration: retrieves roles, composes reply")
  Container(widget, "Candidate Chat Widget", "React", "Embeddable UI on client career site")

  Rel_U(crawler, clientSite, "crawls [cron]")
  Rel_R(crawler, kb, "stores Document")
  Rel_R(crawler, syncer, "doc ready [async]")
  Rel_L(syncer, kb, "reads Document")
  Rel_R(syncer, openai, "embed text")
  Rel_D(syncer, pinecone, "upserts vectors")

  Rel_L(candidate, widget, "CV + message")
  Rel_U(widget, agent, "CV + query / matched roles + URLs")
  Rel_U(agent, openai, "embed + completion")
  Rel_L(agent, pinecone, "k-NN search")
  Rel_U(candidate, clientSite, "applies to job")

  UpdateElementStyle(widget, $bgColor="#438DD5", $borderColor="#3C7FC0", $fontColor="#ffffff")
  UpdateElementStyle(crawler, $bgColor="#00897B", $borderColor="#006B5E", $fontColor="#ffffff")
  UpdateElementStyle(syncer, $bgColor="#00897B", $borderColor="#006B5E", $fontColor="#ffffff")
  UpdateElementStyle(agent, $bgColor="#00897B", $borderColor="#006B5E", $fontColor="#ffffff")
  UpdateElementStyle(kb, $bgColor="#E65100", $borderColor="#CC5700", $fontColor="#ffffff")
  UpdateElementStyle(pinecone, $bgColor="#E65100", $borderColor="#CC5700", $fontColor="#ffffff")
```
