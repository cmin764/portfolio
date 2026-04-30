# Actionable Diagramming Guidelines for System Architecture in an Excalidraw Style
## 1. Core principles
Effective architecture diagrams exist to communicate structure and behavior quickly, not to mirror code or infrastructure in exhaustive detail. Clarity, consistency, and appropriate level of detail matter more than strict adherence to any one notation. For system design overviews, the C4 model’s levels (Context, Containers, Components, Code) are a good mental backbone, even if the final output is informal and hand‑drawn in an Excalidraw style.[^1][^2][^3][^4][^5]

Key principles:
- One diagram, one main story: pick a primary question ("Who talks to what?", "How does data flow?", "What runs where?") and design around that.[^2][^6]
- Prefer fewer, focused diagrams over one dense “everything” picture.[^7][^8]
- The diagram should stand alone: with a title, legend, and labels, a reader should grasp it without extra explanation.[^4][^7]
## 2. Levels of detail (C4-inspired)
The C4 model defines four hierarchical levels: Context (systems and users), Containers (apps and data stores), Components (modules inside containers), and Code (classes, etc.). For most hand‑drawn Excalidraw diagrams you only need the first three.[^1][^9][^3][^10][^5]

Recommended use:
- Context: Show your system as a single box, its users (people) and external systems, plus the relationships between them.[^3][^1]
- Container: Zoom into one system and show deployable units and data stores (web app, API, mobile app, DB, cache, queue, external APIs).[^11][^12]
- Component: For a complex container, show its main internal components and their dependencies or data flows.[^9][^12]

Automation implication: Have the Claude Code automation always target a specific level, and keep each diagram to a single level instead of mixing context, containers, and components.
## 3. Visual vocabulary: shapes and semantics
Most architecture guidance is notation‑agnostic but recommends a consistent, minimal symbol set plus a legend. Common practice across UML, flowcharts, C4, and diagram-as-code tools converges on a small set of shapes with well-understood meanings.[^2][^13][^4][^14][^15]
### 3.1 Recommended base shapes
Use 6–8 core shapes that map well to Excalidraw primitives:

- Person / user: Stick-figure icon or rounded rectangle labeled as a person (type "Person").[^16][^4]
- Software system (context level): Rounded rectangle.
- Container (apps, services, frontends, backends): Plain rectangle or rounded rectangle.[^11][^12]
- Database / persistent store: Cylinder, reflecting its widespread use as a database symbol in flowcharts and diagrams.[^13][^14]
- Queue / topic / stream: Either a cylinder labelled as a queue/topic or a distinct shape (e.g., stadium or pill), but treat it consistently as a data store per C4 guidance.[^17][^11]
- External service / SaaS / third-party: Rectangle with a different border style (dashed) or lighter color to signal “external.”[^2][^3]
- Boundary / grouping: Large rounded rectangle or box around related elements (system boundary, bounded context, deployment environment).[^1][^16]
- Special patterns (optional): Hexagon for an application core in hexagonal architecture, indicating a port/adapters style.[^18][^19]

Automation implication: The automation should choose shapes purely based on semantic role (person, system, container, data store, queue, external) and re-use them consistently across diagrams.
### 3.2 Color and style usage
C4 notation guidance explicitly recommends a legend and consistent color coding, while noting that the model is otherwise notation independent. Architecture best-practice guides similarly warn against overusing colors.[^7][^4][^5][^20]

Simple scheme:
- Use one base color per layer: e.g., presentation, services, data.[^3][^20]
- Use a distinct but muted palette in Excalidraw; avoid more than 4–5 colors.
- Reserve strong colors (red/orange) for hotspots (SPOFs, risky dependencies).

Automation implication: Hard-code a small palette and layer-to-color mapping, and include a color legend in one corner of the diagram.
## 4. Arrows, lines, and flow semantics
Most authoritative sources agree that diagrams should avoid unlabeled lines, ambiguous arrow direction, and bidirectional arrows. UML and sequence-diagram notations provide useful conventions for solid vs dashed lines and different arrowheads that can be adapted.[^21][^2][^22][^6][^23][^4]
### 4.1 Direction and meaning
Guidelines from Azure, C4, and architecture articles:
- Always use arrows, not bare lines, for relationships between components.[^2][^4]
- Every line should be unidirectional and represent one primary relationship (dependency or data flow).[^6][^4]
- Avoid double-headed arrows; use two separate arrows or a single arrow annotated with request/response instead.[^2][^6]
- Label every arrow with either "what" (data or message name) or "how" (protocol/technology), and keep the label consistent with arrow direction.[^3][^4][^6]

Automation mapping:
- Draw arrows from caller/client to callee/dependency (e.g., UI → API, service → DB).[^3][^2]
- If modeling data flow rather than caller/callee, state that in the legend ("Arrows show data flow").[^24][^6]
### 4.2 Line style: solid vs dashed
UML and related notations use solid vs dashed lines to differentiate association/interaction from dependency or return. Sequence-diagram notation also uses dashed lines for reply messages and certain secondary flows.[^21][^22][^23][^25]

Practical convention for architecture diagrams:
- Solid arrow: Primary runtime interaction or data flow ("A calls B", "events published", "messages sent").[^2][^3]
- Dashed arrow: Non-primary or non-runtime relationships, such as build-time dependencies, configuration, monitoring, or read-only/reporting flows.[^22][^25]

Automation implication: Default to solid arrows, and use dashed arrows only when the textual description explicitly says “depends on”, “uses library”, “monitors”, or “is configured by.”
### 4.3 Arrowheads and concurrency
UML sequence and message notation distinguishes synchronous vs asynchronous messages via arrowhead shape and reply arrows.[^21][^26][^23]

Adapted for system architecture diagrams:
- Filled triangular arrowhead: Synchronous call (request/response, blocking until result).
- Open or stick arrowhead: Asynchronous send (fire-and-forget to a queue, event bus, or pub/sub topic).

Because Excalidraw’s arrow control is simple, this can remain a conceptual rule or be approximated by two arrow styles (normal vs outlined).

Automation implication: Allow an optional "sync" vs "async" tag in the source description and map it to two arrow styles. When no tag is provided, treat everything as synchronous.
### 4.4 Cardinality and bi-directional relationships
UML class-diagram notation allows undirected associations and directed dependencies using arrows and multiplicities. For high-level architecture diagrams, multiplicities are rarely needed, but direction still matters.[^22][^25]

Guidelines:
- Prefer one-way arrows even when communication is technically bidirectional, to emphasize the primary dependency direction.[^2][^4]
- If both directions are important (e.g., bidirectional replication), show two arrows with distinct labels ("replicate A→B" and "replicate B→A").[^6][^27]

Automation implication: Never draw a double-headed arrow; if an input description mentions mutual communication, emit two arrows.
## 5. Layout and composition
Readability research and UML best-practice guidelines converge on a few layout rules: minimize line crossings, avoid diagonal lines, and keep consistent flow direction. C4 and modern tooling emphasize layered, hierarchical layouts.[^28][^8][^29][^20][^30]
### 5.1 Flow direction
Advice from architecture diagram guides and auto-layout tools:
- Pick a primary flow direction and stick to it on a given diagram (ideally top-to-bottom, or left-to-right for pipeline-like systems).[^28][^27][^31]
- Put external actors and entrypoints at the top or left, core systems in the middle, and infrastructure at the bottom or right.[^3][^28]

Automation implication: Use a layered layout algorithm: sources with no incoming edges on the first row, their direct dependencies on the next, and so on.[^20][^28]
### 5.2 Spacing and line routing
Diagramming guidelines recommend adequate spacing, minimal line crossings, and orthogonal (horizontal/vertical) connectors.[^32][^8][^29]

Rules:
- Ensure enough whitespace between nodes to prevent overlapping labels and lines.[^20][^32]
- Use only horizontal and vertical segments for connectors where possible; avoid diagonal lines and curves.[^8][^29]
- If lines must cross, visually “hop” one over the other or reroute to minimize crossings.[^29][^33][^8]

Automation implication: When generating path points, snap connectors to orthogonal segments and attempt simple rerouting to avoid crossings, even in a hand-drawn Excalidraw style.
### 5.3 Diagram size and focus
UML and architecture best-practice articles strongly argue for “less is more” and limiting the number of elements per diagram.[^7][^8][^33]

Guidelines:
- If the diagram no longer fits comfortably on a single screen or page while remaining legible, split it.[^8][^33]
- Separate different concerns into different diagrams: e.g., context vs deployment vs detailed component flows.[^2][^7]

Automation implication: Introduce thresholds (e.g., max nodes per diagram) and, if exceeded, either zoom to a subset or create multiple diagrams at different C4 levels.
## 6. Labeling, legends, and metadata
Both C4 notation guidance and architecture diagram best-practice articles stress clear labeling, legend keys, and metadata (title, date, version).[^7][^4]
### 6.1 Titles and subtitles
Recommendations from C4 and Azure:
- Every diagram must have a title that specifies diagram type and scope, such as "System Context: Payments Platform".[^2][^4]
- Optionally add a short subtitle describing the viewpoint, e.g., "Data ingestion flow" or "User registration path".[^24][^3]

Automation implication: Generate titles automatically from the system name and chosen C4 level, with an optional “view” suffix based on the primary concern.
### 6.2 Legend / key
C4 notation and architecture best-practice guides recommend always including a legend explaining shapes, colors, and line styles. KSTD explicitly offers a ready-to-use legend for Excalidraw architecture diagrams.[^7][^4]

Legend contents:
- Shape-to-role mapping: person, system, service, database, queue, external system.[^13][^4]
- Color-to-layer mapping: UI, services, data, external.[^4][^20]
- Line style semantics: solid vs dashed, arrowhead styles, and whether arrows represent calls or data flow.[^2][^4]

Automation implication: Always generate a small legend box in a corner with these mappings. Treat it as mandatory, not optional.
### 6.3 Node labels and annotations
C4 notation requires explicit element types and short descriptions for each node. Architecture diagram guides urge concise, meaningful names.[^7][^3][^16][^4]

Rules:
- Each node label should include at least a name and type (e.g., "Orders API – Container", "PostgreSQL – Database").[^11][^4]
- Add a one-line description below or inside the node where space permits (“Handles order creation and queries”).[^3][^4]
- Avoid internal abbreviations or domain jargon without explanation; if needed, explain in the legend or a footnote.[^4][^7]

Automation implication: For each element in the input, derive a structured triple: `name`, `type`, `shortDescription`, and render at least name + type in the label.
## 7. Showing interactions and behavior
Static structure (who exists and how they’re wired) is often not enough; many guides recommend complementary sequence or flow diagrams for key use cases.[^21][^3][^34]
### 7.1 When to use sequence-style views
Sequence diagrams show chronological message exchanges over time, with time flowing top-to-bottom and messages as arrows between lifelines.[^21][^23][^25]

Use a sequence or flow-style diagram when:
- Explaining a specific scenario (login, checkout, async processing pipeline).[^34][^21]
- Investigating race conditions, ordering, or complex orchestration.[^26][^23]

Adaptation for Excalidraw:
- Treat each participating component as a vertical lane.
- Time goes from top to bottom; number steps if necessary.[^31][^21]
- Use the same arrow semantics (solid vs dashed, sync vs async) as in structural diagrams for consistency.
### 7.2 Combining structure and behavior
Guides on documenting software architecture recommend multiple complementary diagram types rather than overloading a single diagram with behavior and structure.[^35][^2]

Guidelines:
- Use a high-level architecture diagram (C4-style) to show components and main connections.[^5][^12]
- Use one or more small sequence/flow diagrams to explain important interactions that cut across components (e.g., "Order placement" flow).[^21][^34]

Automation implication: Support separate modes: "structure view" and "sequence/flow view". Given a textual description of a scenario, generate a separate, simpler diagram focusing on that scenario.
## 8. Excalidraw-specific style considerations
Excalidraw is intentionally informal and hand-drawn, but the same architectural best practices still apply: clarity of notation, legends, and layout. KSTD provides an Excalidraw library and header/legend components to standardize architecture diagrams in this environment.[^7][^4]

Guidelines for an Excalidraw look:
- Use slightly jittered lines and rounded rectangles to keep the sketch feel, but do not sacrifice orthogonal layout and label legibility.[^29][^20]
- Keep stroke widths and font sizes consistent across the diagram.
- Use KSTD-style headers with diagram title, date, version, and author where appropriate.[^7]

Automation implication: When calling an Excalidraw MCP, set consistent style parameters (stroke, font size, roughness) globally and avoid mixing many styles.
## 9. Concrete rule set for Claude Code + Excalidraw MCP
The following is a condensed, implementation-ready set of rules for an automation that turns structured system descriptions into clear diagrams.
### 9.1 Input expectations
- Require as input:
  - Diagram type: `context | container | component | sequence`.
  - Primary concern: `structure | data-flow | deployment | specific-scenario`.
  - Elements: list of nodes with fields `{id, name, role, tech?, description?}`.
  - Relationships: list of edges with `{from, to, type, label, sync?}` where `type` ∈ `{call, data, dependency, monitor}`.
### 9.2 Node rendering rules
- Map `role` to shape and style:
  - `person`: **Excalidraw: circle/ellipse** (`"type": "ellipse"`); Mermaid `Person()` renders as a fixed box with icon, no shape override possible.
  - `system`: rounded rectangle with thicker border.
  - `container`: rectangle or rounded rectangle.
  - `database|cache|index|registry`: rounded rectangle (`"roundness": {"type": 3}`) with orange palette: fill `#ffd8a8`, stroke/text `#e8590c`. Mermaid: `ContainerDb`. Includes any passive state holder (Redis, S3, Elasticsearch, etc.).
  - `queue|topic|stream|pubsub`: rounded rectangle with red palette: fill `#ffc9c9`, stroke/text `#e03131`. Mermaid: `ContainerQueue`. Only true messaging primitives; caches and registries stay orange.
  - `artifact|generated-file|export`: **non-rounded rectangle** (`"type": "rectangle"`, `"roundness": null` — sharp 90° corners) with amber palette: fill `#ffec99`, stroke/text `#f08c00`. Sharp corners contrast with rounded rectangles on all active runtime elements. Mermaid: `System_Ext` with amber override.
  - `external-system|external-service`: rounded rectangle, near-white bg `#e9ecef`, gray border/text `#868e96`.
- Label format (Excalidraw, 2–4 lines): Name on first line (bold, ~16px); optional `<Type>` on second line (role label, ~12px — omit when role is obvious from color); `[Technology / stack]` on next line (~12px); short responsibility with optional `(status)` on last line (~12px). In Mermaid C4: `Container(alias, "Name", "Technology", "Description")`. Bracket semantics: `<>` = C4 abstraction level; `[]` = technology; `()` = status qualifier.
- Color mapping (authoritative hex values in `.claude/skills/diagram/references/color-palette.md`):
  - UI/frontends: light blue bg `#a5d8ff`, stroke `#1971c2`.
  - Services/APIs: light mint bg `#96f2d7`, stroke `#099268`.
  - Databases / caches / indexes: light peach bg `#ffd8a8`, stroke `#e8590c`.
  - Queues / streams / topics: light red bg `#ffc9c9`, stroke `#e03131`.
  - External systems: near-white bg `#e9ecef`, stroke `#868e96`.
  - Boundary/grouping boxes: neutral bronze tint, stroke `#846358`. Two stroke styles carry distinct semantics: `strokeStyle: "dashed"` for grouping/trust/deployment boundaries (contains multiple containers); `strokeStyle: "solid"` for zoom-in/expansion frames (one container opened to show its internals). Never use role-specific fills on boundaries. Title text is always `#846358`.
  - Legend boxes: yellow `#fff9db`, no border, **sharp corners** (`"roundness": null`), solid fill, `#1e1e1e` text.
  - Warning/callout boxes: pink fill `#fcc2d7`, stroke `#c2255c`, `#1e1e1e` text.
- Arrow colors: `#1e1e1e` for all edges, no exceptions. Stroke style and arrowhead type (filled triangle for sync, open stick for async) encode the full semantic. Color adds nothing.
### 9.3 Edge rendering rules
- For `type = call` or `data`:
  - Use solid lines.
  - Use filled arrowhead for `sync=true` or unspecified.
  - Use open arrowhead (or stylistic variant) for `sync=false`.
- For `type = dependency` or `monitor`:
  - Use dashed lines, filled arrowhead.
- Always draw arrows from initiator to dependency or from source of data to sink.
- Never use double-headed arrows; if needed, generate two arrows with distinct labels.
- Every edge must have a short label, either data name ("OrderCreated") or protocol/verb ("HTTPS/JSON", "reads from").
### 9.4 Layout rules
- Choose primary direction:
  - For `sequence` or time-based views: top-to-bottom.
  - For `data-flow` or pipeline views: left-to-right.
  - Otherwise default to top-to-bottom.[^28][^27]
- Layering:
  - Place nodes with no incoming edges in the first row/column.
  - Subsequent layers contain nodes whose dependencies are in previous layers.[^28]
- Maintain ample spacing; enforce minimum distance between nodes.
- Route connectors orthogonally and attempt simple re-layout to reduce edge crossings.
### 9.5 Legends and metadata
- **Legend is mandatory on every diagram.** A reader must understand the diagram without external documentation. Minimum canonical content:
  - Arrow-style → interaction type: solid+filled = sync, solid+open = async, dashed+filled = cron/polling, dashed+open = secondary background async.
  - **Direction rule (always present):** "Arrows point from initiator to dependency."
  - Color → role: blue=UI, teal=service, orange=DB/cache, red=queue/stream, gray=external, indigo=person, amber=artifact.
  - Boundary stroke vocabulary: dashed=grouping boundary, solid=zoom-in/expansion frame (include only when both are used on the diagram).
- Legend box style: yellow `#fff9db`, no border, **sharp corners** (`"roundness": null`), solid fill, placed in a corner of the canvas.
- Add a diagram title: `"<Company>: <Project> (<period>) — <Diagram type>"`. Excalidraw: add a subtitle text element for the diagram level (e.g. "Container Diagram").[^7][^4]
### 9.6 Multiple views and scenarios
- For each system, generate at most:
  - One context diagram.
  - One or more container diagrams, one per major system.
  - Component diagrams only for complex containers.
  - Optional sequence diagrams for key scenarios.
- Use consistent naming and color coding across diagrams so that nodes are recognizable between views.[^5][^20]
## 9.7 Known deviations from industry norms

This system makes four deliberate choices that deviate from mainstream C4 or UML conventions. Each is intentional and carries a defined mitigation.

### Shape uniformity

**Deviation:** Rounded rectangles are used for all node roles — including databases, caches, and queues — rather than cylinders or ellipses, which are the conventional data-store shapes in flowcharts and many C4 examples.

**Risk:** A reader fluent in standard notation may interpret "rectangle = active service" and miss that an orange rounded rectangle is a database.

**Mitigation:** Mermaid renders `ContainerDb` and `ContainerQueue` with built-in type indicators. Every database and queue node carries an explicit type label (`<Database>`, `<Queue>`, etc.) in the node text. The legend states "All shapes are rounded rectangles; role = color + type label." Artifacts (passive outputs) use sharp-corner rectangles as the only shape exception, reinforcing that all other rounded-rect nodes are active runtime actors.

### Arrow semantics: arrowhead for sync/async

**Deviation:** This system uses arrowhead style (filled triangle vs. open stick) to distinguish synchronous from asynchronous calls. That is a UML sequence-diagram convention, not standard C4. C4 typically encodes sync/async via line style or edge labels rather than arrowhead shape.

**Risk:** A reader expecting C4 conventions may not read the arrowhead distinction. They will see "solid arrow" as "sync" and "dashed arrow" as "async/background" — which partially aligns with this system's line-style axis — but miss the finer arrowhead distinction.

**Mitigation:** The primary encoding axis is **line style** (solid = primary runtime path, dashed = secondary/background). The arrowhead is a secondary reinforcement. Every edge carries a verb-object label. The legend explicitly lists all four combinations with their meanings. Readers who ignore the arrowhead still get the primary signal from the line style and label.

### Color count: seven semantic roles

**Deviation:** Best-practice guides recommend 3-4 accent colors maximum. This system uses seven: blue (UI), teal (service), orange (DB/cache), red (queue/stream), gray (external), indigo (person), amber (artifact).

**Risk:** Visual overload, especially for color-blind readers or black-and-white output.

**Mitigation:** Each color maps to a genuinely distinct runtime character that appears repeatedly across diagrams. Roles are always paired with a type label, so meaning is not lost if colors are indistinguishable. The amber artifact color is used conditionally (only when a node is explicitly a generated file/export); the indigo person color is rare (usually one node per diagram). In practice, most diagrams use 4-5 of the seven roles.

### Boundary stroke semantics

**Deviation:** This system assigns distinct meanings to dashed vs. solid boundary strokes (grouping boundary vs. zoom-in frame). No published C4 or architecture guidance defines this distinction.

**Risk:** A reader unfamiliar with this system will see a solid bronze box and have no standard cue for what it means.

**Mitigation:** The legend includes the boundary stroke vocabulary (`╌╌╌ GROUPING BOUNDARY` / `─── ZOOM-IN`) whenever both types appear on a diagram. A solid expansion frame is also titled with its source container name, providing a textual cue even without the legend.

---

## 10. Limitations and open choices
There is no single globally enforced standard for informal system diagrams; C4 is intentionally notation independent, and UML is often considered too heavyweight for day-to-day architecture sketches. The conventions above intentionally borrow widely adopted practices from C4, UML, flowcharts, and architecture tooling to create a pragmatic, Excalidraw-friendly subset.[^3][^13][^4][^15][^5]

The automation should surface some parameters (e.g., color palette, flow direction, sync/async visualization) as configurable, but should keep the core semantics fixed so that diagrams stay consistent over time.

---

## References

1. [C4 Model Tutorial - Complete Beginner's Guide](https://visual-c4.com/blog/7-cluster-c4-model-tutorial)

2. [Architecture design diagrams](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/design-diagrams) - Learn about diagramming practices and types of architecture diagrams that you can create to communic...

3. [System architecture diagram basics & best practices - vFunction](https://vfunction.com/blog/architecture-diagram-guide/) - These diagrams often use iconography to represent various cloud services and arrows to illustrate co...

4. [Notation](https://c4model.com/diagrams/notation) - The C4 model is notation independent, and doesn't prescribe any particular notation. That said, you ...

5. [C4 model - Wikipedia](https://en.wikipedia.org/wiki/C4_model)

6. [The Art of Crafting Architectural Diagrams - InfoQ](https://www.infoq.com/articles/crafting-architectural-diagrams/) - A line or an arrow can be interpreted either as a data flow (e.g. data flows from system A to system...

7. [Architecture Diagram - Best Practices](https://kstd.thriving.dev/guide/architecture-diagrams-best-practices/) - Learn the best practices for crafting clear and effective software architecture diagrams. Discover t...

8. [UML Best Practice: 5 rules for better UML diagrams - Bellekens](https://bellekens.com/2012/02/21/uml-best-practice-5-rules-for-better-uml-diagrams/) - Try to avoid any two lines in your diagram to cross each other. Uncrossing lines in your diagram sur...

9. [What is C4 Model? Complete Guide for Software Architecture - Miro](https://miro.com/diagramming/c4-model-for-software-architecture/) - Understand everything of what is C4 Model for software architecture, how to use it, components, exam...

10. [C4 model: Home](https://c4model.com) - The C4 model is an easy to learn, developer friendly approach to software architecture diagramming: ...

11. [Container diagram](https://c4model.com/diagrams/container) - The Container diagram shows the high-level shape of the software architecture and how responsibiliti...

12. [What is the C4 Model in software architecture design ...](https://www.processon.io/blog/c4-model-for-software-architecture) - The C4 Model (Context, Containers, Components, and Code) is a system architecture diagram method tai...

13. [The Meaning of 23 Flowchart Symbols - HEFLO](https://www.heflo.com/blog/flowchart-symbols) - Discover flowchart symbols with clear examples and learn step by step. Create your own diagrams inst...

14. [Flowcharts Syntax | Mermaid](https://mermaid.ai/open-source/syntax/flowchart.html) - Mermaid introduces 30 new shapes to enhance the flexibility and precision of flowchart creation. The...

15. [D2 Diagrams Online Complete Architecture Diagram Guide](https://www.tools-online.app/blog/D2-Diagrams-Online-Complete-Architecture-Diagram-Guide) - Hexagons for API gateways. Cylinders for databases. Persons for users/actors. Clouds for cloud servi...

16. [C4 Model vs Nodinite Concept Mapping](https://docs.nodinite.com/Documentation/RepositoryModel?doc=%2FC4+Diagrams%2FTroubleshooting%2FC4+Model+vs+Nodinite+Concept+Mapping) - The C4 model is named after four diagram types — Context, Containers, Components, and Code — that ea...

17. [Queues and topics - C4 model](https://c4model.com/abstractions/queues-and-topics) - A message queue is essentially a data store - it's a bucket for storing data (messages), with produc...

18. [Beginner's Guide to Hexagonal Architecture Diagram (Data Flow)](https://blog.visual-paradigm.com/beginners-guide-to-hexagonal-architecture-diagram-data-flow/) - Hexagonal Architecture, also known as Ports and Adapters Architecture, is a powerful architectural p...

19. [What is Hexagonal Architecture Diagram - Cybermedian](https://www.cybermedian.com/what-is-hexagonal-architecture-diagram/) - Hexagonal architecture diagram is an architectural pattern used in software design aiming at creatin...

20. [The Art and Science of Architecture Diagrams - Catio.tech](https://www.catio.tech/blog/the-art-and-science-of-architecture-diagrams) - This blog post will guide you through the complexities of architecture visualization. We'll explore ...

21. [UML Sequence Diagram - Enterprise Architect](https://www.sparxsystems.eu/languages/uml/diagrams/sequencediagram/) - What can be seen in the Sequence Diagram? Behaviour ► Get to know all message types, symbols & pract...

22. [[PDF] UML Class Diagrams](https://www.se.rit.edu/~swen-262/slides/UML%20Class%20Diagrams.pdf)

23. [Common Message Symbols](https://www.lucidchart.com/pages/uml-sequence-diagram) - Comprehensive guide on everything you need to know about sequence diagrams in UML. We'll show you ho...

24. [Software architecture diagram arrows](https://ctaverna.github.io/diagram-arrows/) - It's just an arrow! Arrows are used in almost every type of diagram, and software architectural diag...

25. [15.4 Basic Sequence Diagram Notation - UML - InformIT](https://www.informit.com/articles/article.aspx?p=360441&seqNum=5) - This chapter introduces the notation used in the UML for two common types of interaction diagrams (s...

26. [UML: Sequence Diagram](https://shesterov.by/homeen/tpost/lhxj61n9d1-uml-sequence-diagram) - Sequence diagram: why use it, what it includes, and common mistakes.

27. [Tip 7: ...And Finish Up With...](https://adamcogan.com/2020/10/07/8-tips-to-better-architecture-diagrams/) - A good architecture diagram (aka a cloud architecture diagram or system architecture diagram) gives ...

28. [Auto Layout: Organize Your Architecture Diagrams Instantly - Archyl](https://www.archyl.com/blog/auto-layout-organize-architecture-diagrams-instantly) - Manually positioning dozens of nodes on a C4 diagram is tedious work that adds no architectural valu...

29. [General Diagramming Guidelines (Chapter 2) - The Elements of ...](https://www.cambridge.org/core/books/elements-of-uml-20-style/general-diagramming-guidelines/9C2553636C85C84B03ABCB9311158553) - Readability Guidelines. Avoid Crossing Lines. When two lines cross on a diagram, such as two associa...

30. [Evaluating the layout quality of UML class diagrams using machine ...](https://www.sciencedirect.com/science/article/pii/S016412122200125X) - An example is the number of crossing lines in a diagram: fewer crossing lines contribute to a higher...

31. [The Art of Arrow Direction in Architecture Diagrams - tim Insight](https://timinsight.com/architecture-diagram-arrow-direction-en/) - Learn architecture diagram arrow best practices. Essential for clear system design communication.

32. [Best Practices for Clear UML Diagrams - Go UML](https://www.go-uml.com/best-practices-clear-maintainable-uml-diagrams/) - Adequate spacing prevents lines from overlapping and makes the diagram readable. Use padding between...

33. [Architecture Diagram Best Practices: A Complete Guide - InfraSketch](https://infrasketch.net/blog/architecture-diagram-best-practices) - This guide covers everything you need to know about creating effective software architecture diagram...

34. [Generate Architecture Diagrams from Text | River Blog](https://rivereditor.com/blogs/generate-diagrams-from-architecture-text) - Learn how to create technical diagrams from text descriptions. Complete guide to diagram-as-code too...

35. [Software architecture: practice, potential, and pitfalls](https://figshare.com/articles/journal_contribution/Software_Architecture_Practice_Potential_and_Pitfalls/6609602/1/files/12101720.pdf) - Whatever the long-term impact of software architecture may turn out to be, an appropriate starting p...

