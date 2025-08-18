import { Clock, MoreHorizontal } from "lucide-react"
import Checkbox from "../Checkbox"
import { PriorityIndicator } from "./PriorityIndicator"

interface Task {
  id: number
  name: string
  time: string
  priority: string
  project: string
  category: string
  completed: boolean
}

interface TaskRowProps {
  task: Task
  onToggleComplete?: (id: number) => void
}

export function TaskRow({ task, onToggleComplete }: TaskRowProps) {
  return (
    <div className={`px-6 py-4 hover:bg-slate-600 transition-colors ${task.completed ? "opacity-50" : ""}`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 flex items-center space-x-3">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete?.(task.id)}
            className="border-slate-400 data-[state=checked]:bg-slate-500 data-[state=checked]:border-slate-500"
          />
          <span className={`text-white ${task.completed ? "line-through" : ""}`}>{task.name}</span>
        </div>
        <div className="col-span-2 text-slate-300">{task.time}</div>
        <div className="col-span-2">
          <PriorityIndicator priority={task.priority} />
        </div>
        <div className="col-span-2 text-slate-300">{task.project}</div>
        <div className="col-span-1 text-slate-300">{task.category}</div>
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
