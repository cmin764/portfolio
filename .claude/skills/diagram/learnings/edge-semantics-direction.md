---
topic: edge-semantics
source: TrueStory + Traced AI (2026-04-21); exception confirmed by Candidate Assessment (2026-04-21)
---

Arrow direction represents who initiates, not which direction data travels. Always draw from initiator to target — for pull-based relationships this is consumer→producer, for request-response this is caller→callee.

**Rules:**
1. **Initiator rule:** Ask "who decides when this interaction happens?" — draw the arrow from that node.
2. **No bidirectional arrows:** For request-response pairs, use a single arrow (caller→callee) with a combined label (e.g. `"query / response"`). A sync arrowhead already implies a return; a second arrow adds only visual noise.
3. **Pull = consumer→producer:** A cron crawl or scheduled fetch means the consumer owns the schedule. `Rel(crawlerService, externalSource, "fetches on schedule [cron]")` — data flows back, but the arrow points from the one in control.

**Why:** C4 arrows encode coupling direction ("A depends on B"), not data-flow direction. Reversing a pull arrow implies the producer pushes — a different runtime model with different failure modes and coupling implications.

**Anti-patterns:**
- `DataStore → ServiceA` labeled "periodic data sync" when ServiceA polls DataStore.
- Two arrows A→B and B→A for a single synchronous request-response.
- Arrow from an external source to an internal crawler as if the source initiates delivery.

**Exception:** Two arrows are valid only when two genuinely distinct, independently initiated flows exist between the same nodes (e.g. bidirectional replication where each side can initiate separately). Require distinct labels on each direction.
