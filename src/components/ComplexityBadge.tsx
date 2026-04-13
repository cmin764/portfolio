import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Complexity } from "@/data/types";

interface Props {
  complexity: Complexity;
}

const COMPLEXITY_CONFIG: Record<Complexity, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-accent text-accent-foreground' },
  high: { label: 'High', className: 'bg-cta text-cta-foreground border-cta' },
};

export function ComplexityBadge({ complexity }: Props) {
  const { label, className } = COMPLEXITY_CONFIG[complexity];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", className)}>
      {label} complexity
    </Badge>
  );
}
