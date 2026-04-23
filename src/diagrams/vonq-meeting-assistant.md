# Meeting Assistant — Container Diagram (2025-2026)

Real-time pipeline where Recall.ai joins Google Meet as a third participant, streams
transcripts into Django, OpenAI reasons turn-by-turn, and two outputs branch:
a private insight to the recruiter's VONQ UI, and an optional spoken reply injected
back into the call via ElevenLabs and Recall's Listened Page.

Design notes that Mermaid C4 cannot fully render (preserved for the Excalidraw pass):
- The private hint path (Analysis Engine → VONQ Interviewer UI) is invisible to the
  candidate. In Excalidraw, wrap that edge in a dashed "not visible to candidate"
  boundary (bronze tint #eaddd7 / #846358).
- The bot IS visible to everyone in the call (it shows up as a third participant in
  the Google Meet roster). Only the hints are private.
- Arrow styles for Excalidraw (UML 2.5 §17.4.4.1, system-design.md §9.3):
  - Sync (default): strokeStyle "solid", endArrowhead "triangle" (closed filled)
  - Async (edges labeled [async]): strokeStyle "solid", endArrowhead "arrow" (open stick)
- Node fills for Excalidraw (pastel palette, text #1e1e1e):
  - Services (ui, webhook, engine): ui bg #a5d8ff stroke #1971c2; webhook/engine bg #96f2d7 stroke #099268
  - External (meet, bot, listened, openai, tts): bg #e9ecef, stroke #868e96
- All Excalidraw elements: roughness 1, fontFamily 1 (Virgil).
- Use bound text via containerId, not inline label, per learnings/integration-001.md.

```mermaid
C4Container
  title Container Diagram for VONQ Meeting Assistant (2025-2026)

  UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")

  Person(recruiter, "Recruiter", "Triggers agent, reads private live hints")
  Person(candidate, "Candidate", "In the interview call; cannot see hints")

  Container(ui, "VONQ Interviewer UI", "React", "Trigger control and private live insights")
  Container(webhook, "Webhook Receiver", "Python, Django", "Ingests real-time transcript events")
  Container(engine, "Analysis Engine", "Python, Django", "Orchestrates turn-by-turn reasoning and intervention")

  System_Ext(meet, "Google Meet", "Live interview call, visible to all participants")
  System_Ext(bot, "Recall.ai Bot", "Joins Meet as 3rd participant; streams audio and transcripts")
  System_Ext(listened, "Recall Listened Page", "Audio injection endpoint back into the call")
  System_Ext(openai, "OpenAI API", "LLM reasoning over transcript turns")
  System_Ext(tts, "ElevenLabs", "Text-to-speech for agent voice")

  Rel(recruiter, ui, "triggers agent join")
  Rel(recruiter, meet, "joins call")
  Rel(candidate, meet, "joins call")
  Rel(ui, bot, "bot join request", "REST")
  Rel(bot, meet, "joins as 3rd participant")
  Rel(meet, bot, "audio stream [async]")
  Rel(bot, webhook, "transcript events [async webhook]")
  Rel(webhook, engine, "transcript turn")
  Rel(engine, openai, "analyze turn")
  Rel(engine, ui, "private insight [async, WebSocket]")
  Rel(engine, tts, "reply text on intervene")
  Rel(tts, listened, "audio stream [async]")
  Rel(listened, meet, "injects audio [async]")

  UpdateElementStyle(recruiter, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(candidate, $fontColor="#748ffc", $bgColor="#dbe4ff", $borderColor="#748ffc")
  UpdateElementStyle(ui, $fontColor="#1971c2", $bgColor="#a5d8ff", $borderColor="#1971c2")
  UpdateElementStyle(webhook, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
  UpdateElementStyle(engine, $fontColor="#099268", $bgColor="#96f2d7", $borderColor="#099268")
```
