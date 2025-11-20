# Responsive Infrastructure Setup

This document describes the responsive infrastructure utilities created for the Kairo application.

## Overview

The responsive infrastructure provides hooks and context for managing responsive behavior across the application. This implementation follows the requirements outlined in `.kiro/specs/responsive-design/requirements.md`.

## Components Created

### 1. Hooks

#### `useViewport` (`frontend/src/hooks/useViewport.tsx`)

A hook for detecting the current viewport dimensions and breakpoint.

**Features:**
- Returns viewport width and height
- Determines current breakpoint (mobile, tablet, desktop)
- Provides convenience flags: `isMobile`, `isTablet`, `isDesktop`
- Automatically updates on window resize
- SSR-safe with default values

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

**Usage:**
```tsx
const { width, height, breakpoint, isMobile, isTablet, isDesktop } = useViewport();
```

#### `useMediaQuery` (`frontend/src/hooks/useMediaQuery.tsx`)

A hook for responsive behavior based on CSS media queries.

**Features:**
- Accepts any valid CSS media query string
- Returns boolean indicating if the query matches
- Automatically updates when media query match changes
- SSR-safe with default false value

**Usage:**
```tsx
const isMobile = useMediaQuery('(max-width: 767px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

### 2. Context

#### `MobileMenuContext` (`frontend/src/context/MobileMenuContext.tsx`)

A context provider for managing mobile navigation menu state.

**Features:**
- Centralized mobile menu state management
- Provides `isOpen`, `openMenu`, `closeMenu`, `toggleMenu`
- Uses `useCallback` for optimized performance
- Throws error if used outside provider

**Usage:**
```tsx
// Wrap app with provider
<MobileMenuProvider>
  <App />
</MobileMenuProvider>

// Use in components
const { isOpen, toggleMenu } = useMobileMenu();
```

### 3. Viewport Meta Tag

The viewport meta tag is already properly configured in `frontend/index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

This ensures proper scaling on mobile devices and is required for responsive design to work correctly.

### 4. Documentation

- `frontend/src/hooks/README.md` - Documentation for all hooks
- `frontend/src/context/README.md` - Documentation for all context providers
- `frontend/src/examples/ResponsiveExample.tsx` - Example component demonstrating usage

### 5. Index Files

- `frontend/src/hooks/index.ts` - Centralized exports for hooks
- `frontend/src/context/index.ts` - Centralized exports for context providers

## Requirements Validation

This implementation satisfies the following requirements from the spec:

- **Requirement 10.1**: Uses Tailwind CSS breakpoint conventions (sm:, md:, lg:, xl:) consistently
- **Requirement 10.2**: Responsive patterns are documented in README files
- **Requirement 10.5**: Infrastructure supports ensuring interactive elements meet 44x44px minimum touch target size

## Next Steps

The responsive infrastructure is now ready for use in implementing responsive layouts across the application. The next tasks will involve:

1. Implementing responsive navigation (Task 2)
2. Implementing responsive landing page (Task 3)
3. Implementing responsive authentication modal (Task 4)
4. And so on...

## Testing

While no automated tests were created in this task (as there are no test subtasks), the implementation has been verified to:

- Have no TypeScript errors
- Follow the existing code patterns in the project
- Be properly documented with usage examples
- Export all necessary types and functions

## Integration

To integrate the mobile menu context into your application:

1. Import the provider in your main app file:
```tsx
import { MobileMenuProvider } from './context/MobileMenuContext';
```

2. Wrap your app with the provider:
```tsx
<MobileMenuProvider>
  <YourApp />
</MobileMenuProvider>
```

3. Use the hooks in your components:
```tsx
import { useViewport, useMediaQuery } from './hooks';
import { useMobileMenu } from './context';
```

## Notes

- All hooks are SSR-safe with appropriate default values
- The viewport detection uses `window.innerWidth` and `window.innerHeight` for accuracy
- Media queries use the native `window.matchMedia` API for optimal performance
- The mobile menu context uses `useCallback` to prevent unnecessary re-renders
