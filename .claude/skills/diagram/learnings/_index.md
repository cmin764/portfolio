# Diagram Skill Learnings

Auto-maintained index. Each entry links to a learning file with context and rationale.

<!-- Entries are added automatically by the skill after user corrections. -->

- [layout-001 — Boundary is safe with plain Rel; only Boundary + directional Rel hints collapse layout](layout-001.md) — source: TrueStory, 2026-04-15; anchored by Traced AI, 2026-04-21
- [mermaid-syntax-001 — Never switch to flowchart LR; stay with C4Container](mermaid-syntax-001.md) — source: TrueStory, 2026-04-15
- [integration-001 — Excalidraw export needs bound text elements with containerId, not inline label](integration-001.md) — source: TrueStory, 2026-04-15
- [edge-semantics-direction — Initiator rule, no bidirectional arrows, pull=consumer→producer](edge-semantics-direction.md) — source: merged from TrueStory + Traced AI, 2026-04-21
- [edge-semantics-styles — Four arrow styles: solid+filled=sync, solid+open=async, dashed+filled=cron, dashed+outlined=rare secondary](edge-semantics-styles.md) — source: merged from TrueStory + Knowledge Base, 2026-04-21
- [node-semantics-001 — Passive stores (DB, cache, queue) cannot be the source of an initiating arrow](node-semantics-001.md) — source: Traced AI, 2026-04-16
- [styling-001 — Color by runtime role, not technology; caches and registries are orange data stores](styling-001.md) — source: Traced AI, 2026-04-16
- [styling-002 — Pastel fills + paired text (text=border color) for both Mermaid and Excalidraw; C4Container provides its own light canvas](styling-002.md) — source: Knowledge Base & Careers Agent, 2026-04-21; revised 2026-04-22
- [node-semantics-002 — Only annotate LLM external with "embeddings" when a vector store appears in the diagram](node-semantics-002.md) — source: Candidate Assessment, 2026-04-21
- [labeling-001 — `/` = req/resp split on edges; `|` = logical OR; never mix](labeling-001.md) — source: Sema4.ai Action Server, 2026-04-22
- [integration-002 — Always bind arrows with startBinding/endBinding + gap≥8 to attach at node borders, not centers](integration-002.md) — source: DeepIce, 2026-04-24
- [integration-003 — Strip [async]/[cron]/[async, secondary] meta-tags from Excalidraw labels; stroke+head encodes the meaning](integration-003.md) — source: consolidation, 2026-04-24
- [node-semantics-003 — Commodity managed hosting = ContainerDb; proprietary SaaS data product = System_Ext + orange](node-semantics-003.md) — source: VONQ Knowledge Base, 2026-04-27
- [mermaid-syntax-002 — Mermaid C4 drops all but the last Rel() between the same node pair; Excalidraw is authoritative for parallel edges](mermaid-syntax-002.md) — source: Pulsr, 2026-04-27
- [styling-003 — Boundary boxes must use strokeStyle dashed; solid is Excalidraw's default and makes boundaries indistinguishable from containers](styling-003.md) — source: Pulsr, 2026-04-27
