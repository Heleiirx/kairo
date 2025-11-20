import { useState } from "react";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsViewTabs from "../components/projects/ProjectsViewTabs";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsFilterSidebar from "../components/projects/ProjectsFilterSidebar";
import type { Project } from "../components/projects/ProjectCard";

function Proyects() {
  const [activeView, setActiveView] = useState<"Board" | "Kanban">("Board");
  const [selectedFilter, setSelectedFilter] = useState<string>("All projects");

  // Mock data - replace with actual data from API
  const projects: Project[] = [
    {
      id: "1",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-green-400"
    },
    {
      id: "2",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary"
    },
    {
      id: "3",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary"
    },
    {
      id: "4",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-red-400"
    },
    {
      id: "5",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-red-400"
    },
    {
      id: "6",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary"
    },
    {
      id: "7",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary"
    },
    {
      id: "8",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary"
    },
    {
      id: "9",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 100,
      color: "bg-secondary"
    }
  ];

  const filters = [
    "All projects",
    "School",
    "Work",
    "Certification",
    "Health",
    "Unstarted",
    "On process",
    "Completed"
  ];

  const handleNewProject = () => {
    // TODO: Open new project modal
    console.log("New project clicked");
  };

  return (
    <div className="w-full min-h-screen bg-base text-white p-6">
      <ProjectsHeader />

      <ProjectsViewTabs
        activeView={activeView}
        onViewChange={setActiveView}
        onNewProject={handleNewProject}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          {activeView === "Board" && <ProjectsGrid projects={projects} />}
          {activeView === "Kanban" && (
            <div className="flex items-center justify-center h-64 text-white/50">
              Kanban view - Coming soon
            </div>
          )}
        </div>

        <ProjectsFilterSidebar
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </div>
    </div>
  );
}

export default Proyects;
