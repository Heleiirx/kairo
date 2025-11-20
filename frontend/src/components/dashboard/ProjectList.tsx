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
    <div className="bg-primary rounded-lg p-4 min-h-[280px] md:h-80 flex flex-col overflow-hidden">
      <p className="text-xs text-secondary mb-2">Statics</p>
      <h3 className="text-white font-medium text-base mb-3">My projects</h3>
      <div className="space-y-3 overflow-y-auto flex-1">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start gap-3 p-2 hover:bg-base/50 rounded transition-colors cursor-pointer min-h-[44px]">
            <FolderIcon className="w-5 h-5 md:w-4 md:h-4 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm break-words">{project.name}</p>
              <span className="inline-block text-xs text-secondary bg-base px-2 py-1 rounded mt-1">
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
