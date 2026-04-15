# Diagram Integration Checklist

Step-by-step for Phase 6 (export and integrate). Run through this after the user approves the Mermaid diagram.

---

## Pre-flight

- [ ] `bun run build` passes (no type errors)
- [ ] The `.mmd` file in `src/diagrams/<id>.mmd` is the approved version

---

## Directory setup (first diagram only)

```bash
mkdir -p public/diagrams src/diagrams
```

---

## SVG export

```bash
bunx mmdc -i src/diagrams/<id>.mmd -o public/diagrams/<id>.svg -t default -b transparent
```

If `mmdc` is not available:
```bash
bun add -d @mermaid-js/mermaid-cli
```

Note: first install downloads Chromium (~200MB via Puppeteer). Warn the user.

After export, verify the SVG:
- Open `public/diagrams/<id>.svg` in a browser to check rendering
- Confirm transparent background (no white rectangle behind the diagram)
- Check text is readable at the card's width (~700px)

---

## Update `src/data/projects.ts`

Find the project entry by `id` and add (or update) the `diagramFile` field:

```ts
diagramFile: '<id>.svg',
```

---

## Create `DiagramViewer.tsx` (first diagram only)

Check if `src/components/DiagramViewer.tsx` exists. If not, create it:

```tsx
import { cn } from "@/lib/utils";

interface Props {
  diagramFile: string;
  projectTitle: string;
}

export function DiagramViewer({ diagramFile, projectTitle }: Props) {
  const src = `${import.meta.env.BASE_URL}diagrams/${diagramFile}`;
  return (
    <img
      src={src}
      alt={`Architecture diagram for ${projectTitle}`}
      className={cn("w-full rounded-md", "dark:invert")}
    />
  );
}
```

---

## Update `ProjectCard.tsx`

Import `DiagramViewer` at the top. Replace the placeholder block with:

```tsx
{project.diagramFile && (
  <DiagramViewer diagramFile={project.diagramFile} projectTitle={project.title} />
)}
{!project.diagramFile && project.architectureNotes && (
  <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground text-center">
    Architecture diagram coming in iteration 2
  </div>
)}
```

---

## Update `.gitignore` (first diagram only)

Add these lines:

```
# Diagram preview files (dev only)
src/diagrams/*-preview.md
src/diagrams/*-preview.html
```

---

## Post-flight

- [ ] `bun run build` passes
- [ ] `bun run preview` shows the diagram inside the expanded card
- [ ] Light mode: diagram readable, colors match palette
- [ ] Dark mode: `dark:invert` applied, text still readable
- [ ] The old dashed placeholder no longer shows for this project
