import { useState, useMemo } from "react";
import { FilterControls } from "../components/tasks/TasksFilterControls";
import { TaskTable } from "../components/tasks/TaskTable";
import NewTaskModal from "../components/tasks/NewTaskModal";
import { TaskSidePeek } from "../components/tasks/TaskSidePeek";
// import { getTasksByProject, updateTask, getTaskById } from "../services/tasksActions";
import { sortByCompletion } from "../utils/sortByCompletion";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidePeekOpen, setIsSidePeekOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [tasks, setTasks] = useState([{
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new feature including API endpoints and usage examples",
    time: "1:26 hrs",
    priority: "alta",
    project: { title: "History" },
    category: "School",
    status: "pendiente",
    dueDate: "2024-12-31",
    assignedTo: {
      name: "John Doe",
      email: "john@example.com"
    },
    createdAt: "2024-11-01",
    updatedAt: "2024-11-15"
  },
  {
    id: "2",
    title: "Fix authentication bug",
    description: "Users are experiencing issues logging in with OAuth providers",
    time: "2:30 hrs",
    priority: "media",
    project: { title: "History" },
    category: "School",
    status: "completada",
    dueDate: "2024-11-20",
    assignedTo: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    createdAt: "2024-10-15",
    updatedAt: "2024-11-10"
  },
  {
    id: "3",
    title: "Design new landing page",
    description: "Create mockups and prototypes for the new marketing landing page",
    time: "4:00 hrs",
    priority: "baja",
    project: { title: "History" },
    category: "School",
    status: "en progreso",
    dueDate: "2024-12-15",
    createdAt: "2024-11-05",
    updatedAt: "2024-11-18"
  },
  {
    id: "4",
    title: "Update dependencies",
    description: "Update all npm packages to their latest stable versions",
    time: "0:45 hrs",
    priority: "media",
    project: { title: "History" },
    category: "School",
    status: "completada",
    dueDate: "2024-11-25",
    createdAt: "2024-11-01",
    updatedAt: "2024-11-12"
  },
  {
    id: "5",
    title: "Implement dark mode",
    description: "Add dark mode support across the entire application with theme toggle",
    time: "3:15 hrs",
    priority: "alta",
    project: { title: "History" },
    category: "School",
    status: "pendiente",
    dueDate: "2024-12-10",
    assignedTo: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    createdAt: "2024-11-08",
    updatedAt: "2024-11-19"
  }
]);
  const [loading] = useState(false);
  
  // TODO: Replace with actual project ID from context/route/props
  const projectId = "YOUR_PROJECT_ID_HERE";

  // Commented out for now - will use mock data
  // const fetchTasks = async () => {
  //   setLoading(true);
  //   try {
  //     const fetchedTasks = await getTasksByProject(projectId);
  //     const mappedTasks = fetchedTasks.map((task: any) => ({
  //       id: task._id,
  //       name: task.title,
  //       time: "0:00 hrs",
  //       priority: task.priority === "alta" ? "High" : task.priority === "media" ? "Medium" : "Low",
  //       project: task.project?.title || "Unknown",
  //       category: "General",
  //       completed: task.status === "completada",
  //     }));
  //     setTasks(mappedTasks);
  //   } catch (error) {
  //     console.error("Failed to fetch tasks:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleToggleComplete = (id: number) => {
    // Optimistic update - no API call for now
    setTasks(tasks.map(t => 
      t.id === id.toString() ? { ...t, status: t.status === "completada" ? "pendiente" : "completada" } : t
    ));

    // TODO: Uncomment when ready to use API
    // const task = tasks.find(t => t.id === id);
    // if (!task) return;
    // try {
    //   await updateTask(id.toString(), {
    //     status: task.status === "completada" ? "pendiente" : "completada"
    //   });
    // } catch (error) {
    //   console.error("Failed to update task:", error);
    //   setTasks(tasks.map(t => 
    //     t.id === id ? { ...t, status: task.status } : t
    //   ));
    // }
  };

  const handleTaskCreated = () => {
    // TODO: Uncomment when ready to use API
    // fetchTasks();
    console.log("Task created - refresh would happen here");
  };

  const handleRowClick = (id: number) => {
    // Use mock data instead of API call
    const taskData = tasks.find(t => t.id === id.toString());
    if (taskData) {
      setSelectedTask(taskData);
      // Small delay to ensure DOM is ready for transition
      setTimeout(() => setIsSidePeekOpen(true), 10);
    }

    // TODO: Uncomment when ready to use API
    // try {
    //   const taskData = await getTaskById(id.toString());
    //   setSelectedTask(taskData);
    //   setTimeout(() => setIsSidePeekOpen(true), 10);
    // } catch (error) {
    //   console.error("Failed to fetch task details:", error);
    // }
  };

  const handleCloseSidePeek = () => {
    setIsSidePeekOpen(false);
    setTimeout(() => setSelectedTask(null), 300); // Clear after animation
  };

  // Map tasks to display format for the table
  const displayTasks = useMemo(() => {
    return tasks.map(task => ({
      id: parseInt(task.id),
      name: task.title,
      time: task.time,
      priority: task.priority === "alta" ? "High" : task.priority === "media" ? "Medium" : "Low",
      project: task.project?.title || "Unknown",
      category: task.category,
      completed: task.status === "completada"
    }));
  }, [tasks]);

  // Sort tasks: incomplete first, completed last
  const sortedTasks = useMemo(() => sortByCompletion(displayTasks), [displayTasks]);

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
        <TaskTable 
          tasks={sortedTasks} 
          onToggleComplete={handleToggleComplete}
          onRowClick={handleRowClick}
        />
      )}
      <TaskSidePeek 
        task={selectedTask}
        isOpen={isSidePeekOpen}
        onClose={handleCloseSidePeek}
      />
    </div>
  )
}

export default Tasks
