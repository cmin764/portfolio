---
topic: edge-semantics
source: TrueStory session (2026-04-15)
---

Never draw bidirectional arrows. For request-response pairs, use a single directional edge (caller→callee) with a label covering both directions when needed (e.g. "query / response").

**Why:** Reverse arrows rendered alongside forward arrows overlap visually in both Mermaid and Excalidraw — they share the same path and their labels collide. A sync arrowhead (filled triangle) already implies a response comes back; a second arrow adds noise without adding information.

**Anti-pattern:** Drawing two arrows between A and B — one for the request, one for the response — whenever communication is technically bidirectional.

**Fix:** One arrow from caller to callee. If both sides of the exchange are meaningful to document, encode them in the label: `"request payload / response payload"`. Reserve two separate arrows only when two genuinely distinct, independently initiated flows exist between the same nodes (e.g. bidirectional replication with different labels on each direction).
