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
    <div className="w-full lg:w-64 flex-shrink-0">
      <h3 className="text-lg font-medium mb-4">Filter by</h3>
      {/* Mobile: Horizontal scrolling filter buttons */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors min-h-[44px] snap-start ${
              selectedFilter === filter
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      {/* Desktop: Vertical list */}
      <div className="hidden lg:block space-y-1">
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
