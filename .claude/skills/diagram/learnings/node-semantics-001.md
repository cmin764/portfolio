---
topic: node-semantics
source: Traced AI session (2026-04-16)
---

Passive stores (databases, caches, queues) cannot be the source of an initiating arrow. If a brief lists a database or cache as the origin of an edge, it is wrong — find the service that actually initiates and redirect the arrow from there.

**Why:** Databases and caches have no agency. They respond to queries; they do not decide to call other components. An arrow originating from a passive store implies active behavior that doesn't exist, which misleads readers about where the business logic lives.

**Anti-pattern:** `PostgresDB → RedisCache: "rule lookup"` — a DB cannot perform a lookup in another store on its own initiative.

**Fix:** Identify the service that orchestrates the interaction (the API or worker that handles the request), and draw `OrchestratingService → RedisCache: "rule lookup"` instead. Then separately draw `OrchestratingService → PostgresDB: "appends entry"` if that write also happens.

**Checklist rule:** Before finalising any edge list from a brief, scan for arrows whose source is a `ContainerDb`, `ContainerQueue`, or any node described as a database, cache, or queue. Flag each one and verify with the actual architecture before keeping it.
