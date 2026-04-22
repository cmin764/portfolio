---
topic: node-semantics
source: vonq-candidate-assessment session (2026-04-21)
---

Only annotate an external LLM node with "embeddings" if the diagram contains a vector store that receives and serves those embeddings. Without a store node, there is no persistent embedding flow to show — the label is misleading.

**Why:** "LLM + embeddings" implies the caller is both prompting and storing/retrieving vectors. If no vector index appears in the diagram, the embedding capability is either unused or transient (one-shot similarity, no persistence). A misleading description invites questions about where the embeddings go.

**Anti-pattern:** Labeling an external LLM system "LLM prompting + embeddings" in a diagram that has no `ContainerDb` / vector store node wired to it.

**Fix:** Use "LLM prompting" when the diagram only shows prompt/completion calls. Reserve "embeddings" for diagrams that include a vector index (e.g., Pinecone, pgvector) and at least one edge writing vectors to it and one reading from it.
