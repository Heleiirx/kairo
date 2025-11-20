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
    <div className="bg-primary rounded-lg p-4 min-h-[280px] md:h-[23rem] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <p className="text-xs text-secondary">Statics</p>
          <h3 className="text-white font-medium text-base">My tasks</h3>
        </div>
        <a href="#" className="text-secondary text-xs hover:underline min-h-[44px] flex items-center px-2">
          Ver todo &gt;
        </a>
      </div>
      <div className="space-y-3 overflow-y-auto flex-1">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-2 hover:bg-base/50 rounded transition-colors min-h-[44px]">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={task.completed}
                className="w-5 h-5 md:w-4 md:h-4 rounded border-secondary flex-shrink-0 cursor-pointer"
                readOnly
              />
              <span className={`text-white text-sm break-words ${task.completed ? "line-through opacity-50" : ""}`}>
                {task.name}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-2">
              <Target className="w-4 h-4 md:w-3 md:h-3 text-secondary" />
              <button className="text-secondary hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center -m-2">
                <MoreVertical className="w-4 h-4 md:w-3 md:h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
