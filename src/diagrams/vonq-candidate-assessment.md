# Candidate Assessment & Language Evaluator — Container Diagram (2025–2026)

<!-- Abstraction level: Container (C4)
     LR pipeline: candidate inputs → assessment → recruiter review → PDF output.
     scorer is wrapped in a Boundary to visually separate the Language Evaluator MVP add-on.
     Plain Rel() only — no directional hints, so the Boundary renders cleanly (layout-001).
     Two separate agent↔scorer arrows are intentional: they emphasize the additive feature split.
-->

```mermaid
C4Container
  title Container Diagram for Candidate Assessment & Language Evaluator

  Person(candidate, "Candidate", "Provides text or audio input")
  Person(recruiter, "Recruiter", "Reviews profile, approves/rejects")

  System_Ext(retell, "Retell", "Audio web interview — auto-retry on drop")
  System_Ext(openai, "OpenAI API", "LLM prompting + embeddings")
  System_Ext(ats, "ATS System", "Candidate stage tracking")
  System_Ext(pdfService, "PDF Renderer", "HTML template + data → PDF")

  Container(chat, "Chat Interface", "React", "Text-based screening")
  Container(agent, "Assessment Agent", "Python, Django", "Multi-criteria evaluation orchestrator")
  Container(recruiterUi, "Recruiter UI", "React", "Human review queue")

  Boundary(langEval, "Language Evaluator (MVP add-on)", "feature") {
    Container(scorer, "Language Scorer", "Python", "Vocabulary, fluency, semantics, coherence")
  }

  ContainerDb(profile, "Candidate Profile DB", "Postgres", "Scores, transcripts, stage")
  ContainerDb(pdf, "PDF Dossier", "Generated file", "Shareable snapshot of candidate profile")

  Rel(candidate, chat, "text answers")
  Rel(candidate, retell, "audio interview")
  Rel(chat, agent, "text transcript")
  Rel(retell, agent, "audio transcript [async]", "webhook")
  Rel(agent, openai, "prompts + completions")
  Rel(agent, scorer, "sends transcript")
  Rel(scorer, agent, "language scores")
  Rel(scorer, openai, "prompts + completions")
  Rel(agent, profile, "writes scores + transcripts")
  Rel(agent, ats, "stage update [async]")
  Rel(agent, recruiterUi, "queues for review [async]")
  Rel(recruiter, recruiterUi, "reviews, approves/rejects")
  Rel(recruiterUi, profile, "reads profile")
  Rel(recruiterUi, pdfService, "render PDF")
  Rel(pdfService, pdf, "produces PDF")
  Rel(recruiter, pdf, "downloads / shares")

  UpdateLayoutConfig($c4ShapeInRow="5", $c4BoundaryInRow="1")

  UpdateElementStyle(candidate, $fontColor="#1e1e1e", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(recruiter, $fontColor="#1e1e1e", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(chat, $fontColor="#1e1e1e", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(recruiterUi, $fontColor="#1e1e1e", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(agent, $fontColor="#1e1e1e", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(scorer, $fontColor="#1e1e1e", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(profile, $fontColor="#1e1e1e", $bgColor="#ffd8a8", $borderColor="#e8590c")
  UpdateElementStyle(pdf, $fontColor="#1e1e1e", $bgColor="#ffd8a8", $borderColor="#e8590c")
```
