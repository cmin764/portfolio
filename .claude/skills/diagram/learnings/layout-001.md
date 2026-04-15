---
topic: layout
source: TrueStory session (2026-04-15)
---

In Mermaid C4, `System_Boundary` combined with directional `Rel` hints (`Rel_D`, `Rel_R`, `Rel_L`) collapses all nodes into a single row. For diagrams with ≤6 nodes, skip boundary wrappers and use `$c4ShapeInRow` for grid control instead.

**Why:** The layout engine treats a boundary block as one layout unit. Directional hints then override row wrapping entirely, collapsing everything horizontally regardless of node count.

**Anti-pattern:** `Boundary(b, "label") { Container(...) ... }` combined with directional `Rel_D`/`Rel_R` calls.

**Fix:** Place all nodes at the top level. Use `UpdateLayoutConfig($c4ShapeInRow="N", $c4BoundaryInRow="1")` where N ≈ `ceil(sqrt(node_count))` — e.g. 2 for 4 nodes, 3 for 6–9 nodes. If showing boundaries matters for the diagram's meaning, use a separate non-Mermaid Excalidraw export where you control layout manually.
