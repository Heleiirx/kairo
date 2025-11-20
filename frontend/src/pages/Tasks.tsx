import { useState, useEffect, useMemo } from "react";
import { FilterControls } from "../components/tasks/TasksFilterControls";
import { TaskTable } from "../components/tasks/TaskTable";
import NewTaskModal from "../components/tasks/NewTaskModal";
import { getTasksByProject, updateTask } from "../services/tasksActions";
import { sortByCompletion } from "../utils/sortByCompletion";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([{
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
    name: "Lorem ipsum jmoso hola",
    time: "1:26 hrs",
    priority: "Medium",
    project: "History",
    category: "School",
    completed: true,
  },
  {
    id: 3,
    name: "Lorem ipsum jmoso",
    time: "1:26 hrs",
    priority: "Medium",
    project: "History",
    category: "School",
    completed: false,
  },
  {
    id: 4,
    name: "Lorem ipsum jmoso completa",
    time: "1:26 hrs",
    priority: "Medium",
    project: "History",
    category: "School",
    completed: true,
  },
  {
    id: 5,
    name: "Lorem ipsum jmoso",
    time: "1:26 hrs",
    priority: "Medium",
    project: "History",
    category: "School",
    completed: false,
  }
]);
  const [loading, setLoading] = useState(false);
  
  // TODO: Replace with actual project ID from context/route/props
  const projectId = "YOUR_PROJECT_ID_HERE";

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasksByProject(projectId);
      // Map backend data to frontend format
      const mappedTasks = fetchedTasks.map((task: any) => ({
        id: task._id,
        name: task.title,
        time: "0:00 hrs", // TODO: Calculate from task data
        priority: task.priority === "alta" ? "High" : task.priority === "media" ? "Medium" : "Low",
        project: task.project?.title || "Unknown",
        category: "General", // TODO: Add category to backend
        completed: task.status === "completada",
      }));
      setTasks(mappedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistic update
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

    try {
      await updateTask(id.toString(), {
        status: task.completed ? "pendiente" : "completada"
      });
    } catch (error) {
      console.error("Failed to update task:", error);
      // Revert on error
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, completed: task.completed } : t
      ));
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  // Sort tasks: incomplete first, completed last
  const sortedTasks = useMemo(() => sortByCompletion(tasks), [tasks]);

  return (
    <div className="text-white pt-6 py-4">  
      <div>
        <h1 className="text-3xl font-medium">Your Tasks</h1>
        <p className="text-white text-base">Here you can manage your tasks</p>
      </div>
      <FilterControls onNewTaskClick={() => setIsModalOpen(true)} />
      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projectId={projectId}
        onTaskCreated={handleTaskCreated}
      />
      {loading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : (
        <TaskTable tasks={sortedTasks} onToggleComplete={handleToggleComplete} />
      )}
    </div>
  )
}

export default Tasks
