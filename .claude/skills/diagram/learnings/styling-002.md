---
topic: styling
source: Knowledge Base & Careers Agent session (2026-04-20)
---

In Mermaid diagrams, use deep saturated fill colors with white text (`$fontColor="#ffffff"`). Do not use pastel fills with dark text in Mermaid. Pastel fills are reserved for Excalidraw exports only.

**Why:** Pastel backgrounds (e.g. `#a5d8ff`, `#96f2d7`) have low contrast against dark-mode Mermaid canvas backgrounds. Saturated colors (e.g. `#438DD5`, `#00897B`, `#E65100`) maintain legibility across both light and dark themes in the Mermaid preview. Excalidraw renders on a light canvas with the hand-drawn aesthetic where pastels work well and should be preserved.

**Anti-pattern:** `$bgColor="#96f2d7" $fontColor="#1e1e1e"` in a Mermaid `UpdateElementStyle` — washes out on dark backgrounds.

**Fix:** In Mermaid `UpdateElementStyle`, use the saturated palette: UI/frontend `#438DD5 / #3C7FC0`, service/API `#00897B / #006B5E`, data store `#E65100 / #CC5700`, all with `$fontColor="#ffffff"`. When translating to Excalidraw element JSON, switch back to the pastel fills (`#a5d8ff`, `#96f2d7`, `#ffd8a8`) with dark text (`#1e1e1e`).
