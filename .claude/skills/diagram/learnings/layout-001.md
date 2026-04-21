---
topic: layout
source: TrueStory session (2026-04-15); anchored by Traced AI (2026-04-21)
---

In Mermaid C4, `Boundary` combined with directional `Rel` hints (`Rel_D`, `Rel_R`, `Rel_L`, `Rel_U`) collapses all nodes into a single row. Using plain `Rel(...)` without directional hints, `Boundary` renders cleanly and is the correct way to group related nodes.

**Why:** The layout engine treats a boundary block as one layout unit. Directional hints then override row wrapping entirely, collapsing everything horizontally regardless of node count. Plain `Rel` lets the engine distribute nodes normally.

**Anti-pattern:** `Boundary(b, "label") { Container(...) ... }` combined with directional `Rel_D`/`Rel_R`/`Rel_L`/`Rel_U` calls — this collapses layout.

**Fix:** Use `Boundary(...)` freely when grouping is load-bearing for the diagram's meaning. Stick to plain `Rel(from, to, "label")` — never directional variants. Pair with `UpdateLayoutConfig($c4ShapeInRow="N", $c4BoundaryInRow="M")` for grid control. Reference: `src/diagrams/traced-ai.md` uses two top-level `Boundary` blocks with plain `Rel` and renders cleanly.
