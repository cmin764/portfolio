---
topic: labeling
source: DeepIce update session (2026-04-28)
---

In Excalidraw node labels, three bracket types carry distinct semantic meaning. Use them consistently and never mix their roles.

| Symbol | Meaning | Example |
|--------|---------|---------|
| `<Type>` | C4 role / abstraction level | `<Container>`, `<Component>`, `<System>` |
| `[Technology]` | Tech stack annotation | `[Flask + REST]`, `[PostgreSQL]`, `[Python / FastAPI]` |
| `(status)` | Optional qualifier | `(planned)`, `(assumed)` |

**Node text structure (Excalidraw, 2–4 lines):**
```
Name
<Type>            ← optional; omit when the role is obvious from context or color
[Technology]
Short responsibility (status if applicable)
```

**Why:** Without distinct delimiters, a reader cannot tell at a glance whether a bracketed term is a role category or a technology. `<>` visually signals "what kind of thing this is"; `[]` signals "what it's built with"; `()` signals "a qualifier on the preceding term, not a standalone concept."

**Anti-pattern:** Using `[]` for both type and technology in the same node — `[Container]` and `[Flask]` are visually indistinguishable, so the reader cannot separate role from stack.

**Mermaid vs Excalidraw:** The Mermaid C4 primitives (`Container`, `Component`, etc.) encode the type in the function name itself, so `<>` is not needed there. The four-parameter form `Container(alias, "Name", "Tech", "Description")` already separates these tiers. The `<Type>` bracket convention applies to Excalidraw labels only.

**Scope of `(status)`:** Applies to the whole node when placed on the last line alone (`(planned)`), or to a specific attribute when placed inline (`"ships app logs (planned)"`). Never use it for technology annotations — that belongs in `[]`.
