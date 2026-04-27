---
topic: mermaid-syntax
source: Pulsr session (2026-04-27)
---

Mermaid C4 silently drops all but the last `Rel()` when two or more edges share the same source and target alias. The diagram source is correct, but the preview is lossy.

**Why:** Mermaid deduplicates edges by `(from, to)` key at render time. There is no workaround within the C4Container syntax.

**Anti-pattern:** Expecting the Mermaid preview to faithfully show parallel edges between the same node pair. It will only show one.

**Fix:** Accept the limitation in the Mermaid source — document both edges in the `.md` file as the intent. Use the Excalidraw export as the authoritative rendered output for parallel edges; build them as explicit separate arrow elements in the JSON.
