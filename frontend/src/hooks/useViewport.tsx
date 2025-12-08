import { useEffect, useState } from 'react';

/**
 * Viewport breakpoint type based on Tailwind CSS conventions
 * Mobile: < 768px
 * Tablet: 768px - 1023px
 * Desktop: >= 1024px
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface ViewportState {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Determines the current breakpoint based on viewport width
 */
const getBreakpoint = (width: number): Breakpoint => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Hook for detecting current viewport dimensions and breakpoint
 * @returns ViewportState object with width, height, breakpoint, and convenience flags
 */
export function useViewport(): ViewportState {
  const [viewport, setViewport] = useState<ViewportState>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getBreakpoint(width);
      
      return {
        width,
        height,
        breakpoint,
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop',
      };
    }
    
    // Default for SSR
    return {
      width: 1024,
      height: 768,
      breakpoint: 'desktop',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getBreakpoint(width);

      setViewport({
        width,
        height,
        breakpoint,
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop',
      });
    };

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
}
