import { Search, Plus } from "lucide-react";
import { FilterButton } from "./FiltersButton";
import { useState } from "react";

export function FilterControls() {
  const [activeButton, setActiveButton] = useState<string | null>('Last updated');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center space-x-4">
        <span className="text-white font-medium">Sort by:</span>
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
        <button className="p-2 hover:bg-secondary/30 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      <button className="flex items-center justify-center me-6 gap-2 w-fill rounded text-white p-2 hover:bg-secondary/30">
        <Plus className="w-4 h-4" />
        New task
      </button>
    </div>
  )
}