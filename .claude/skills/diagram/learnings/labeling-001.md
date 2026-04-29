---
topic: labeling
source: Sema4.ai Action Server session (2026-04-22)
---

Two punctuation symbols carry distinct semantic meaning on edge labels. Use them consistently.

| Symbol | Meaning | Example |
|--------|---------|---------|
| `/` | Request / response split: left side is what the caller sends, right side is what it gets back | `prompt + tool schema / tool-call response` |
| `\|` | Logical OR: either alternative is valid | `@action \| @tool` |

**Why:** Without this distinction, `/` reads ambiguously as "or" in English prose but visually implies a two-leg exchange on a diagram. Reserving `/` for req/resp and `|` for or makes the directionality of data explicit in the edge label itself.

**Anti-pattern:** Using `/` for both "or" alternatives and req/resp splits — the reader cannot tell whether the label describes two options or two directions. Concrete mistake: `triggers on push / cron` when you mean "either a push event or a cron schedule" — that is `|`, not `/`. `push / cron` implies push sends something and cron returns something, which is nonsensical.

**Mermaid vs Excalidraw:** The fuller, more explicit form belongs in the Mermaid source. Excalidraw labels may be shortened for space, but must not contradict the symbol semantics.
