---
topic: mermaid-syntax
source: TrueStory session (2026-04-15)
---

Never switch from `C4Container` to `flowchart LR` (or any other flowchart type) to work around layout or styling limitations. It makes both problems worse.

**Why:** Two compounding failures: (1) `<br/>` renders as literal text in flowchart nodes — labels become unreadable strings. (2) `LR` places every node on one horizontal row with no row-break mechanism, producing an unusably wide single-line diagram. `C4Container` with `UpdateLayoutConfig` and `UpdateElementStyle` is always the better path, even when it feels more constrained.

**Anti-pattern:** Switching diagram type when facing frustrating Mermaid C4 layout or color issues.

**Fix:** Stay with `C4Container`. For layout: `UpdateLayoutConfig($c4ShapeInRow="N")`. For colors: `UpdateElementStyle(alias, $bgColor=..., $fontColor=..., $borderColor=...)`. For styles Mermaid cannot express (dashed edges, open arrowheads): note the intent with a label suffix (`[cron]`, `[async]`) in the Mermaid source and apply proper styles only in the Excalidraw export.
