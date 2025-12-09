import { useState, useMemo } from "react";
import ProjectsViewTabs from "../components/projects/ProjectsViewTabs";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import ProjectsFilterSidebar from "../components/projects/ProjectsFilterSidebar";
import KanbanView from "../components/projects/KanbanView";
import NewProjectModal from "../components/projects/NewProjectModal";
import { type ProjectCardDisplay } from "../types/projectInterfaces";
import type { KanbanProject } from "../components/projects/KanbanColumn";
import { sortByCompletion } from "../utils/sortByCompletion";

function Proyects() {
  const [activeView, setActiveView] = useState<"Board" | "Kanban">("Board");
  const [selectedFilter, setSelectedFilter] = useState<string>("All projects");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with actual data from API
  const projects: ProjectCardDisplay[] = [
    {
      id: "1",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-green-400",
      completed: false
    },
    {
      id: "2",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 54,
      color: "bg-secondary",
      completed: false
    },
    {
      id: "3",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 17,
      color: "bg-secondary",
      completed: false
    },
    {
      id: "4",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-red-400",
      completed: false
    },
    {
      id: "5",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 7, total: 7 },
      time: "3:20 hrs",
      progress: 100,
      color: "bg-green-400",
      completed: true
    },
    {
      id: "6",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary",
      completed: false
    },
    {
      id: "7",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 7, total: 7 },
      time: "3:20 hrs",
      progress: 100,
      color: "bg-green-400",
      completed: true
    },
    {
      id: "8",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 3, total: 7 },
      time: "3:20 hrs",
      progress: 82,
      color: "bg-secondary",
      completed: false
    },
    {
      id: "9",
      title: "Titulo del proyecto",
      category: "Categoria",
      tasks: { completed: 7, total: 7 },
      time: "3:20 hrs",
      progress: 100,
      color: "bg-green-400",
      completed: true
    }
  ];

  // Sort projects with incomplete ones first
  const sortedProjects = useMemo(
    () => sortByCompletion(projects),
    [projects]
  );

  // Mock Kanban data
  const kanbanProjects: KanbanProject[] = [
    {
      id: "1",
      name: "Project name",
      category: "Categoria",
      progress: 82,
      color: "bg-green-400",
      tasksCount: 7,
      totalTime: "3:20 hrs",
      tasks: [
        {
          id: "t1",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t2",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t3",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t4",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: true
        }
      ]
    },
    {
      id: "2",
      name: "Project name",
      category: "Categoria",
      progress: 82,
      color: "bg-secondary",
      tasksCount: 7,
      totalTime: "3:20 hrs",
      tasks: [
        {
          id: "t5",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t6",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t7",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t8",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: true
        }
      ]
    },
    {
      id: "3",
      name: "Project name",
      category: "Categoria",
      progress: 82,
      color: "bg-secondary",
      tasksCount: 7,
      totalTime: "3:20 hrs",
      tasks: [
        {
          id: "t9",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t10",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t11",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: false
        },
        {
          id: "t12",
          name: "Task name",
          time: "1:26 hrs",
          priority: "High",
          completed: true
        }
      ]
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
    setIsModalOpen(true);
  };

  const handleProjectCreated = () => {
    // TODO: Refresh projects list from API
    console.log("Project created - refresh would happen here");
  };

  return (
    <div className="w-full min-h-screen bg-base text-white p-4 md:p-6">
      <div className="mb-4 md:mb-8">
        <h1 className="text-xl md:text-2xl font-medium mb-1">Your Projects</h1>
        <p className="text-secondary text-xs md:text-sm">Here you can manage your projects</p>
      </div>

      <ProjectsViewTabs
        activeView={activeView}
        onViewChange={setActiveView}
        onNewProject={handleNewProject}
      />

      {/* Mobile: Filters above content */}
      <div className="lg:hidden mb-4">
        <ProjectsFilterSidebar
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 overflow-hidden">
          {activeView === "Board" && <ProjectsGrid projects={sortedProjects} />}
          {activeView === "Kanban" && <KanbanView projects={kanbanProjects} />}
        </div>

        {/* Desktop: Filters as sidebar */}
        <div className="hidden lg:block">
          <ProjectsFilterSidebar
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>
      </div>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}

export default Proyects;
