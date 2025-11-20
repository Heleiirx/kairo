import { MoreVertical, Target } from "lucide-react";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="bg-primary rounded-lg p-4 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div>
          <p className="text-xs text-secondary">Statics</p>
          <h3 className="text-white font-medium text-base">My tasks</h3>
        </div>
        <a href="#" className="text-secondary text-xs hover:underline">
          Ver todo &gt;
        </a>
      </div>
      <div className="space-y-2 overflow-y-auto flex-1">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                className="w-3 h-3 rounded border-secondary"
                readOnly
              />
              <span className={`text-white text-sm ${task.completed ? "line-through opacity-50" : ""}`}>
                {task.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-secondary" />
              <button className="text-secondary hover:text-white">
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
