# Color Palette and Style Mappings

Derived from `docs/system-design.md` section 9.2 and the reference Excalidraw export (traced-ai.svg).
Hex codes are the authoritative values — use these for all Excalidraw exports and Mermaid overrides.

---

## Node colors by role

| Role | Fill (bg) | Stroke | Text | Notes |
|------|-----------|--------|------|-------|
| UI / Frontend / Web App | #a5d8ff | #1971c2 | #1e1e1e | Light blue bg, dark blue border |
| Service / API / Worker | #96f2d7 | #099268 | #1e1e1e | Light mint bg, dark teal border |
| Database / Data Store / Cache | #ffd8a8 | #e8590c | #1e1e1e | Light peach bg, dark orange border |
| Queue / Stream | #ffd8a8 | #e8590c | #1e1e1e | Same as data stores |
| External System / SaaS | #e9ecef | #868e96 | #1e1e1e | Near-white bg, gray border |
| Person | transparent | #1971c2 | #1971c2 | Built-in Excalidraw person style |

Limit to these 4-5 fill colors. More than that reduces clarity.

**Color by runtime role, not technology.** Ask: "does this node execute business logic and respond to requests, or does it passively hold data?" If the latter, use the data store palette (peach/orange) — even if it is Redis, Memcached, S3, or any product with "service" in its name. Caches, registries, indexes, and key-value stores that hold reference data are data stores. Only use teal if the node has its own endpoints and executes logic.

---

## Boundary / grouping boxes

All boundary boxes use a **single neutral bronze tint**, regardless of what they contain. Role distinction comes from the boundary title color only, not the fill.

| Element | Fill | Stroke | Title text |
|---------|------|--------|------------|
| Boundary box (all) | #eaddd7 | #846358 | Role-colored (see node palette above) or #1e1e1e for neutral |

Never use role-specific fills (blue, teal) for boundary boxes. A bronze-tinted Client Perimeter with a blue title and a bronze-tinted Cloud boundary with a teal title is sufficient and avoids ambiguity about whether the boundary color means something semantic.

---

## Arrow colors

| Condition | Stroke | Notes |
|-----------|--------|-------|
| Default (all edges) | #1e1e1e | Near-black; use for all arrows unless a special case below applies |
| Outbound cross-boundary | #e03131 | Red; only when boundary crossing is the main story of the diagram |
| Inbound cross-boundary | #1971c2 | Blue; paired with red outbound |
| Secondary / muted flow | #868e96 | Gray; for monitoring, config, or CI-only paths |

Color on arrows is only permitted when:
1. The color is documented in the diagram's legend box, and
2. The color encodes a single, specific semantic that cannot be expressed with line style or arrowhead alone.

Never color arrows to match source or destination node colors.

---

## Edge styles

| Condition | Line | Arrowhead | Excalidraw JSON | Mermaid label suffix | Color |
|-----------|------|-----------|-----------------|----------------------|-------|
| Sync call (default) | Solid | Filled triangle | `strokeStyle:"solid"`, `endArrowhead:"triangle"` | _(none)_ | #1e1e1e |
| Async / fire-and-forget | Solid | Open stick | `strokeStyle:"solid"`, `endArrowhead:"arrow"` | `[async]` | #1e1e1e |
| Cron / polling / dependency | Dashed | Filled triangle | `strokeStyle:"dashed"`, `endArrowhead:"triangle"` | `[cron]` | #1e1e1e |
| Secondary async (background, non-primary) | Dashed | Open outlined | `strokeStyle:"dashed"`, `endArrowhead:"triangle_outline"` | `[async, secondary]` | #868e96 |
| Cross-boundary outbound | Solid | Filled triangle | `strokeStyle:"solid"`, `endArrowhead:"triangle"` | _(none)_ | #e03131 |
| Cross-boundary inbound | Solid | Open stick | `strokeStyle:"solid"`, `endArrowhead:"arrow"` | _(none)_ | #1971c2 |

**Excalidraw arrowhead key** (UML 2.5 §17.4.4.1):
- `"triangle"` = closed filled triangle = synchronous (sender blocks waiting for return)
- `"arrow"` = open stick = asynchronous primary runtime (sender continues immediately, no return on this channel)
- `"triangle_outline"` = outlined open triangle = secondary async only: the path is BOTH non-primary/background (hence dashed line) AND fire-and-forget (hence open head). Rare. Use for background telemetry, async webhook callbacks, or event-replay side-channels — flows that are neither blocking nor part of the main runtime path. Never use for primary async calls; `"arrow"` is correct there.

**Decision tree:**
1. Does the sender block waiting for a return? → solid + `"triangle"`
2. Is it fire-and-forget on the primary runtime path? → solid + `"arrow"`
3. Is it a scheduled/cron trigger or build-time dependency? → dashed + `"triangle"`
4. Is it both secondary/background AND fire-and-forget? → dashed + `"triangle_outline"` (rare; use gray #868e96)

**Mermaid limitation:** C4Container has no native arrowhead or dash control. Use label suffixes (`[async]`, `[cron]`) to document the intent. Apply full visual styles only in Excalidraw exports.

Default to sync/solid when the brief does not specify.

---

## Edge label format

Normalize to `verb + object`:
- "creates order", "reads profile", "publishes OrderCreated"
- "queries by URL", "crawled articles", "hash(in) + hash(out)"

Strip noise: "via REST API" goes in the technology annotation field, not the label.

---

## Legend and annotation boxes

| Element | Fill | Stroke | Text |
|---------|------|--------|------|
| Legend box (arrow key, notes) | #ffec99 | none (borderless) | #1e1e1e |
| Warning / callout box | #ffc9c9 | #e03131 | #1e1e1e |

Legend box style: light yellow post-it (#ffec99), **no border** (`strokeColor: "transparent"` or stroke width 0), rounded corners, **cross-hatch fill** (`fillStyle: "cross-hatch"`), black text. The cross-hatch texture on a borderless yellow box gives it the hand-drawn post-it aesthetic and distinguishes it immediately from diagram nodes (which use solid fills with borders). Use bold or colored text sparingly inside the legend when emphasizing a specific semantic (e.g., the red/blue cross-boundary annotation).

---

## Dark mode compatibility

The portfolio uses `dark:invert` on the `<img>` tag for diagram SVGs. This means:
- White/light backgrounds invert to dark — the light fills above (peach, mint, light blue) survive reasonably
- **Avoid pure black** (#000000) fills: they become pure white when inverted
- **Avoid very light fills below ~#e0e0e0**: they become very dark and swallow text
- The bronze boundary tint (#eaddd7) inverts to a dark brown — acceptable as a boundary
- The post-it yellow (#ffec99) inverts to a dark purple-blue — acceptable for legend boxes

---

## Mermaid C4 styling commands

Mermaid renders on a dark canvas in most editors (VS Code, Cursor). Use **saturated fills with white text** — pastels wash out on dark backgrounds (see `learnings/styling-002.md`). Pastel fills are only for Excalidraw exports.

```
UpdateElementStyle(alias, $fontColor="#ffffff", $bgColor="#00897B", $borderColor="#006B5E")  // service
UpdateElementStyle(alias, $fontColor="#ffffff", $bgColor="#E65100", $borderColor="#CC5700")  // data store
UpdateElementStyle(alias, $fontColor="#ffffff", $bgColor="#438DD5", $borderColor="#3C7FC0")  // UI
UpdateElementStyle(alias, $fontColor="#1e1e1e", $bgColor="#e9ecef", $borderColor="#868e96")  // external (no white needed, stays light)
```

Apply only when the default Mermaid C4 colors diverge from this palette. The built-in Person style is usually fine as-is.

**Excalidraw node fills** use the pastel palette from the "Node colors by role" table above (light bg + dark text). Never use saturated fills in Excalidraw — they work on dark Mermaid canvas but are too heavy on Excalidraw's light canvas.
