---
topic: styling
source: Knowledge Base & Careers Agent session (2026-04-20); revised 2026-04-21
---

Use the same pastel palette for both Mermaid C4 and Excalidraw exports. The C4Container library renders its own light-background canvas around nodes, so pastel fills with `$fontColor="#1e1e1e"` remain legible regardless of editor dark mode.

**Why:** The earlier assumption — that pastels wash out on dark-mode canvas — only holds if Mermaid renders directly on the editor background. C4Container does not; it draws a framed internal canvas. The traced-ai diagram (first shipped, always correct) uses pastels in Mermaid and is the evidence this works.

**Anti-pattern:** Switching to saturated fills + white text (`$fontColor="#ffffff"`) in Mermaid while reserving pastels for Excalidraw. This creates a two-palette split with no visual benefit and makes Mermaid previews look inconsistent with exported diagrams.

**Fix:** Use the pastel palette in both contexts:
- Service: `$bgColor="#96f2d7" $borderColor="#099268" $fontColor="#1e1e1e"`
- Data store: `$bgColor="#ffd8a8" $borderColor="#e8590c" $fontColor="#1e1e1e"`
- UI/frontend: `$bgColor="#a5d8ff" $borderColor="#1971c2" $fontColor="#1e1e1e"`
