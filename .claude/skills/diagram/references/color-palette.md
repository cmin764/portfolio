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

| Condition | Line | Arrowhead | Color |
|-----------|------|-----------|-------|
| Sync call (default) | Solid | Filled triangle | #1e1e1e |
| Async / fire-and-forget | Solid | Open arrow | #1e1e1e |
| Cron / polling / dependency | Dashed | Filled triangle | #1e1e1e |
| Cross-boundary outbound | Solid | Filled triangle | #e03131 |
| Cross-boundary inbound | Solid | Open arrow | #1971c2 |

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
| Legend box (arrow key, notes) | #ffec99 | #1e1e1e | #1e1e1e |
| Warning / callout box | #ffc9c9 | #e03131 | #1e1e1e |

Legend box style: light yellow post-it (#ffec99), black border, black text. Use bold or colored text sparingly inside the legend when emphasizing a specific semantic (e.g., the red/blue cross-boundary annotation).

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

To override Mermaid's built-in C4 colors and apply this palette (use dark versions for Mermaid since it renders on white and needs contrast):

```
UpdateElementStyle(alias, $fontColor="#1e1e1e", $bgColor="#96f2d7", $borderColor="#099268")  // service
UpdateElementStyle(alias, $fontColor="#1e1e1e", $bgColor="#ffd8a8", $borderColor="#e8590c")  // data store
UpdateElementStyle(alias, $fontColor="#1e1e1e", $bgColor="#a5d8ff", $borderColor="#1971c2")  // UI
UpdateElementStyle(alias, $fontColor="#1e1e1e", $bgColor="#e9ecef", $borderColor="#868e96")  // external
```

Apply only when the default Mermaid C4 colors diverge from this palette. The built-in Person style is usually fine as-is.
