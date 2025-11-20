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
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-8">
        <button
          onClick={() => onViewChange("Board")}
          className={`pb-2 text-lg font-medium transition-colors relative ${
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
          className={`pb-2 text-lg font-medium transition-colors relative ${
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
        className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        New project
      </button>
    </div>
  );
}
