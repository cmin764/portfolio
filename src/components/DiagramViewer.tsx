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
