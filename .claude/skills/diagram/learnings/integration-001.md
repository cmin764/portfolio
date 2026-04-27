---
topic: integration
source: TrueStory session (2026-04-15); bound text approach first shipped successfully in Traced AI export
---

The `label` property on shapes and arrows works in `create_view` (streaming format) but is stripped when exporting via `export_to_excalidraw`. Use explicit bound text elements with `containerId` for proper static export.

**Before:** `{ "type": "rectangle", ..., "label": { "text": "Chrome Extension\n...", "fontSize": 14 } }` passed to `export_to_excalidraw` → shapes and arrows render with no text whatsoever.

**After:** Separate `{ "type": "text", "id": "ext_lbl", "containerId": "ext", "textAlign": "center", "verticalAlign": "middle", ... }` elements alongside each shape, with `boundElements: [{"id": "ext_lbl", "type": "text"}]` on the shape itself.

**Why:** The `label` shorthand is a `create_view` MCP convenience that gets resolved at render time. The `export_to_excalidraw` endpoint expects the full Excalidraw file format where labels are stored as independent text elements bound to their containers via `containerId`. Arrow labels follow the same rule — every arrow must have a bound text element.

**Pre-export checklist (run before calling `export_to_excalidraw`):**
1. Every node has a bound text element (`type: "text"`, `containerId` = node id).
2. Every arrow that carries a label has a bound text element (`type: "text"`, `containerId` = arrow id).
3. Every shape and arrow has the corresponding text id listed in its `boundElements` array.
4. Missing any of these = silent blank labels in the exported file.
