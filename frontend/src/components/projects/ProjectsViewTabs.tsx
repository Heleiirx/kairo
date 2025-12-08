import { Plus } from "lucide-react";

interface ProjectsViewTabsProps {
  activeView: "Board" | "Kanban";
  onViewChange: (view: "Board" | "Kanban") => void;
  onNewProject: () => void;
}

export default function ProjectsViewTabs({
  activeView,
  onViewChange,
  onNewProject
}: ProjectsViewTabsProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
      <div className="flex gap-4 md:gap-8 flex-wrap">
        <button
          onClick={() => onViewChange("Board")}
          className={`pb-2 text-base md:text-lg font-medium transition-colors relative ${
            activeView === "Board"
              ? "text-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Board
          {activeView === "Board" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
          )}
        </button>
        <button
          onClick={() => onViewChange("Kanban")}
          className={`pb-2 text-base md:text-lg font-medium transition-colors relative ${
            activeView === "Kanban"
              ? "text-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          Kanban
          {activeView === "Kanban" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
          )}
        </button>
      </div>

      <button
        onClick={onNewProject}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary text-primary px-4 py-2 min-h-[44px] rounded-lg hover:bg-secondary/80 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        New project
      </button>
    </div>
  );
}
