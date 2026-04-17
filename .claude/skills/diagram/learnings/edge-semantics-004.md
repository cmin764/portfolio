---
topic: edge-semantics
source: Traced AI session (2026-04-16)
---

For pull-based relationships, draw the arrow from the consumer (the node that initiates the fetch) to the producer (the node that holds the data), not the other way around. The arrow direction always represents who initiates, regardless of which direction the data travels.

**Why:** A pull means the consumer decides when to fetch. Drawing the arrow from producer to consumer implies a push, which encodes a different runtime behavior (the producer deciding when to send). Getting this wrong misrepresents the coupling direction: a push consumer depends on the producer's schedule; a pull consumer is in control of its own schedule.

**Anti-pattern:** Drawing `DataStore → ServiceA` with label "periodic data sync" when ServiceA is the one polling DataStore on a schedule.

**Fix:** Draw `ServiceA → DataStore` with label "polls / pulls [async]". The data flows back, but the arrow shows who owns the interaction.
