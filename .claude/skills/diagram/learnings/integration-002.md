---
topic: integration
source: DeepIce session (2026-04-24)
---

Every Excalidraw arrow must include `startBinding` and `endBinding` with `gap ≥ 8` so arrows run **border-to-border**: the tail leaves the source node's border and the head arrives at the target node's border. Without bindings (or with `gap: 0`), Excalidraw routes every arrow center-to-center — lines pass straight through the interior of both nodes, covering all text inside.

**Why:** Excalidraw's default for unbound arrows is center-to-center routing. A `gap > 0` on both bindings moves the attachment points to the node borders, keeping all arrow lines in the whitespace between boxes. This is a rendering concern, not a semantic one, but it determines whether the diagram is readable at all.

**Anti-pattern:** Omitting `startBinding`/`endBinding` entirely, or setting `gap: 0`. Both produce center-routed lines that pierce straight through node interiors and obscure all label text.

**Fix:** Always include on every arrow element:
```json
"startBinding": { "elementId": "<source-id>", "focus": 0, "gap": 8 },
"endBinding":   { "elementId": "<target-id>", "focus": 0, "gap": 8 }
```
For two parallel edges between the same node pair, offset them with `focus: -0.3` and `focus: 0.3` respectively so the lines separate and don't overlap each other.

For fan-out from a single hub node to multiple different targets (e.g. an orchestrator routing to 3+ services), spread the `startBinding.focus` values across the hub's edge so arrows don't cluster at one exit point. Example for 3 outgoing arrows: `focus: -0.4`, `focus: 0`, `focus: 0.4`. Add a fourth at `focus: 0.5` (or adjust the spread) as needed.
