import React from 'react';

interface FiltersButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const FilterButton: React.FC<FiltersButtonProps> = ({ children, isActive, ...props }) => {
  const activeClass = isActive ? 'bg-secondary text-base' : 'bg-transparent text-white hover:bg-secondary/30';

  return (
    <button
      className={`rounded px-2 py-1 min-h-[35px] transition-colors ${activeClass}`}
      {...props}
    >
      {children}
    </button>
  );
};