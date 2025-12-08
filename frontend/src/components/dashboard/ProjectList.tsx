import { FolderIcon } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="bg-primary rounded-lg p-4 min-h-[280px] md:h-92 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <p className="text-xs text-secondary">Statics</p>
          <h3 className="text-white font-medium text-base">My projects</h3>
        </div>
        <Link to="/proyects" className="text-secondary text-xs hover:underline min-h-[44px] flex items-center px-2">
          Ver todo &gt;
        </Link>
      </div>
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
