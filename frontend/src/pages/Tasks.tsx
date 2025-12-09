import { useState, useMemo, useEffect } from "react";
import { FilterControls } from "../components/tasks/TasksFilterControls";
import { TaskTable } from "../components/tasks/TaskTable";
import NewTaskModal from "../components/tasks/NewTaskModal";
import { TaskSidePeek } from "../components/tasks/TaskSidePeek";
import { updateTask, getTaskById, getTasksByUser } from "../services/tasksActions";
import { useAuthStore } from "../store/authStore";
import { type Task } from "../types/tasksInterfaces";

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidePeekOpen, setIsSidePeekOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedTasks = await getTasksByUser(user.id);
      setTasks(fetchedTasks);
      console.log(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }

  };

    useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    // Optimistic update
    const newStatus = task.status === "completada" ? "pendiente" : "completada";
    setTasks(tasks.map(t => 
      t._id === id ? { ...t, status: newStatus } : t
    ));

    try {
      await updateTask(id, { status: newStatus });
    } catch (error) {
      console.error("Failed to update task:", error);
      // Revert on error
      setTasks(tasks.map(t => 
        t._id === id ? { ...t, status: task.status } : t
      ));
    }

  };

  const handleTaskCreated = () => {
    fetchTasks(); 
    console.log("Task created - refresh would happen here");
  };

  const handleRowClick = async (id: string) => {
    try {
      const taskData = await getTaskById(id);
      setSelectedTask(taskData);
      setTimeout(() => setIsSidePeekOpen(true), 10);
    } catch (error) {
      console.error("Failed to fetch task details:", error);
    }

  };

  const handleCloseSidePeek = () => {
    setIsSidePeekOpen(false);
    setTimeout(() => setSelectedTask(null), 300); 
  };

  // Sort tasks: incomplete first, completed last
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const aCompleted = a.status === "completada";
      const bCompleted = b.status === "completada";
      
      if (aCompleted === bCompleted) return 0;
      return aCompleted ? 1 : -1;
    });
  }, [tasks]);

  return (
    <div className="text-white pt-6 py-4">  
      <div>
        <h1 className="text-xl md:text-2xl font-medium mb-1">Your Tasks</h1>
        <p className="text-secondary text-xs md:text-sm">Here you can manage your tasks</p>
      </div>
      <FilterControls onNewTaskClick={() => setIsModalOpen(true)} />
      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
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
