---
topic: edge-semantics
source: TrueStory session (2026-04-15)
---

Combine request-response pairs into a single edge label rather than drawing two reverse arrows. For pull/cron relationships, draw the arrow FROM the initiator (the service doing the pulling) TO the dependency.

**Before:** Separate `Rel_R(ext, api, "article URL")` + `Rel_L(api, ext, "3 opposing articles")` → crossing lines, overlapping labels. Also `Rel_D(news, api, "crawled articles")` with arrow going FROM news TO api, implying news pushes data.

**After:** Single `Rel(ext, api, "article URL / 3 opposing articles")` combining both directions. Reversed to `Rel(api, news, "crawls on cron [async]")` since the API initiates the crawl.

**Why:** Mermaid C4's layout engine routes reverse arrows along the same path as forward arrows — they physically overlap. One combined label eliminates this entirely without losing semantic clarity. For pull-based relationships (cron jobs, polling), C4 convention is arrows from initiator to dependency; the arrow shows who depends on whom, not where data travels.
