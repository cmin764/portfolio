---
topic: styling
source: Pulsr session (2026-04-27); expanded 2026-04-28; convention review 2026-04-29
---

Boundary boxes use `"strokeStyle": "dashed"`. A solid-bordered frame at the same visual scope signals a different semantic: a single container opened up to show its internal components (a C4 component-level zoom-in). The two stroke styles create a visual vocabulary:

| Stroke | Meaning | C4 level |
|--------|---------|-----------|
| `"dashed"` | System/trust/deployment grouping boundary — contains multiple containers or systems | Container or Context |
| `"solid"` | Expanded container — one container zoomed in to reveal its internal components | Component |

**Why:** Without this distinction, a grouping boundary and a component-level expansion look identical. Dashed = "these things belong together in a zone." Solid = "I am looking inside this one thing."

**Anti-pattern:** Using dashed stroke on a "FastAPI App [Container]" frame that wraps Router/ServiceLayer/ORM components. That frame is a zoom-in, not a trust boundary — it should be solid.

**Fix:**
- Every C4 `Boundary()` primitive → `"strokeStyle": "dashed"`
- Every "expanded container" frame showing internal components → `"strokeStyle": "solid"`, same bronze fill (`#f8f1ee` outer, `#eaddd7` inner/nested)
- Regular container nodes → `"strokeStyle": "solid"` (already the default)

**Legend requirement:** whenever a solid expansion frame appears on a diagram alongside dashed grouping boundaries, the legend must include a vocabulary block:
```
╌╌╌ GROUPING BOUNDARY (dashed)
─── ZOOM-IN / EXPANDED CONTAINER (solid)
```
Without this, a reader cannot distinguish the two bronze frame types at a glance.
