# Traced AI — Container Diagram (2024–present)

<!-- Abstraction level: Container (C4)
     Two boundaries rendered side-by-side: client perimeter (left) vs TracedAI cloud (right).
     Boundaries are load-bearing here — the entire value prop is what stays local vs. what crosses the network.
     Directional Rel hints omitted to avoid layout collapse (layout-001).
     Signed Rule Packages modeled as an edge label (not a separate node) — it is a delivery mechanism, not a service.
-->

```mermaid
C4Container
  title Container Diagram for Traced AI

  Boundary(client, "Client Perimeter", "on-premise / client machine") {
    System_Ext(aiapp, "AI Application", "Any LLM-using app")
    Container(lib, "traced-ai Library", "Python SDK", "Monkey-patches LLM clients at import time")
    ContainerDb(sqlite, "Local SQLite", "SQLite", "Raw I/O store — never leaves client")
    Container(dash, "Dashboard", "Next.js + Docker", "Self-hosted; queries local store only")
  }

  Boundary(cloud, "TracedAI Cloud", "Fly.io / Supabase / Upstash") {
    Container(ingest, "Ingest API", "Python + FastAPI", "Receives hashes only — no raw data")
    ContainerDb(ledger, "Chained Ledger", "Postgres (Supabase)", "Append-only, cryptographically signed")
    Container(rules, "Rule Registry", "Redis (Upstash)", "EU AI Act / ISO 42001 / SOC 2 mappings")
  }

  Rel(aiapp, lib, "LLM calls intercepted")
  Rel(lib, sqlite, "writes raw I/O")
  Rel(lib, ingest, "hash(in) + hash(out) + rationale [async]", "HTTPS")
  Rel(ingest, ledger, "appends signed entry")
  Rel(ledger, rules, "rule lookup on ingest")
  Rel(rules, lib, "signed rule packages [async]")
  Rel(dash, sqlite, "reads raw I/O")

  UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="2")

  UpdateElementStyle(lib, $fontColor="#FFFFFF", $bgColor="#00897B", $borderColor="#006B5E")
  UpdateElementStyle(dash, $fontColor="#FFFFFF", $bgColor="#438DD5", $borderColor="#3C7FC0")
  UpdateElementStyle(sqlite, $fontColor="#FFFFFF", $bgColor="#FF6D00", $borderColor="#CC5700")
  UpdateElementStyle(ingest, $fontColor="#FFFFFF", $bgColor="#00897B", $borderColor="#006B5E")
  UpdateElementStyle(ledger, $fontColor="#FFFFFF", $bgColor="#FF6D00", $borderColor="#CC5700")
  UpdateElementStyle(rules, $fontColor="#FFFFFF", $bgColor="#00897B", $borderColor="#006B5E")
```
