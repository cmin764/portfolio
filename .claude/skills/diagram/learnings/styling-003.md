---
topic: styling
source: Pulsr session (2026-04-27)
---

Boundary boxes in Excalidraw must use `"strokeStyle": "dashed"`. This distinguishes the grouping frame from solid container boxes and aligns with C4 convention where system/trust boundaries are always rendered with a dashed border.

**Why:** The skill only specifies fill and stroke color for boundaries (`#eaddd7` / `#846358`), leaving stroke style undefined. Without an explicit `"strokeStyle": "dashed"`, Excalidraw defaults to solid — making the boundary visually indistinguishable from a regular container node.

**Anti-pattern:** `{ "type": "rectangle", "strokeColor": "#846358", "backgroundColor": "#eaddd7" }` with no `strokeStyle` set — renders as a solid-bordered frame, colliding visually with container boxes.

**Fix:** Always add `"strokeStyle": "dashed"` to every boundary rectangle element. Node containers stay `"strokeStyle": "solid"`.
