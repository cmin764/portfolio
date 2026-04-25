---
topic: edge-semantics
source: TrueStory + Knowledge Base session (2026-04-21); Excalidraw arrowhead key anchored by Traced AI export
---

Exactly four arrow combinations encode distinct interaction models. Line style (solid/dashed) × arrowhead (filled triangle vs. open stick) is the complete encoding. No color variation on arrows — all use `#1e1e1e`. `triangle_outline` is never used.

| Line | Head | Excalidraw JSON | Mermaid label | When to use |
|------|------|-----------------|---------------|-------------|
| Solid | Filled triangle | `"solid"` + `"triangle"` | _(none)_ | Sync: sender blocks waiting for return (REST, DB query, gRPC) |
| Solid | Open stick | `"solid"` + `"arrow"` | `[async]` | Async primary: fire-and-forget to queue, event bus, or pub/sub |
| Dashed | Filled triangle | `"dashed"` + `"triangle"` | `[cron]` | Cron job, polling, scheduled fetch, build-time dependency |
| Dashed | Open stick | `"dashed"` + `"arrow"` | `[async, secondary]` | Secondary/background async: use ONLY when BOTH conditions hold: (1) not on main request path, AND (2) fire-and-forget. Canonical: error reporting (Sentry), log shipping (ELK), telemetry/metrics push. If the primary user action still succeeds when this call fails, it qualifies. |

**Arrowhead key — two values only:**
- `"triangle"` — closed filled triangle — sync
- `"arrow"` — open stick — async
- `"triangle_outline"` — NEVER USE

**Default rule:** No tag given → assume sync, solid + filled triangle.

**Mermaid limitation:** C4Container has no native dashed-edge or arrowhead control. Annotate intent with label suffixes (`[async]`, `[cron]`). Apply full visual styles only in Excalidraw exports.
