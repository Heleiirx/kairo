import { useAuthStore } from "../store/authStore";
import StatCard from "../components/dashboard/StatCard";
import ProjectList from "../components/dashboard/ProjectList";
import WeekTimeChart from "../components/dashboard/WeekTimeChart";
import HeatmapChart from "../components/dashboard/HeatmapChart";
import FocusTimer from "../components/dashboard/FocusTimer";
import TaskList from "../components/dashboard/TaskList";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Dashboard() {
  const user = useAuthStore((state) => state.user);

  // Mock data
  const projects = [
    { id: "1", name: "Project name", category: "Category" },
    { id: "2", name: "Project name", category: "Category" },
    { id: "3", name: "Project name", category: "Category" },
  ];

  const weekTimeData = [
    { name: "Category", value: 24, color: "#FF9AA2" },
    { name: "Category", value: 26, color: "#FFD700" },
    { name: "Category", value: 39, color: "#E0B0FF" },
    { name: "Category", value: 11, color: "#CDFF9A" },
  ];

  const heatmapData = Array.from({ length: 20 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 8))
  );

  const tasks = [
    { id: "1", name: "Task name", completed: false },
    { id: "2", name: "Task name", completed: false },
    { id: "3", name: "Task name", completed: false },
    { id: "4", name: "Task name", completed: false },
    { id: "5", name: "Task name", completed: false },
    { id: "6", name: "Task name", completed: true },
  ];

  return (
    <div className="min-h-screen bg-base text-white p-4 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-medium mb-1">Welcome back {user?.name}!</h1>
          <p className="text-secondary text-sm">Here you can find a resume of your last days on the app.</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        <StatCard percentage={82} label="Time went this week" color="#CDFF9A" />
        <StatCard percentage={69} label="Finished tasks" color="#CDFF9A" />
        <StatCard percentage={92} label="Projects progress" color="#CDFF9A" />
        <FocusTimer />
      </div>

      {/* Main Grid - Fixed heights for better proportions */}
      <div className="grid grid-cols-4 gap-3">
        {/* Left column - Projects and Heatmap */}
        <div className="flex flex-col gap-3">
          <div className="h-80">
            <ProjectList projects={projects} />
          </div>
          <div className="h-64">
            <HeatmapChart data={heatmapData} />
          </div>
        </div>
        
        {/* Middle column - Week Time Chart (tall and slim) */}
        <div className="h-[41rem]">
          <WeekTimeChart data={weekTimeData} />
        </div>
        
        {/* Right columns - Task List (tall and wider) */}
        <div className="col-span-2 h-[41rem]">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
