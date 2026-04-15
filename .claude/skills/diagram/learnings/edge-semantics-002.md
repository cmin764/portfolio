---
topic: edge-semantics
source: TrueStory session (2026-04-15)
---

Apply the four arrow styles from docs/system-design.md §4.2–4.3 and §9.3. Line style (solid/dashed) and arrowhead shape (filled triangle/open) are both meaningful and must not be mixed arbitrarily.

| Line | Head | When to use |
|------|------|-------------|
| Solid | Filled triangle | Sync call: blocking request/response (REST, DB query, gRPC) |
| Solid | Open/stick | Async send: fire-and-forget to a queue, event bus, or pub/sub topic |
| Dashed | Filled triangle | Cron job, polling, build-time dependency, monitoring, or config relationship |
| Dashed | Open/stick | Rarely used: async reply or secondary non-runtime flow |

**Why:** Each combination encodes a distinct interaction model. Using the wrong one (e.g. solid+open for a cron job, or dashed+open for a sync call) tells readers the wrong story about how the system behaves at runtime.

**Default rule:** When no tag is given, assume sync — use solid+filled. Only deviate when the description explicitly says "cron", "async", "depends on", "monitors", or "is configured by."

**Mermaid limitation:** C4Container has no native dashed-edge or arrowhead control. In `.md` source files, annotate the intent with a label suffix (`[cron]`, `[async]`). Apply the full visual styles only in Excalidraw exports via `strokeStyle: "dashed"` and `endArrowhead: "triangle"`.
