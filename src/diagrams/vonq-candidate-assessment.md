# Candidate Assessment & Language Evaluator — Container Diagram (2025–2026)

<!-- Abstraction level: Container (C4)
     Four boundaries force a LR column layout: input | pipeline | lang-eval | review.
     Plain Rel() only throughout — no directional hints (layout-001).
     Two separate agent↔scorer arrows are intentional: emphasise the additive feature split.
-->

```mermaid
C4Container
  title Container Diagram for Candidate Assessment & Language Evaluator

  Boundary(inputSide, "Candidate Input", "external") {
    Person(candidate, "Candidate", "Provides text or audio input")
    System_Ext(retell, "Retell", "Audio web interview — auto-retry on drop")
    Container(chat, "Chat Interface", "React", "Text-based screening")
  }

  Boundary(pipeline, "Assessment Pipeline", "internal") {
    Container(agent, "Assessment Agent", "Python, Django", "Multi-criteria evaluation orchestrator")
    System_Ext(openai, "OpenAI API", "LLM prompting + embeddings")
    ContainerDb(profile, "Candidate Profile DB", "Postgres", "Scores, transcripts, stage")
  }

  Boundary(langEval, "Language Evaluator (MVP add-on)", "feature") {
    Container(scorer, "Language Scorer", "Python", "Vocabulary, fluency, semantics, coherence")
  }

  Boundary(reviewSide, "Recruiter Review", "internal") {
    Person(recruiter, "Recruiter", "Reviews profile, approves/rejects")
    Container(ats, "VONQ EQO", "React", "Candidate journey platform — review queue + stage management")
    System_Ext(pdfService, "PDF Renderer", "HTML template + data → PDF")
    Container(pdf, "PDF Dossier", "Generated file", "Shareable snapshot of candidate profile")
  }

  Rel(candidate, chat, "text answers")
  Rel(candidate, retell, "audio interview")
  Rel(chat, agent, "text transcript")
  Rel(retell, agent, "audio transcript [async]", "webhook")
  Rel(agent, openai, "prompts + completions")
  Rel(agent, scorer, "sends transcript")
  Rel(scorer, agent, "language scores")
  Rel(scorer, openai, "prompts + completions")
  Rel(agent, profile, "writes scores + transcripts")
  Rel(agent, ats, "stage update + queues for review [async]")
  Rel(recruiter, ats, "reviews, approves/rejects")
  Rel(ats, profile, "reads profile")
  Rel(ats, pdfService, "render PDF")
  Rel(pdfService, pdf, "produces PDF")
  Rel(recruiter, pdf, "downloads / shares")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="4")

  UpdateElementStyle(candidate, $fontColor="#1e1e1e", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(recruiter, $fontColor="#1e1e1e", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(chat, $fontColor="#1e1e1e", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(ats, $fontColor="#1e1e1e", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(agent, $fontColor="#1e1e1e", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(scorer, $fontColor="#1e1e1e", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(profile, $fontColor="#1e1e1e", $bgColor="#ffd8a8", $borderColor="#e8590c")
  UpdateElementStyle(pdf, $fontColor="#1e1e1e", $bgColor="#fef9c3", $borderColor="#ca8a04")
```
