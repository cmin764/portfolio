---
topic: mermaid-syntax
source: A5 GTO Engine session (2026-04-27)
---

When a node outside the primary service boundary has an edge pointing into that boundary, Mermaid's TB ranker treats the outside node as a dependency of the boundary and places it in a rank above it. This makes CI/monitoring nodes appear above the main service tier rather than beside it.

**Why:** Mermaid computes rank by topological sort on edges. An edge `outsideNode → boundary_member` creates a dependency from outsideNode to the boundary, so outsideNode gets ranked higher (earlier row) regardless of declaration order.

**Anti-pattern:** Declaring a CI or tooling node as a bare top-level node when it has an outgoing edge into the main service boundary. It will float above the boundary in TB layout.

**Fix:** Wrap the CI/tooling nodes in their own `Boundary(...)` block. Mermaid treats the boundary as a rank unit, which prevents the individual nodes inside it from being pulled up by their outgoing edges.
