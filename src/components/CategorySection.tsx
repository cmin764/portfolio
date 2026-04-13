import { ProjectCard } from "@/components/ProjectCard";
import type { CategoryMeta } from "@/data/categories";
import type { ProjectData } from "@/data/types";

interface Props {
  category: CategoryMeta;
  projects: ProjectData[];
}

export function CategorySection({ category, projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{category.label}</h2>
        <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
