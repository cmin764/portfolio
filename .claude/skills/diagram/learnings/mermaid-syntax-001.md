---
topic: mermaid-syntax
source: TrueStory session (2026-04-15)
---

Never switch from `C4Container` to `flowchart LR` to fix layout or styling issues. `flowchart LR` is worse on both counts.

**Before:** Switched to `flowchart LR` to gain dashed edge styles and layout control. Used `<br/>` for line breaks in node labels.

**After:** Reverted to `C4Container`. Used short labels and `$c4ShapeInRow` instead.

**Why:** Two compounding problems with `flowchart LR`: (1) `<br/>` tags render literally as text — not as line breaks — so all node content collapses to a single unreadable line. (2) LR direction places every node on one horizontal row when there is no explicit row-break mechanism, making the diagram unusably wide. C4Container's `UpdateLayoutConfig` wraps rows reliably and renders correctly in both Cursor preview and Excalidraw export.
