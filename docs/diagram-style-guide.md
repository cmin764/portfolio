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

> **Shape note:** All active nodes use rounded rectangles. Role is identified by **color + type label together**, not shape alone. A reader should not expect cylinders for databases or ellipses for queues; the orange color and `<Database>` label carry that meaning instead.

---

## Node label format

```
Name                  (bold, larger)
<Type>                (optional, C4 abstraction level)
[Technology / stack]
Short responsibility  (planned) or (assumed) if applicable
```

**Bracket key:**

| Bracket | Meaning | Example |
|---------|---------|---------|
| `<Type>` | C4 abstraction level or role | `<Container>`, `<Database>`, `<Queue>` |
| `[Technology]` | Runtime tech stack or protocol | `[Flask + REST]`, `[PostgreSQL]` |
| `(status)` | Lifecycle qualifier | `(planned)`, `(assumed)` |

Never use the same bracket style for two different fields on the same node (e.g., `[Container]` for type is wrong; use `<Container>`).

---

## Arrow styles

| Line | Head | Meaning |
|------|------|---------|
| Solid | Filled triangle | Sync call, sender blocks waiting for return |
| Solid | Open stick | Async, fire-and-forget |
| Dashed | Filled triangle | Cron / polling / build-time dependency |
| Dashed | Open stick | Background async: telemetry, log shipping, secondary path |

**Direction rule: arrows point from initiator to dependency**, not in the direction data flows. If Service A calls Database B, the arrow goes A → B regardless of which way rows travel.

**Axis framing:** Line style is the **primary axis**: solid = on the primary runtime path, dashed = secondary or background. Arrowhead is the **secondary axis**: filled triangle = sender blocks, open stick = fire-and-forget. The four combinations encode four distinct interaction models; the legend on every diagram lists them explicitly.

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

Every diagram has a yellow legend box in a corner (`#fff9db` fill, solid, no border, sharp corners). It shows the arrow key, the direction rule, and the color-to-role mapping. If both boundary frame types appear, it also lists the frame vocabulary.

---

## Source files

| File | Purpose |
|------|---------|
| `src/diagrams/<id>.md` | Mermaid C4 source (committed, Cursor-previewable) |
| `public/diagrams/<id>.svg` | Exported SVG rendered in the portfolio |
| `docs/diagram-briefs.md` | Node/edge table and design constraints per project |
| `.claude/skills/diagram/references/color-palette.md` | Authoritative hex values |
| `.claude/skills/diagram/SKILL.md` | Generation skill (Claude Code) |
