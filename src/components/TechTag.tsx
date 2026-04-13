import { Badge } from "@/components/ui/badge";

interface Props {
  tag: string;
}

export function TechTag({ tag }: Props) {
  return (
    <Badge variant="secondary" className="text-xs font-normal">
      {tag}
    </Badge>
  );
}
