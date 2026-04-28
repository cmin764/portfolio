# A5 Labs: GTO / Reinforcement Learning Poker Engine (2025) — Container Diagram

Three sibling decision services sit behind a Glue router: GTO (game-theory-optimal), Strategy (non-GTO heuristics), and an RL Service that doubles as the C++ inference server with trained models loaded at startup. Glue picks the best response under a time budget. Acebench, a Python MLOps benchmark, exercises the full stack via Bitbucket CI pipelines to detect regressions and track quality/latency against historical baselines.

```mermaid
C4Container
  title A5 Labs: GTO / Reinforcement Learning Poker Engine (2025)

  System_Ext(client, "Game Client", "Sends game state: hole cards, board, pot, action history")

  Boundary(ciLane, "CI / MLOps", "system") {
    System_Ext(ci, "Bitbucket CI", "Pipelines triggered on push / cron")
    Container(acebench, "Acebench", "Python", "MLOps benchmark: regression detection, quality + latency tracking against baselines")
  }

  Boundary(pythonTier, "Python tier (FastAPI)", "system") {
    Container(glue, "Glue Service", "Python + FastAPI", "Routing + orchestration; selects best response under a response-time budget")
    Container(gto, "GTO Service", "Python + FastAPI", "Game-theory-optimal decision logic")
    Container(strategy, "Strategy Service", "Python + FastAPI", "Non-GTO strategy heuristics")
  }

  Container(rl, "RL Service", "C++ + Drogon", "In-process inference server; trained RL models loaded at startup")

  Rel(client, glue, "game state / action + EV")
  Rel(glue, gto, "route under time budget")
  Rel(glue, strategy, "route under time budget")
  Rel(glue, rl, "route under time budget")
  Rel(ci, acebench, "triggers on push / cron")
  Rel(acebench, glue, "runs regression + quality benchmarks")

  UpdateElementStyle(client, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
  UpdateElementStyle(ci, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
  UpdateElementStyle(acebench, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(glue, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(gto, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(strategy, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(rl, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
```
