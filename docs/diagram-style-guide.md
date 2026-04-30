# Diagram Style Guide

Quick reference for reading and authoring the C4 architecture diagrams on this portfolio.
Every diagram follows these conventions consistently.

---

## Node colors

| Color | Role |
|-------|------|
| Light blue | UI / Frontend / Web app |
| Light teal | Service / API / Worker |
| Light orange | Database / Cache / Store / Index |
| **Light red** | **Queue / Stream / Topic / Pub-sub** |
| Light gray | External system / SaaS (not owned) |
| Light indigo | Person / User |
| **Light amber + sharp corners** | **Generated artifact / file (passive output)** |

Border and text are always the same darker shade as the fill. Active runtime elements use rounded corners. Artifacts use sharp corners; that contrast signals "passive output, not a live actor."

---

## Node label format

```
Name                  (bold, larger)
<Type>                (optional, C4 abstraction level)
[Technology / stack]
Short responsibility  (planned) or (assumed) if applicable
```

---

## Arrow styles

| Line | Head | Meaning |
|------|------|---------|
| Solid | Filled triangle | Sync call, sender blocks waiting for return |
| Solid | Open stick | Async, fire-and-forget |
| Dashed | Filled triangle | Cron / polling / build-time dependency |
| Dashed | Open stick | Background async: telemetry, log shipping, secondary path |

**Direction rule: arrows point from initiator to dependency**, not in the direction data flows. If Service A calls Database B, the arrow goes A → B regardless of which way rows travel.

Labels use `verb + object` format ("creates order", "publishes event"). Protocol notes ("via REST") go in the technology field, not the label.

---

## Boundary frames

| Stroke | Meaning |
|--------|---------|
| Dashed bronze frame | Grouping / trust / deployment boundary: contains multiple containers |
| Solid bronze frame | Zoom-in / expansion frame: one container opened to show its internals |

Boundary title text is always the same bronze color, never role-colored.

---

## Legend box

Every diagram has a yellow hatched legend box in a corner. It shows the arrow key, the direction rule, and the color-to-role mapping. If both boundary frame types appear, it also lists the frame vocabulary.

---

## Source files

| File | Purpose |
|------|---------|
| `src/diagrams/<id>.md` | Mermaid C4 source (committed, Cursor-previewable) |
| `public/diagrams/<id>.svg` | Exported SVG rendered in the portfolio |
| `docs/diagram-briefs.md` | Node/edge table and design constraints per project |
| `.claude/skills/diagram/references/color-palette.md` | Authoritative hex values |
| `.claude/skills/diagram/SKILL.md` | Generation skill (Claude Code) |
