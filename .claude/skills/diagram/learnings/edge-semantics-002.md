---
topic: edge-semantics
source: TrueStory session (2026-04-15)
---

Apply the four arrow styles from docs/system-design.md §4.2–4.3 and §9.3. Line style (solid/dashed) and arrowhead shape (filled triangle/open) are both meaningful and must not be mixed arbitrarily.

| Line | Head | Excalidraw | When to use |
|------|------|------------|-------------|
| Solid | Filled triangle | `solid` + `triangle` | Sync call: blocking request/response (REST, DB query, gRPC) |
| Solid | Open stick | `solid` + `arrow` | Async send: fire-and-forget to a queue, event bus, or pub/sub topic on the primary runtime path |
| Dashed | Filled triangle | `dashed` + `triangle` | Cron job, polling, build-time dependency, monitoring, or config relationship |
| Dashed | Open outlined | `dashed` + `triangle_outline` | Secondary async: path is BOTH non-primary/background AND fire-and-forget (e.g. async telemetry emit, background webhook callback, event-replay side-channel). Use gray #868e96 stroke. |

**Why:** Each combination encodes a distinct interaction model. Using the wrong one (e.g. solid+open for a cron job, or dashed+open for a sync call) tells readers the wrong story about how the system behaves at runtime.

**Decision test for dashed+triangle_outline:** Both conditions must hold — (1) the path is secondary, background, or non-primary runtime, AND (2) the call is fire-and-forget with no return expected. If only one condition holds, use the appropriate single-dimension style instead.

**Default rule:** When no tag is given, assume sync — use solid+filled. Only deviate when the description explicitly says "cron", "async", "depends on", "monitors", or "is configured by."

**Mermaid limitation:** C4Container has no native dashed-edge or arrowhead control. Annotate intent with a label suffix (`[cron]`, `[async]`, `[async, secondary]`). Apply full visual styles only in Excalidraw exports.
