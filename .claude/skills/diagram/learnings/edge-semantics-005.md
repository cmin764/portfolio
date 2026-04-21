---
topic: edge-semantics
source: Knowledge Base & Careers Agent session (2026-04-21)
---

In Excalidraw exports, use `endArrowhead: "triangle"` for sync calls and `endArrowhead: "arrow"` for async. Never use `endArrowhead: "triangle_outline"` for async — it is the outlined large triangle, not the UML stick arrowhead.

**Why:** UML 2.5 §17.4.4.1 defines the arrowhead shapes by interaction semantics: a closed filled triangle means "sender blocks waiting for return"; an open stick arrow means "sender continues immediately, no return expected on this channel." `"arrow"` in Excalidraw's JSON maps to the open stick arrowhead (UML async). `"triangle_outline"` is a different shape — an outlined large triangle — and does not correspond to either standard.

**Anti-pattern:** Using `"triangle_outline"` for async, or `"arrow"` for sync. Both mislead readers about the blocking behavior of the call.

**Fix:**
- Sync: `"strokeStyle": "solid"`, `"endArrowhead": "triangle"`
- Async (fire-and-forget, event publish): `"strokeStyle": "solid"`, `"endArrowhead": "arrow"`
- Cron/dependency: `"strokeStyle": "dashed"`, `"endArrowhead": "triangle"`
