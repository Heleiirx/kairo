import { Search, Plus } from "lucide-react";
import { FilterButton } from "./FiltersButton";
import { useState } from "react";

interface FilterControlsProps {
  onNewTaskClick: () => void;
}

export function FilterControls({ onNewTaskClick }: FilterControlsProps) {
  const [activeButton, setActiveButton] = useState<string | null>('Last updated');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between py-4 md:py-6 gap-4">
      {/* Filters - wrap on mobile */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <span className="w-full md:w-auto text-sm md:text-white text-white font-medium">Sort by:</span>
        <FilterButton
          isActive={activeButton === 'Last updated'}
          onClick={() => handleButtonClick('Last updated')}
        >
          Last updated
        </FilterButton>
        <FilterButton
          isActive={activeButton === 'Priority'}
          onClick={() => handleButtonClick('Priority')}
        >
          Priority
        </FilterButton>
        <FilterButton
          isActive={activeButton === 'Project'}
          onClick={() => handleButtonClick('Project')}
        >
          Project
        </FilterButton>
        <FilterButton
          isActive={activeButton === 'Category'}
          onClick={() => handleButtonClick('Category')}
        >
          Category
        </FilterButton>
        <div className="relative flex items-center">
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchOpen ? 'w-64 opacity-100 mr-2' : 'w-0 opacity-0'
            }`}
          >
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-secondary transition-colors"
              autoFocus={isSearchOpen}
            />
          </div>
          <button 
            onClick={toggleSearch}
            className="p-2 hover:bg-secondary/30 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* New task button - full width on mobile */}
      <button
        onClick={onNewTaskClick}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary text-primary px-4 py-2 min-h-[44px] rounded-lg hover:bg-secondary/80 transition-colors font-medium"
      >
        <Plus className="w-5 h-5" />
        New task
      </button>
    </div>
  )
}