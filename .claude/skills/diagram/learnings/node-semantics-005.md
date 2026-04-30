---
topic: node-semantics
source: convention review (2026-04-30)
---

In Excalidraw, all active node roles use rounded rectangles — including databases, caches, and queues. This deviates from the common convention of using cylinders or ellipses for data stores. Compensate by always pairing color with an explicit type label (`<Database>`, `<Queue>`, `<Cache>`) and including a shape disclaimer in the legend: "All nodes: rounded rect. Role = color + label."

**Why:** Mermaid's `ContainerDb` and `ContainerQueue` primitives render with type indicators built in, but Excalidraw offers no cylinder primitive that stays consistent with the hand-drawn aesthetic. Uniform rounded rectangles keep the visual language clean; color + label carry the semantic load instead.

**Anti-pattern:** Relying on color alone without the type label. A reader may interpret orange as "warm accent" rather than "data store" if the `<Database>` label is absent.

**Fix:** Every DB/cache/queue node in Excalidraw must include the `<Type>` line in its bound text. The legend must state "All shapes are rounded rectangles; role = color + label." These two together compensate for the shape deviation.
