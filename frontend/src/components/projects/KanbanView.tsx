import KanbanColumn, { type KanbanProject } from "./KanbanColumn";

interface KanbanViewProps {
  projects: KanbanProject[];
}

export default function KanbanView({ projects }: KanbanViewProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:snap-none">
      {projects.map((project) => (
        <KanbanColumn key={project.id} project={project} />
      ))}
    </div>
  );
}
