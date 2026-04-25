---
topic: integration
source: diagram-skill consolidation session (2026-04-24)
---

Strip `[async]`, `[cron]`, and `[async, secondary]` meta-tags from all Excalidraw edge labels. These are Mermaid-only workarounds for the lack of native edge-style control. In Excalidraw, stroke style (solid/dashed) and arrowhead type (filled triangle / open stick) already encode the full interaction semantics — the tags are redundant and add noise to labels.

**Why:** Mermaid C4Container has no native dashed-edge or arrowhead control, so meta-tags are the only encoding available there. Excalidraw has first-class support for both properties — the tags no longer carry information and clutter the rendered label.

**Anti-pattern:** Edge labeled `"reports errors [async, secondary]"` in an Excalidraw export.

**Fix:** Keep only the semantic content: `"reports errors"`. The dashed+open-stick style already communicates the interaction type. Exception: `(planned)` and `(assumed)` are semantic annotations, not style hints — keep those.
