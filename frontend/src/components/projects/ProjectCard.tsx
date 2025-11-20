import { Maximize2, MoreVertical, Timer } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  tasks: {
    completed: number;
    total: number;
  };
  time: string;
  progress: number;
  color: string;
  completed: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={`bg-primary rounded-lg p-4 transition-colors ${
        project.completed
          ? "opacity-60 bg-primary/50"
          : "hover:bg-primary/80"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
          {project.category}
        </span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <Maximize2 className="w-4 h-4 text-white/60" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors">
            <MoreVertical className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        className={`text-lg font-medium mb-3 ${
          project.completed ? "line-through" : ""
        }`}
      >
        {project.title}
      </h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${project.color} transition-all duration-300`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs text-white/60 mt-1 inline-block">
          {project.progress}%
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-white/60">
            Tasks:{" "}
            <span className="text-white">
              {project.tasks.completed}/{project.tasks.total}
            </span>
          </div>
          <div className="text-sm text-white/60">
            Time: <span className="text-white">{project.time}</span>
          </div>
        </div>
        <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          <Timer className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
