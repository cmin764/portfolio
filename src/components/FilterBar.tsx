import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";
import type { Category } from "@/data/types";

interface Props {
  active: Category | 'all';
  onChange: (value: Category | 'all') => void;
}

export function FilterBar({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <Button
        variant={active === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('all')}
        className={cn(active === 'all' && "bg-cta text-cta-foreground hover:bg-cta/90")}
      >
        All
      </Button>
      {CATEGORIES.map((cat) => (
        <Button
          key={cat.id}
          variant={active === cat.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(cat.id)}
          className={cn(active === cat.id && "bg-cta text-cta-foreground hover:bg-cta/90")}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
