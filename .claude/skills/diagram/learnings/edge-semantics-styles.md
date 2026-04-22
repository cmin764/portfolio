---
topic: edge-semantics
source: TrueStory + Knowledge Base session (2026-04-21); Excalidraw arrowhead key anchored by Traced AI export
---

Four arrow styles encode distinct interaction models. Line style (solid/dashed) and arrowhead shape (filled/open) are both meaningful and must not be mixed arbitrarily.

| Line | Head | Excalidraw JSON | Mermaid label | When to use |
|------|------|-----------------|---------------|-------------|
| Solid | Filled triangle | `"solid"` + `"triangle"` | _(none)_ | Sync: sender blocks waiting for return (REST, DB query, gRPC) |
| Solid | Open stick | `"solid"` + `"arrow"` | `[async]` | Async primary: fire-and-forget to queue, event bus, or pub/sub |
| Dashed | Filled triangle | `"dashed"` + `"triangle"` | `[cron]` | Cron job, polling, scheduled fetch, build-time dependency |
| Dashed | Open outlined | `"dashed"` + `"triangle_outline"` | `[async, secondary]` | Secondary async: BOTH non-primary/background AND fire-and-forget (e.g. telemetry, async webhook callback). Use gray `#868e96`. Rare. |

**Excalidraw arrowhead key (UML 2.5 §17.4.4.1):**
- `"triangle"` — closed filled triangle — sync (sender blocks waiting for return)
- `"arrow"` — open stick — async primary (sender continues immediately, no return on this channel)
- `"triangle_outline"` — outlined large triangle — secondary async only; never use for primary async

**Decision tree:**
1. Does the sender block waiting for a return? → solid + `"triangle"`
2. Fire-and-forget on the primary runtime path? → solid + `"arrow"`
3. Scheduled/cron trigger or build-time dependency? → dashed + `"triangle"`
4. Both secondary/background AND fire-and-forget? → dashed + `"triangle_outline"` (gray; rare)

**Default rule:** When no tag is given, assume sync — solid + filled triangle. Only deviate when the description explicitly says "cron", "async", "depends on", or "monitors."

**Mermaid limitation:** C4Container has no native dashed-edge or arrowhead control. Annotate intent with label suffixes (`[async]`, `[cron]`). Apply full visual styles only in Excalidraw exports.
