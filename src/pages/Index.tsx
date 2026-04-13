import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/FilterBar";
import { CategorySection } from "@/components/CategorySection";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFilter } from "@/hooks/useFilter";
import { CATEGORIES } from "@/data/categories";
import { PROJECTS } from "@/data/projects";
import { LINKS } from "@/lib/constants";

export default function Index() {
  useDocumentTitle("Portfolio");
  const { active, setActive } = useFilter();

  const visibleProjects = active === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  const visibleCategories = CATEGORIES.filter((cat) =>
    visibleProjects.some((p) => p.category === cat.id)
  );

  return (
    <div className="container py-16 space-y-16">
      {/* Hero */}
      <section className="space-y-4 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">
          Systems thinker.<br />AI product builder.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Fractional AI Product Strategist helping B2B companies build intelligent products.
          Here&apos;s the work: architecture diagrams over README excerpts.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90">
            <a
              href={LINKS.calUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href={LINKS.hobbyProjectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              Hobby Projects <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Filter */}
      <FilterBar active={active} onChange={setActive} />

      {/* Sections */}
      <div className="space-y-14">
        {visibleCategories.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            projects={visibleProjects.filter((p) => p.category === cat.id)}
          />
        ))}
      </div>
    </div>
  );
}
