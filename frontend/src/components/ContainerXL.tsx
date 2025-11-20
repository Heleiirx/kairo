import type { ReactNode } from 'react';

interface ContainerXLProps {
  children: ReactNode;
  className?: string;
}

export default function ContainerXL({ children, className = '' }: ContainerXLProps) {
  return (
    <div className={`w-full bg-base text-white dark:bg-base dark:text-white min-h-lvh ${className}`}>
      {children}
    </div>
  );
}
