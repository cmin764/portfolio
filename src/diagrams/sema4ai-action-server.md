# Sema4.ai: Action Server (2023–2024) — Container Diagram

Developer authors typed `@action` Python functions inside an Action Package; Action Server scans them, builds a Pydantic-backed OpenAPI spec, and exposes FastAPI endpoints. Sema4.ai Studio (Desktop chat app) ingests that spec, routes the user's chat intent to an LLM for tool-use reasoning, then invokes the matching action. Power User configures Studio: LLM provider, OAuth connections, and access grants between Studio and external systems. The Actions Gallery (GitHub) feeds both Developer and Studio with ready-made Action Packages. This design predates MCP but maps directly onto it.

```mermaid
C4Container
  title Sema4.ai: Action Server (2023–2024)

  Person(dev, "Developer", "Authors @action | @tool Python functions via VS Code SDK")
  Person(powerUser, "Power User", "Configures Studio: LLM provider, connections, OAuth, access grants")
  System_Ext(gallery, "Actions Gallery", "github.com/Sema4AI/gallery — reference Action Packages")
  System_Ext(llm, "LLM / GPT", "OpenAI / Azure / Bedrock — tool-use reasoning")
  System_Ext(externalSystems, "External Systems", "SharePoint, SAP, DBs, browsers, SaaS APIs")

  Container(actionPkg, "Action Package", "package.yaml + @action Python; RCC-managed env", "One deployable unit: typed functions + conda env spec")
  Container(actionServer, "Action Server", "FastAPI + RCC; pip install sema4ai-action-server", "Exposes /openapi.json, /mcp, /actions/{name}. Precedes MCP standard — same protocol, built before it was formalized.")
  ContainerDb(registry, "Action Registry", "In-memory", "name → Pydantic schema → OpenAPI spec; built at startup from loaded @action functions")
  Container(studio, "Sema4.ai Studio", "Desktop app", "Chat interface; ingests OpenAPI/MCP spec; drives LLM tool-use loop; enforces access grants")

  Boundary(aiActions, "AI Actions (Pydantic-typed Python, loaded from Action Package)", "system") {
    Container(actionA, "query_database", "Python @action", "Postgres / Snowflake query")
    Container(actionB, "post_to_slack", "Python @action", "SaaS API call")
    Container(actionC, "read_sheet", "Python @action", "SharePoint / Sheets read")
  }

  Rel(dev, actionPkg, "authors (VS Code SDK, @action / @tool)")
  Rel(dev, gallery, "contributes + pulls reference packages")
  Rel(powerUser, studio, "configures LLM + connections + access grants")
  Rel(studio, gallery, "browses + installs Action Packages")
  Rel(actionServer, actionPkg, "scans + loads @action functions at startup")
  Rel(actionServer, registry, "populates + looks up by name")
  Rel(studio, actionServer, "discovers actions (GET /openapi.json + /mcp)")
  Rel(studio, llm, "prompt + tool schema / tool-call response")
  Rel(studio, actionServer, "invokes action (POST /actions/{name}, validated JSON)")
  Rel(actionServer, actionA, "dispatches with validated params")
  Rel(actionServer, actionB, "dispatches with validated params")
  Rel(actionServer, actionC, "dispatches with validated params")
  Rel(actionA, externalSystems, "queries DB")
  Rel(actionB, externalSystems, "POSTs to SaaS API")
  Rel(actionC, externalSystems, "reads doc / sheet")

  UpdateElementStyle(dev, $bgColor="#dbe4ff", $borderColor="#748ffc", $fontColor="#748ffc")
  UpdateElementStyle(powerUser, $bgColor="#dbe4ff", $borderColor="#748ffc", $fontColor="#748ffc")
  UpdateElementStyle(actionPkg, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(actionServer, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(registry, $bgColor="#ffd8a8", $borderColor="#e8590c", $fontColor="#e8590c")
  UpdateElementStyle(studio, $bgColor="#a5d8ff", $borderColor="#1971c2", $fontColor="#1971c2")
  UpdateElementStyle(actionA, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(actionB, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(actionC, $bgColor="#96f2d7", $borderColor="#099268", $fontColor="#099268")
  UpdateElementStyle(gallery, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
  UpdateElementStyle(llm, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
  UpdateElementStyle(externalSystems, $bgColor="#e9ecef", $borderColor="#868e96", $fontColor="#868e96")
```
