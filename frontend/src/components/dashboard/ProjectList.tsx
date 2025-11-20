import { FolderIcon } from "lucide-react";

interface Project {
  id: string;
  name: string;
  category: string;
}

interface ProjectListProps {
  projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="bg-primary rounded-lg p-4 h-full flex flex-col overflow-hidden">
      <p className="text-xs text-secondary mb-2">Statics</p>
      <h3 className="text-white font-medium text-base mb-3">My projects</h3>
      <div className="space-y-2 overflow-y-auto flex-1">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-2">
            <FolderIcon className="w-4 h-4 text-secondary flex-shrink-0" />
            <div>
              <p className="text-white text-sm">{project.name}</p>
              <span className="text-xs text-secondary bg-base px-2 py-0.5 rounded">
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
