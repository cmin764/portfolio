import { cn } from "@/lib/utils";
import { DiagramLegend } from "@/components/DiagramLegend";

interface Props {
  diagramFile: string;
  projectTitle: string;
  excalidrawUrl?: string;
}

export function DiagramViewer({ diagramFile, projectTitle, excalidrawUrl }: Props) {
  const src = `${import.meta.env.BASE_URL}diagrams/${diagramFile}`;
  const img = (
    <img
      src={src}
      alt={`Architecture diagram for ${projectTitle}`}
      className={cn("w-full rounded-md", "dark:invert")}
    />
  );
  return (
    <div>
      {excalidrawUrl ? (
        <a href={excalidrawUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${projectTitle} diagram in Excalidraw`}>
          {img}
        </a>
      ) : img}
      <DiagramLegend />
    </div>
  );
}
