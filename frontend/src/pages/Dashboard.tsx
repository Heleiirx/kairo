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
    <div className="min-h-screen bg-base text-white p-4 md:p-6 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3 flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-medium mb-1">Welcome back {user?.name}!</h1>
          <p className="text-secondary text-xs md:text-sm">Here you can find a resume of your last days on the app.</p>
        </div>
        <div className="flex gap-2">
          <button className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 mb-3">
        <StatCard percentage={82} label="Time went this week" color="#CDFF9A" />
        <StatCard percentage={69} label="Finished tasks" color="#CDFF9A" />
        <StatCard percentage={92} label="Projects progress" color="#CDFF9A" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
        <div>
          <ProjectList projects={projects} />
        </div>

        <div className="md:col-span-2">
          <WeekTimeChart data={weekTimeData} />
        </div>

        <div className="md:col-span-2">
          <TaskList tasks={tasks} />
        </div>

        <div>
          <HeatmapChart data={heatmapData} />
        </div>

        <div>
          <FocusTimer />
        </div>
      </div>

{/* ---------------------------- */}
{/* DESKTOP LAYOUT (Your layout) */}
{/* ---------------------------- */}
<div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-4 gap-3 content-center">

  {/* Stat Cards inside grid for desktop only */}
  <div className="grid grid-cols-3 col-span-3 gap-3">
    <StatCard percentage={82} label="Time went this week" color="#CDFF9A" />
    <StatCard percentage={69} label="Finished tasks" color="#CDFF9A" />
    <StatCard percentage={92} label="Projects progress" color="#CDFF9A" />
  </div>

  <div className="row-span-2">
    <FocusTimer />
  </div>

  <div className="row-span-3">
    <ProjectList projects={projects} />
  </div>

  <div className="row-span-3">
    <WeekTimeChart data={weekTimeData} />
  </div>

  <div className="row-span-3">
    <TaskList tasks={tasks} />
  </div>

  <div className="row-span-2">
    <HeatmapChart data={heatmapData} />
  </div>
</div>

      
    </div>
  );
}

export default Dashboard;
