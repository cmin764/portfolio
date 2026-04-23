---
topic: styling
source: Knowledge Base & Careers Agent session (2026-04-20); revised 2026-04-22
---

Use the same pastel palette for both Mermaid C4 and Excalidraw exports. Each node has a three-value color pair: pastel fill, a darker border, and a text color that equals the border color. Text and border are always the same value.

**Why:** The fill is the "light" half of the pair; the border/text is the "dark" half. Using the border color as text color creates visual coherence — each node looks like a self-contained branded element rather than black text floating on a colored background. The robocorp-rpa.svg export confirms this: teal service nodes have `#099268` text, indigo person nodes have `#748ffc` text, gray external nodes have `#868e96` text. Generic `#1e1e1e` text breaks this pairing and is visually flatter.

**Anti-pattern 1:** Using `$fontColor="#1e1e1e"` (generic black) instead of the border color. This is the old default and produces visually inconsistent nodes.

**Anti-pattern 2:** Switching to saturated fills + white text (`$fontColor="#ffffff"`) in Mermaid. This creates a two-palette split with no visual benefit.

**Fix:** Use border color as text color in both Mermaid and Excalidraw:
- Service: `$bgColor="#96f2d7" $borderColor="#099268" $fontColor="#099268"`
- Data store: `$bgColor="#ffd8a8" $borderColor="#e8590c" $fontColor="#e8590c"`
- UI/frontend: `$bgColor="#a5d8ff" $borderColor="#1971c2" $fontColor="#1971c2"`
- Person: `$bgColor="#dbe4ff" $borderColor="#748ffc" $fontColor="#748ffc"`
- External: `$bgColor="#e9ecef" $borderColor="#868e96" $fontColor="#868e96"`
