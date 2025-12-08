# Responsive Hooks

This directory contains custom hooks for responsive design implementation.

## useViewport

Hook for detecting current viewport dimensions and breakpoint.

### Usage

```tsx
import { useViewport } from './hooks/useViewport';

function MyComponent() {
  const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useViewport();
  
  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Viewport: {width}x{height}</p>
      {isMobile && <p>Mobile view</p>}
      {isTablet && <p>Tablet view</p>}
      {isDesktop && <p>Desktop view</p>}
    </div>
  );
}
```

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: >= 1024px

## useMediaQuery

Hook for responsive behavior based on CSS media queries.

### Usage

```tsx
import { useMediaQuery } from './hooks/useMediaQuery';

function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
```

### Common Media Queries

```tsx
// Tailwind breakpoints
const isSm = useMediaQuery('(min-width: 640px)');
const isMd = useMediaQuery('(min-width: 768px)');
const isLg = useMediaQuery('(min-width: 1024px)');
const isXl = useMediaQuery('(min-width: 1280px)');
const is2Xl = useMediaQuery('(min-width: 1536px)');

// Orientation
const isPortrait = useMediaQuery('(orientation: portrait)');
const isLandscape = useMediaQuery('(orientation: landscape)');

// User preferences
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

## useDarkMode

Hook for managing dark mode theme.

### Usage

```tsx
import { useDarkMode } from './hooks/useDarkMode';

function ThemeToggle() {
  const [isDarkMode, toggleTheme] = useDarkMode();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
}
```
