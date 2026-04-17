---
topic: styling
source: Traced AI session (2026-04-16)
---

Color a node by its runtime role (what it does), not its implementation technology (what it is built on). Caches, key-value stores, and message brokers are data stores and take the orange palette, even if they are described in the brief as a "service" or named after a service-like product.

**Why:** The color palette communicates architectural role to the reader. A Redis instance holding reference data is a passive store regardless of what product powers it. Coloring it teal (service/API) implies it has behavior and endpoints of its own, which misleads readers about where logic lives.

**How to apply:** Ask "does this node execute business logic and respond to requests, or does it just hold data that other nodes read/write?" If the latter, use orange. Apply this check especially to: Redis, Memcached, S3, any node described as a registry, cache, store, or index.

**Edge case:** If a Redis instance genuinely runs Lua scripts or acts as a pub/sub broker driving downstream processing, it may warrant teal. But this must be explicit in the brief — default to orange.
