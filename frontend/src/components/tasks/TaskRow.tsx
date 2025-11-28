import { Clock, MoreHorizontal } from "lucide-react"
import Checkbox from "../Checkbox"
import { PriorityIndicator } from "./PriorityIndicator"
import { type Task } from "../../types/tasksInterfaces"

interface TaskRowProps {
  task: Task
  onToggleComplete?: (id: string) => void
  onRowClick?: (id: string) => void
}

export function TaskRow({ task, onToggleComplete, onRowClick }: TaskRowProps) {
  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox or action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="checkbox"]')) {
      return;
    }
    onRowClick?.(task._id);
  };

  return (
    <div 
      className={`px-6 py-4 transition-colors cursor-pointer ${task.status === "completada" ? "opacity-60 bg-slate-700/50" : "hover:bg-slate-600"}`}
      onClick={handleRowClick}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 flex items-center space-x-3">
          <Checkbox
            checked={task.status === "completada"}
            onChange={() => onToggleComplete?.(task._id)}
            className="border-slate-400 data-[state=checked]:bg-slate-500 data-[state=checked]:border-slate-500"
          />
          <span className={`text-white ${task.status === "completada" ? "line-through" : ""}`}>{task.title}</span>
        </div>
        <div className="col-span-2 text-slate-300">{task.time || "0:00 hrs"}</div>
        <div className="col-span-2">
          <PriorityIndicator priority={task.priority} />
        </div>
        <div className="col-span-2 text-slate-300">{task.project?.title}</div>
        <div className="col-span-1 text-slate-300">{task.category || "General"}</div>
        <div className="col-span-1 flex items-center justify-end space-x-2">
          <button className="p-1 hover:bg-slate-500 rounded transition-colors">
            <Clock className="w-4 h-4 text-slate-400" />
          </button>
          <button className="p-1 hover:bg-slate-500 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
