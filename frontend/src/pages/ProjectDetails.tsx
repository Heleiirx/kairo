import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Flag, Users, Edit2, Trash2 } from "lucide-react";
import { TaskTable } from "../components/tasks/TaskTable";
import { TaskSidePeek } from "../components/tasks/TaskSidePeek";
import NewTaskModal from "../components/tasks/NewTaskModal";
import { sortByCompletion } from "../utils/sortByCompletion";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSidePeekOpen, setIsSidePeekOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // Mock project data - replace with API call
  const project = {
    _id: id,
    title: "Web Development Project",
    category: "Work",
    description: "Complete redesign of the company website with modern UI/UX principles and responsive design",
    status: "en progreso",
    priority: "alta",
    progress: 65,
    taskCount: 8,
    timeSpent: 24.5,
    startDate: "2024-11-01",
    endDate: "2024-12-31",
    assignedUsers: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" }
    ],
    createdAt: "2024-10-25",
    updatedAt: "2024-11-20"
  };

  // Mock tasks data - replace with API call
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Design homepage mockup",
      description: "Create high-fidelity mockups for the new homepage",
      time: "3:20 hrs",
      priority: "alta",
      project: { title: project.title },
      category: project.category,
      status: "completada",
      dueDate: "2024-11-15",
      createdAt: "2024-11-01",
      updatedAt: "2024-11-14"
    },
    {
      id: "2",
      title: "Implement navigation component",
      description: "Build responsive navigation with mobile menu",
      time: "2:45 hrs",
      priority: "alta",
      project: { title: project.title },
      category: project.category,
      status: "en progreso",
      dueDate: "2024-11-25",
      createdAt: "2024-11-10",
      updatedAt: "2024-11-20"
    },
    {
      id: "3",
      title: "Setup project repository",
      description: "Initialize Git repository and configure CI/CD",
      time: "1:30 hrs",
      priority: "media",
      project: { title: project.title },
      category: project.category,
      status: "completada",
      dueDate: "2024-11-05",
      createdAt: "2024-11-01",
      updatedAt: "2024-11-04"
    },
    {
      id: "4",
      title: "Create component library",
      description: "Build reusable UI components with Tailwind",
      time: "5:15 hrs",
      priority: "media",
      project: { title: project.title },
      category: project.category,
      status: "pendiente",
      dueDate: "2024-12-01",
      createdAt: "2024-11-15",
      updatedAt: "2024-11-18"
    }
  ]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendiente": return "Pending";
      case "en progreso": return "In Progress";
      case "completado": return "Completed";
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "alta": return "High";
      case "media": return "Medium";
      case "baja": return "Low";
      default: return priority;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "text-red-400";
      case "media": return "text-yellow-400";
      case "baja": return "text-green-400";
      default: return "text-white/60";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado": return "bg-green-500/20 text-green-400";
      case "en progreso": return "bg-blue-500/20 text-blue-400";
      case "pendiente": return "bg-slate-600 text-slate-300";
      default: return "bg-slate-600 text-slate-300";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(tasks.map(t =>
      t.id === taskId.toString()
        ? { ...t, status: t.status === "completada" ? "pendiente" : "completada" }
        : t
    ));
  };

  const handleRowClick = (taskId: number) => {
    const taskData = tasks.find(t => t.id === taskId.toString());
    if (taskData) {
      setSelectedTask(taskData);
      setTimeout(() => setIsSidePeekOpen(true), 10);
    }
  };

  const handleCloseSidePeek = () => {
    setIsSidePeekOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  };

  const handleTaskCreated = () => {
    console.log("Task created - refresh would happen here");
  };

  // Map tasks to display format
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

  const sortedTasks = useMemo(() => sortByCompletion(displayTasks), [displayTasks]);

  return (
    <div className="w-full min-h-screen bg-base text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/proyects")}
        className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Projects</span>
      </button>

      {/* Project Header */}
      <div className="bg-primary rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-medium">{project.title}</h1>
              <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                {project.category}
              </span>
            </div>
            <p className="text-white/70 text-base">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded transition-colors">
              <Edit2 className="w-5 h-5 text-white/60" />
            </button>
            <button className="p-2 hover:bg-red-500/20 rounded transition-colors">
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">Progress</span>
            <span className="text-white font-medium">{project.progress}%</span>
          </div>
          <div className="flex h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="bg-secondary transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
            <div
              className="bg-white/20"
              style={{ width: `${100 - project.progress}%` }}
            />
          </div>
        </div>

        {/* Project Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Flag className="w-4 h-4" />
              <span className="text-sm">Status</span>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${getStatusColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </span>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Flag className="w-4 h-4" />
              <span className="text-sm">Priority</span>
            </div>
            <span className={`font-medium ${getPriorityColor(project.priority)}`}>
              {getPriorityLabel(project.priority)}
            </span>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time Spent</span>
            </div>
            <span className="text-white font-medium">{project.timeSpent} hrs</span>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Tasks</span>
            </div>
            <span className="text-white font-medium">{project.taskCount} tasks</span>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-sm text-white/60">Start Date</span>
            <p className="text-white">{formatDate(project.startDate)}</p>
          </div>
          <div>
            <span className="text-sm text-white/60">End Date</span>
            <p className="text-white">{formatDate(project.endDate)}</p>
          </div>
        </div>

        {/* Assigned Users */}
        {project.assignedUsers.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-white/60 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Assigned Team</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.assignedUsers.map((user, index) => (
                <div key={index} className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium">{user.name}</p>
                  <p className="text-white/60 text-xs">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium">Project Tasks</h2>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            + New Task
          </button>
        </div>

        <TaskTable
          tasks={sortedTasks}
          onToggleComplete={handleToggleComplete}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Modals */}
      <NewTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        projectId={id || ""}
        onTaskCreated={handleTaskCreated}
      />

      <TaskSidePeek
        task={selectedTask}
        isOpen={isSidePeekOpen}
        onClose={handleCloseSidePeek}
      />
    </div>
  );
}

export default ProjectDetails;
