import { Plus, Maximize2, MoreVertical, Edit2 } from "lucide-react";
import KanbanTaskCard from "./KanbanTaskCard";

export interface KanbanTask {
  id: string;
  name: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export interface KanbanProject {
  id: string;
  name: string;
  category: string;
  progress: number;
  color: string;
  tasksCount: number;
  totalTime: string;
  tasks: KanbanTask[];
}

interface KanbanColumnProps {
  project: KanbanProject;
}

export default function KanbanColumn({ project }: KanbanColumnProps) {
  return (
    <div className="bg-primary rounded-lg p-4 min-w-[280px] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
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

      {/* Project Name */}
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-medium text-white">{project.name}</h3>
        <button className="p-1 hover:bg-white/10 rounded transition-colors">
          <Edit2 className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`${project.color} transition-all duration-300`}
            style={{ width: `${project.progress}%` }}
          />
          <div
            className="bg-white/20"
            style={{ width: `${100 - project.progress}%` }}
          />
        </div>
        <span className="text-xs text-white/60 mt-1 inline-block">
          {project.progress}%
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-3 text-xs text-white/80">
        <span>Tasks {project.tasksCount}</span>
        <span>Time {project.totalTime}</span>
        <button className="ml-auto flex items-center gap-1 px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition-colors">
          <Plus className="w-3 h-3" />
          Add task
        </button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {project.tasks.map((task) => (
          <KanbanTaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
