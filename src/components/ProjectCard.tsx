import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ComplexityBadge } from "@/components/ComplexityBadge";
import { TechTag } from "@/components/TechTag";
import { cn } from "@/lib/utils";
import type { ProjectData } from "@/data/types";
import { DiagramViewer } from "@/components/DiagramViewer";

function renderDescription(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(<a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">{match[1]}</a>);
    } else if (match[3] !== undefined) {
      nodes.push(<code key={match.index} className="text-xs font-mono bg-muted px-1 rounded">{match[3]}</code>);
    } else if (match[4] !== undefined) {
      nodes.push(<strong key={match.index}>{match[4]}</strong>);
    } else {
      nodes.push(<em key={match.index}>{match[5]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

interface Props {
  project: ProjectData;
}

const STATUS_LABEL: Record<ProjectData['status'], string> = {
  active: 'Active',
  shipped: 'Shipped',
  stealth: 'Stealth',
  'in-progress': 'In Progress',
  discontinued: 'Discontinued',
};

export function ProjectCard({ project }: Props) {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const isActive = hash === `#${project.id}`;
  const [open, setOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) navigate(`#${project.id}`, { replace: true });
  }

  return (
    <Collapsible id={project.id} open={open} onOpenChange={handleOpenChange}>
      <Card className={cn("transition-shadow", open && "shadow-md", isActive && open && "ring-2 ring-primary/40")}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold leading-tight">{project.title}</h3>
                {project.company && (
                  <span className="text-xs text-muted-foreground">
                    {project.company}{project.period ? ` · ${project.period}` : ''}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            </div>
            <CollapsibleTrigger asChild>
              <button
                className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={open ? "Collapse project details" : "Expand project details"}
                aria-expanded={open}
              >
                {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </CollapsibleTrigger>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-1">
            <ComplexityBadge complexity={project.complexity} />
            <span className="text-xs text-muted-foreground">{STATUS_LABEL[project.status]}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <TechTag key={tag} tag={tag} />
            ))}
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{renderDescription(project.description)}</p>

            {project.diagramFile && (
              <DiagramViewer diagramFile={project.diagramFile} projectTitle={project.title} excalidrawUrl={project.diagramExcalidrawUrl} />
            )}
            {!project.diagramFile && project.architectureNotes && (
              <div className="rounded-md border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground text-center">
                Architecture diagram coming in iteration 2
              </div>
            )}

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
