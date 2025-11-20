interface ProjectsFilterSidebarProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectsFilterSidebar({
  filters,
  selectedFilter,
  onFilterChange
}: ProjectsFilterSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <h3 className="text-lg font-medium mb-4">All projects</h3>
      <div className="space-y-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === filter
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
