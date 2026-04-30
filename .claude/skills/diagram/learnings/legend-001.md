---
topic: legend
source: convention review session (2026-04-29)
---

A legend is mandatory on every diagram. A reader must understand the diagram without external documentation. The direction rule "Arrows point from initiator to dependency" must appear in every legend, not just the arrow-style key.

**Canonical legend content:**
- Arrow style → interaction type (all four: solid+filled=sync, solid+open=async, dashed+filled=cron, dashed+open=secondary bg async)
- "Arrows point from initiator to dependency"
- Color → role (blue=UI, teal=service, orange=DB/cache, red=queue/stream, gray=external, indigo=person, amber=artifact)
- Boundary stroke vocabulary when both types appear on the diagram: `╌╌╌ GROUPING BOUNDARY` / `─── ZOOM-IN / EXPANDED CONTAINER`

**Legend box style:** yellow `#ffec99`, no border (`"strokeColor": "transparent"`), **sharp corners** (`"roundness": null`, non-rounded rectangle), `hachure` fillStyle, `#1e1e1e` text. Placed in a corner of the canvas.

**Why:** The 4-style arrow matrix, the direction convention, and the dual boundary stroke semantic are non-obvious to a first-time reader. Without the direction rule, a reader cannot tell initiator from dependency from the diagram alone. Without the boundary vocabulary, dashed vs solid bronze frames are ambiguous.

**Anti-pattern:** Treating the legend as optional ("include when diagram has varied edge types"): this leaves diagrams without a direction rule and without a color key, forcing readers to consult external documentation.
