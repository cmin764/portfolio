---
topic: node-semantics
source: convention review session (2026-04-29)
---

Three node categories share the same Excalidraw rounded-rectangle shape but differ by color and corner radius. Use these rules to assign the right palette when Excalidraw's shape variance is constrained.

| Category | Shape | Fill | Stroke / Text | Mermaid primitive |
|----------|-------|------|---------------|-------------------|
| Database / cache / index / registry / key-value store | Rounded rect (`roundness: {type: 3}`) | `#ffd8a8` | `#e8590c` | `ContainerDb` |
| Queue / stream / topic / pub-sub bus | Rounded rect (`roundness: {type: 3}`) | `#ffc9c9` | `#e03131` | `ContainerQueue` |
| Generated artifact / file / export | **Non-rounded rect** (`roundness: null`) | `#fef9c3` | `#ca8a04` | `System_Ext` + amber override |

**Decision boundary — DB vs Queue:** A node is a queue/stream (red) only if it is a true messaging primitive: its primary purpose is ordered message delivery between producers and consumers (Kafka topics, RabbitMQ queues, SQS, Redis Streams, Pub/Sub). Everything else that passively holds state — caches, registries, indexes, key-value stores, object stores — stays on the orange DB palette even if it is transient (Redis used as a cache, not a stream, stays orange).

**Artifact shape:** Sharp corners (`roundness: null`) on the amber rectangle signal "passive output, not a runtime actor." Rounded corners on every other node type mean "active runtime element." The corner radius alone carries this semantic in Excalidraw. In Mermaid, shape control is not available; use `System_Ext` with the amber `UpdateElementStyle` override and rely on the amber color.

**Why:** Before this rule, queues and databases were visually identical in diagrams that contained both. A reader could not distinguish a message queue from a data store at a glance. The red/orange split makes the semantic difference immediately visible without adding a new shape primitive.
