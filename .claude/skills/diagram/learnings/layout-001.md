---
topic: layout
source: TrueStory session (2026-04-15)
---

Remove `System_Boundary` for small diagrams and use `$c4ShapeInRow="2"` to get a readable 2×2 grid instead of a single wide row.

**Before:** `System_Boundary` wrapping containers + `Rel_R`/`Rel_D` directional hints → all nodes squeezed into one row, cut-off person nodes, overlapping arrow labels.

**After:** No boundary wrapper, plain `Container` and `System_Ext` at top level, `UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")` → 2-column grid, nodes fully visible, labels readable.

**Why:** Mermaid C4's auto-layout algorithm treats `System_Boundary` as a single layout unit. When combined with directional hints it overrides row wrapping and collapses everything horizontally. Removing the boundary lets `$c4ShapeInRow` control wrapping correctly. For diagrams with 3–5 nodes, `$c4ShapeInRow="2"` gives the most balanced square layout.
