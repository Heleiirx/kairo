/**
 * Example component demonstrating responsive infrastructure usage
 * This file is for reference and can be removed in production
 */

import { useViewport } from '../hooks/useViewport';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useMobileMenu } from '../context/MobileMenuContext';

export default function ResponsiveExample() {
  // Using useViewport hook
  const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useViewport();
  
  // Using useMediaQuery hook
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');
  const isPortrait = useMediaQuery('(orientation: portrait)');
  
  // Using mobile menu context
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Infrastructure Example</h1>
      
      {/* Viewport Information */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Viewport Information</h2>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <p>Breakpoint: {breakpoint}</p>
        <p>Is Mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p>Is Tablet: {isTablet ? 'Yes' : 'No'}</p>
        <p>Is Desktop: {isDesktop ? 'Yes' : 'No'}</p>
      </section>

      {/* Media Query Information */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Media Query Results</h2>
        <p>Is Large Desktop (≥1280px): {isLargeDesktop ? 'Yes' : 'No'}</p>
        <p>Is Portrait: {isPortrait ? 'Yes' : 'No'}</p>
      </section>

      {/* Mobile Menu State */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Mobile Menu State</h2>
        <p>Menu Open: {isOpen ? 'Yes' : 'No'}</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={toggleMenu}
            className="px-4 py-2 bg-accent rounded hover:opacity-80"
          >
            Toggle Menu
          </button>
          <button 
            onClick={closeMenu}
            className="px-4 py-2 bg-secondary rounded hover:opacity-80"
          >
            Close Menu
          </button>
        </div>
      </section>

      {/* Responsive Layout Example */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Responsive Layout Example</h2>
        <div className={`
          grid gap-4
          ${isMobile ? 'grid-cols-1' : ''}
          ${isTablet ? 'grid-cols-2' : ''}
          ${isDesktop ? 'grid-cols-3' : ''}
        `}>
          <div className="p-4 bg-accent rounded">Item 1</div>
          <div className="p-4 bg-accent rounded">Item 2</div>
          <div className="p-4 bg-accent rounded">Item 3</div>
        </div>
      </section>

      {/* Conditional Rendering Example */}
      <section className="p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Conditional Rendering</h2>
        {isMobile && (
          <p className="text-green-500">✓ Mobile-specific content</p>
        )}
        {isTablet && (
          <p className="text-blue-500">✓ Tablet-specific content</p>
        )}
        {isDesktop && (
          <p className="text-purple-500">✓ Desktop-specific content</p>
        )}
      </section>
    </div>
  );
}
