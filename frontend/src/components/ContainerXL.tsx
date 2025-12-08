import type { ReactNode } from 'react';

interface ContainerXLProps {
  children: ReactNode;
  className?: string;
}

/**
 * ContainerXL component - Main container for application content
 * 
 * Note: Responsive design requires proper viewport meta tag in index.html:
 * <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 * This ensures proper scaling on mobile devices.
 */
export default function ContainerXL({ children, className = '' }: ContainerXLProps) {
  return (
    <div className={`w-full bg-base text-white dark:bg-base dark:text-white min-h-lvh ${className}`}>
      {children}
    </div>
  );
}
