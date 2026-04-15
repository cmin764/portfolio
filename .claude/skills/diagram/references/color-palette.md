# Color Palette and Style Mappings

Derived from `docs/system-design.md` section 9.2. Use these consistently across all diagrams.

---

## Node colors by role

| Role | Background | Border | Text | Mermaid C4 default |
|------|-----------|--------|------|--------------------|
| Person | transparent | #08427B | #08427B | Built-in (blue outline) |
| UI / Frontend / Web App | #438DD5 | #3C7FC0 | #FFFFFF | — |
| Service / API / Worker | #00897B | #006B5E | #FFFFFF | — |
| Database / Data Store | #FF6D00 | #CC5700 | #FFFFFF | — |
| Queue / Stream | #FF6D00 | #CC5700 | #FFFFFF | Same as data stores |
| External System / SaaS | #999999 | #6B6B6B | #FFFFFF | Built-in (gray) |
| Boundary box | transparent | #444444 | #444444 | Built-in (dashed) |

Limit to these 4-5 fill colors. More than that reduces clarity.

---

## Edge styles

| Condition | Line style | Arrowhead | Color |
|-----------|-----------|-----------|-------|
| Sync call (default) | Solid | Filled triangle | #666666 |
| Async / event / webhook | Dashed | Open arrow | #666666 |
| Build-time / config / monitoring | Dashed | Filled triangle | #999999 |
| CI-only or dev-only path | Dashed | Filled triangle | #AAAAAA |

Default to sync/solid when the brief does not specify.

---

## Edge label format

Normalize to `verb + object`:
- "creates order", "reads profile", "publishes OrderCreated"
- "queries by URL", "crawled articles", "hash(in) + hash(out)"

Strip noise: "via REST API" goes in the technology annotation field, not the label.

---

## Dark mode compatibility

The portfolio uses `dark:invert` on the `<img>` tag for diagram SVGs. This means:
- White backgrounds become black (good)
- The palette above inverts reasonably: blues stay recognizable, greens shift, oranges shift
- **Avoid pure black** (#000000) fills: they become pure white and look broken when inverted
- **Avoid very light fills**: they become very dark and swallow text
- The mid-range fills in the table above all survive inversion acceptably

If a specific color inverts poorly, note it in `learnings/` for future reference.

---

## Mermaid C4 styling commands

To override Mermaid's built-in C4 colors and apply this palette:

```
UpdateElementStyle(alias, $fontColor="#FFFFFF", $bgColor="#00897B", $borderColor="#006B5E")
```

Apply only when the default Mermaid C4 colors diverge from this palette. The built-in Person and System_Ext styles are usually fine as-is.
