import { useState } from "react";
import { FilterControls } from "../components/tasks/TasksFilterControls";
import { TaskTable } from "../components/tasks/TaskTable";
import NewTaskModal from "../components/tasks/NewTaskModal";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="text-white pt-6 py-4">  
      <div>
        <h1 className="text-3xl font-medium">Your Tasks</h1>
        <p className="text-white text-base">Here you can manage your tasks</p>
      </div>
      <FilterControls onNewTaskClick={() => setIsModalOpen(true)} />
      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TaskTable tasks={[{
      id: 1,
      name: "Lorem ipsum jmoso",
      time: "1:26 hrs",
      priority: "High",
      project: "History",
      category: "School",
      completed: false,
    },
    {
      id: 2,
      name: "Lorem ipsum jmoso",
      time: "1:26 hrs",
      priority: "Medium",
      project: "History",
      category: "School",
      completed: false,
    },]} />
    </div>
  )
}

export default Tasks
