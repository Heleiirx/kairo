import { Clock, MoreVertical, Timer } from "lucide-react";
import Checkbox from "../Checkbox";

interface KanbanTask {
  id: string;
  name: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

interface KanbanTaskCardProps {
  task: KanbanTask;
}

export default function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400";
      case "Medium":
        return "text-yellow-400";
      case "Low":
        return "text-green-400";
      default:
        return "text-white/60";
    }
  };

  return (
    <div
      className={`bg-secondary/30 rounded-lg p-3 transition-colors ${
        task.completed ? "opacity-60" : "hover:bg-secondary/40"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2 flex-1">
          <Checkbox
            checked={task.completed}
            onChange={() => {}}
            className="mt-0.5"
          />
          <span
            className={`text-sm text-white ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.name}
          </span>
        </div>
        <button className="p-1 hover:bg-white/10 rounded transition-colors">
          <MoreVertical className="w-3 h-3 text-white/60" />
        </button>
      </div>

      <div className="flex items-center justify-between ml-6">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{task.time}</span>
          </div>
          <span className={`${getPriorityColor(task.priority)}`}>
            • {task.priority}
          </span>
        </div>
        <button className="p-1 bg-white/10 rounded hover:bg-white/20 transition-colors">
          <Timer className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}
