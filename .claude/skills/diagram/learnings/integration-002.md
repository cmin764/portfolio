---
topic: integration
source: DeepIce session (2026-04-24)
---

Every Excalidraw arrow must include `startBinding` and `endBinding` with a non-zero `gap` (minimum 8px). Without bindings, Excalidraw routes all arrows through the geometric center of each node, causing arrow lines to overlap the text inside boxes and making the diagram unreadable.

**Why:** Excalidraw's default for unbound arrows is center-to-center routing. A gap value > 0 moves the attachment point to the node's border. This is a rendering concern, not a semantic one, but it affects legibility on every diagram with more than a handful of edges.

**Anti-pattern:** Omitting `startBinding`/`endBinding` entirely, or setting `gap: 0`. Both produce center-routed lines that pierce through node text.

**Fix:** Always include on every arrow element:
```json
"startBinding": { "elementId": "<source-id>", "focus": 0, "gap": 8 },
"endBinding":   { "elementId": "<target-id>", "focus": 0, "gap": 8 }
```
For two parallel edges between the same node pair, offset them with `focus: -0.3` and `focus: 0.3` respectively so the lines separate and don't overlap each other.

For fan-out from a single hub node to multiple different targets (e.g. an orchestrator routing to 3+ services), spread the `startBinding.focus` values across the hub's edge so arrows don't cluster at one exit point. Example for 3 outgoing arrows: `focus: -0.4`, `focus: 0`, `focus: 0.4`. Add a fourth at `focus: 0.5` (or adjust the spread) as needed.
