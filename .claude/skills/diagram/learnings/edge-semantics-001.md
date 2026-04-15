---
topic: edge-semantics
source: TrueStory session (2026-04-15)
---

Arrow direction represents dependency, not data travel. For pull-based relationships (cron jobs, polling, scheduled fetches), draw the arrow FROM the service doing the pulling TO the thing being pulled from.

**Why:** C4 convention is "arrows show who depends on whom." A service that crawls or polls another depends on it — so the arrow points service→dependency. Drawing it as data-flow (source→sink) implies the dependency pushes data, which misrepresents the system's control flow and can mislead readers about who initiates the interaction.

**Anti-pattern:** Modeling a cron crawl or polling relationship with an arrow pointing FROM the external source TO the internal service, as if the source is pushing.

**Fix:** Always ask "who initiates?" and draw the arrow from initiator to target. For a scheduled crawl: `Rel(crawlerService, externalSource, "fetches on schedule [cron]")`. Label the edge with the mechanism (`[cron]`, `[polls every N min]`) so the non-interactive nature is clear without reversing the direction.
