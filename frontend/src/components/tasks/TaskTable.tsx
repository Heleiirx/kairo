import { TaskRow } from "./TaskRow"
import Checkbox from "../Checkbox"
import { PriorityIndicator } from "./PriorityIndicator"
import { type Task } from "../../types/tasksInterfaces"

interface TaskTableProps {
  tasks: Task[]
  onToggleComplete?: (id: string) => void
  onRowClick?: (id: string) => void
}

export function TaskTable({ tasks, onToggleComplete, onRowClick }: TaskTableProps) {
  return (
    <>
      {/* Desktop: Table view */}
      <div className="hidden md:block bg-slate-700 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-primary px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-white font-medium">
            <div className="col-span-4">Name</div>
            <div className="col-span-2">Spend time</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Project</div>
            <div className="col-span-1">Category</div>
            <div className="col-span-1"></div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-slate-600">
          {tasks.map((task) => (
            <TaskRow 
              key={task._id} 
              task={task} 
              onToggleComplete={onToggleComplete}
              onRowClick={onRowClick}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Card view */}
      <div className="md:hidden space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`bg-primary rounded-lg p-4 transition-colors cursor-pointer ${
              task.status === "completada" ? "opacity-60" : "hover:bg-slate-600"
            }`}
            onClick={() => onRowClick?.(task._id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <Checkbox
                  checked={task.status === "completada"}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleComplete?.(task._id);
                  }}
                />
                <h3 className={`font-medium text-white ${task.status === "completada" ? "line-through" : ""}`}>
                  {task.title}
                </h3>
              </div>
            </div>
            <div className="space-y-2 text-sm ml-9">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Time:</span>
                <span className="text-slate-300">{task.time || "0:00 hrs"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Priority:</span>
                <PriorityIndicator priority={task.priority} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Project:</span>
                <span className="text-slate-300">{task.project?.title || "Unknown"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Category:</span>
                <span className="text-slate-300">{task.category || "General"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}