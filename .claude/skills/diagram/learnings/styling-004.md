---
topic: styling
source: Bulk CSV Ingest session (2026-05-02)
---

Use `"fillStyle": "solid"` on every Excalidraw shape — nodes, boundaries, and legend. Never `"hachure"`.

**Why:** `"hachure"` produces a cross-hatching texture that makes pastel fills look muddy and reduces text contrast. Flat solid color keeps the pastel palette clean and legible. The hand-drawn aesthetic is preserved by `roughness: 1` on strokes and the Virgil font — it does not require hatched fills.

**Anti-pattern:** Setting `"fillStyle": "hachure"` on node rectangles/ellipses. The hatching visually competes with the node text and dims the role-color signal.

**Fix:** Set `"fillStyle": "solid"` on every shape element in the Excalidraw JSON payload before calling `export_to_excalidraw`.
