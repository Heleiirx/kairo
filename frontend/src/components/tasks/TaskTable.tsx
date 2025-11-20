import { TaskRow } from "./TaskRow"

interface Task {
  id: number
  name: string
  time: string
  priority: string
  project: string
  category: string
  completed: boolean
}

interface TaskTableProps {
  tasks: Task[]
  onToggleComplete?: (id: number) => void
  onRowClick?: (id: number) => void
}

export function TaskTable({ tasks, onToggleComplete, onRowClick }: TaskTableProps) {
  return (
    <div className="bg-slate-700 rounded-lg overflow-hidden">
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
            key={task.id} 
            task={task} 
            onToggleComplete={onToggleComplete}
            onRowClick={onRowClick}
          />
        ))}
      </div>
    </div>
  )
}