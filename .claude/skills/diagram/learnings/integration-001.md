---
topic: integration
source: TrueStory session (2026-04-15); bound text approach first shipped successfully in Traced AI export
---

The `label` property on shapes and arrows works in `create_view` (streaming format) but is stripped when exporting via `export_to_excalidraw`. Use explicit bound text elements with `containerId` for proper static export.

**Before:** `{ "type": "rectangle", ..., "label": { "text": "Chrome Extension\n...", "fontSize": 14 } }` passed to `export_to_excalidraw` → shapes and arrows render with no text whatsoever.

**After:** Separate `{ "type": "text", "id": "ext_lbl", "containerId": "ext", "textAlign": "center", "verticalAlign": "middle", ... }` elements alongside each shape, with `boundElements: [{"id": "ext_lbl", "type": "text"}]` on the shape itself.

**Why:** The `label` shorthand is a `create_view` MCP convenience that gets resolved at render time. The `export_to_excalidraw` endpoint expects the full Excalidraw file format where labels are stored as independent text elements bound to their containers via `containerId`. Arrow labels similarly need `"type": "label"` in `boundElements` on the arrow.
