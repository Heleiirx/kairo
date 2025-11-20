# Design Document: Responsive Design Implementation

## Overview

This design document outlines the approach for implementing responsive design across the Kairo application. The implementation will follow a page-by-page approach, ensuring each page and its components adapt gracefully to mobile (320px-767px), tablet (768px-1023px), and desktop (1024px+) viewports. The design leverages Tailwind CSS's responsive utilities and follows mobile-first principles where appropriate.

The current application has a fixed desktop layout with limited responsive behavior. This implementation will transform the application into a fully responsive experience while maintaining the existing design system defined in STYLE_GUIDE.md.

## Architecture

### Responsive Strategy

The responsive implementation follows these architectural principles:

1. **Mobile-First Approach**: Base styles target mobile viewports, with progressive enhancement for larger screens using Tailwind breakpoints (sm:, md:, lg:, xl:)

2. **Component-Level Responsiveness**: Each component handles its own responsive behavior, making them reusable and maintainable

3. **Layout Adaptation**: Layouts transform based on viewport:
   - Mobile: Single-column, stacked layouts with collapsible navigation
   - Tablet: Two-column grids, persistent or toggleable navigation
   - Desktop: Multi-column grids, persistent sidebar navigation

4. **Touch-First Interactions**: All interactive elements on mobile meet 44x44px minimum touch target size

5. **Content Priority**: Less critical content may be hidden or collapsed on smaller viewports to maintain focus

### Breakpoint System

Following Tailwind CSS conventions:

```
Mobile:  < 640px   (default, no prefix)
sm:      ≥ 640px   (small tablets)
md:      ≥ 768px   (tablets)
lg:      ≥ 1024px  (small desktops)
xl:      ≥ 1280px  (large desktops)
2xl:     ≥ 1536px  (extra large desktops)
```

Primary breakpoints for this implementation:
- **Mobile**: Default (no prefix) - 320px to 767px
- **Tablet**: `md:` prefix - 768px to 1023px  
- **Desktop**: `lg:` prefix - 1024px and above

## Components and Interfaces

### 1. Layout Components

#### 1.1 PrivateLayout

**Current Structure:**
```tsx
<div className="flex min-h-screen">
  <SideNavBar />
  <main className="flex-1 p-6 overflow-auto">
    <Outlet />
  </main>
</div>
```

**Responsive Design:**

- **Mobile**: Hide sidebar by default, show hamburger menu button
- **Tablet**: Optional - show collapsed sidebar or hamburger menu
- **Desktop**: Show full sidebar persistently

**New Structure:**
```tsx
<div className="flex min-h-screen">
  {/* Mobile: Hamburger button */}
  <button className="lg:hidden fixed top-4 left-4 z-50">
    <Menu />
  </button>
  
  {/* Mobile: Overlay sidebar */}
  <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
    <SideNavBar onClose={() => setIsOpen(false)} />
  </div>
  
  {/* Desktop: Persistent sidebar */}
  <div className="hidden lg:block">
    <SideNavBar />
  </div>
  
  <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
    <Outlet />
  </main>
</div>
```

#### 1.2 PublicLayout

**Responsive Design:**

- **Mobile**: Stack logo and auth buttons vertically or use compact horizontal layout
- **Tablet/Desktop**: Horizontal layout with proper spacing

**TopNavBar Adjustments:**
```tsx
<div className="bg-primary w-full h-auto md:h-16 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-0">
  <img src={Logo} className="w-16 md:w-22 mb-4 md:mb-0" />
  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
    <button className="w-full md:w-auto min-h-[44px] px-4 py-2">Sign Up</button>
    <button className="w-full md:w-auto min-h-[44px] px-4 py-2">Log In</button>
    <button className="min-h-[44px] min-w-[44px]">
      <Palette />
    </button>
  </div>
</div>
```

### 2. Navigation Components

#### 2.1 SideNavBar

**Responsive Behavior:**

**Mobile Mode** (< 1024px):
- Render as slide-out drawer from left
- Full-screen overlay with backdrop
- Close button or swipe gesture to dismiss
- Always expanded (no collapsed state)

**Desktop Mode** (≥ 1024px):
- Persistent sidebar
- Collapsible with toggle button
- Maintains current expand/collapse functionality

**Implementation:**
```tsx
interface SideNavBarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SideNavBar({ isMobile, isOpen, onClose }: SideNavBarProps) {
  if (isMobile) {
    return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-6 h-6 text-white" />
        </button>
        {/* Navigation content - always expanded */}
      </div>
    );
  }
  
  // Desktop version - existing implementation
  return (
    <div className={`${isExpanded ? 'w-64' : 'w-18'} ...`}>
      {/* Existing desktop sidebar */}
    </div>
  );
}
```

### 3. Page Components

#### 3.1 Dashboard Page

**Current Layout Issues:**
- Fixed 4-column grid (`grid-cols-4`)
- Fixed heights that don't adapt
- No mobile consideration

**Responsive Grid System:**

```tsx
{/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
  <StatCard />
  <StatCard />
  <StatCard />
  <FocusTimer />
</div>

{/* Main Content Grid */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
  {/* Mobile: Stack all items */}
  {/* Tablet: 2 columns */}
  {/* Desktop: 4 columns with spanning */}
  
  <div className="lg:col-span-1 space-y-3">
    <ProjectList />
    <HeatmapChart />
  </div>
  
  <div className="lg:col-span-1">
    <WeekTimeChart />
  </div>
  
  <div className="lg:col-span-2">
    <TaskList />
  </div>
</div>
```

**Component Adjustments:**

- **StatCard**: Full width on mobile, maintains aspect ratio
- **FocusTimer**: Larger touch targets for start/stop buttons
- **ProjectList**: Scrollable list with proper touch targets
- **HeatmapChart**: Horizontal scroll on mobile if needed, scale down cells
- **WeekTimeChart**: Responsive chart sizing using ResponsiveContainer
- **TaskList**: Card-based layout on mobile instead of list

#### 3.2 Projects Page

**Responsive Grid:**

```tsx
{/* Projects Header */}
<div className="mb-4 md:mb-8">
  <h1 className="text-2xl md:text-4xl font-medium mb-2">Your projects</h1>
  <p className="text-sm md:text-base">...</p>
</div>

{/* View Tabs */}
<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
  <div className="flex gap-4 md:gap-8">
    <button>Board</button>
    <button>Kanban</button>
  </div>
  <button className="w-full md:w-auto min-h-[44px]">
    <Plus /> New project
  </button>
</div>

{/* Projects Grid - Already has responsive classes */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {projects.map(project => <ProjectCard key={project.id} project={project} />)}
</div>
```

**Kanban View:**

```tsx
<div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:snap-none">
  {columns.map(column => (
    <div className="flex-shrink-0 w-80 md:w-72 snap-start">
      <KanbanColumn />
    </div>
  ))}
</div>
```

#### 3.3 Project Details Page

**Responsive Layout:**

```tsx
<div className="space-y-4 md:space-y-6">
  {/* Project Header */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl">Project Name</h1>
      <p className="text-sm">Description</p>
    </div>
    <div className="flex gap-2">
      <button className="flex-1 md:flex-none min-h-[44px]">Edit</button>
      <button className="flex-1 md:flex-none min-h-[44px]">Delete</button>
    </div>
  </div>
  
  {/* Project Stats */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <StatCard />
    <StatCard />
    <StatCard />
    <StatCard />
  </div>
  
  {/* Tasks Section */}
  <div>
    <TaskTable /> {/* Transforms to card layout on mobile */}
  </div>
</div>
```

#### 3.4 Tasks Page

**Mobile Card Layout:**

```tsx
{/* Desktop: Table view */}
<div className="hidden md:block">
  <TaskTable tasks={tasks} />
</div>

{/* Mobile: Card view */}
<div className="md:hidden space-y-3">
  {tasks.map(task => (
    <div key={task.id} className="bg-primary rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium">{task.name}</h3>
        <input type="checkbox" className="w-6 h-6" />
      </div>
      <div className="space-y-1 text-sm text-secondary">
        <p>Time: {task.time}</p>
        <p>Priority: {task.priority}</p>
        <p>Project: {task.project}</p>
      </div>
    </div>
  ))}
</div>
```

**Filter Controls:**

```tsx
<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between py-4 md:py-6 gap-4">
  {/* Filters - wrap on mobile */}
  <div className="flex flex-wrap items-center gap-2 md:gap-4">
    <span className="w-full md:w-auto text-sm md:text-base">Sort by:</span>
    <FilterButton>Last updated</FilterButton>
    <FilterButton>Priority</FilterButton>
    <FilterButton>Project</FilterButton>
    <FilterButton>Category</FilterButton>
  </div>
  
  <button className="w-full md:w-auto min-h-[44px]">
    <Plus /> New task
  </button>
</div>
```

#### 3.5 Pomodoro Page

**Responsive Timer Layout:**

```tsx
<div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
  {/* Timer Display */}
  <div className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 md:mb-12">
    25:00
  </div>
  
  {/* Timer Controls */}
  <div className="flex gap-4 mb-8">
    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full">
      <Play className="w-8 h-8 md:w-10 md:h-10" />
    </button>
    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full">
      <Pause className="w-8 h-8 md:w-10 md:h-10" />
    </button>
    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full">
      <RotateCcw className="w-8 h-8 md:w-10 md:h-10" />
    </button>
  </div>
  
  {/* Session Indicators */}
  <div className="flex gap-2 flex-wrap justify-center">
    {sessions.map((_, i) => (
      <div key={i} className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-secondary" />
    ))}
  </div>
</div>
```

#### 3.6 Settings Page

**Responsive Form Layout:**

```tsx
<div className="max-w-4xl mx-auto">
  <h1 className="text-2xl md:text-3xl mb-6 md:mb-8">Settings</h1>
  
  <div className="space-y-6 md:space-y-8">
    {/* Settings sections */}
    <section className="bg-primary rounded-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl mb-4">Profile</h2>
      <div className="space-y-4">
        <input className="w-full min-h-[44px] px-4" />
        <input className="w-full min-h-[44px] px-4" />
      </div>
    </section>
    
    <section className="bg-primary rounded-lg p-4 md:p-6">
      <h2 className="text-lg md:text-xl mb-4">Preferences</h2>
      {/* Settings controls */}
    </section>
  </div>
</div>
```

### 4. Modal Components

#### 4.1 ModalXL

**Responsive Modal Sizing:**

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
  <div className="w-full max-w-full md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-auto bg-primary rounded-lg">
    {children}
  </div>
</div>
```

#### 4.2 NewTaskModal / NewProjectModal

**Mobile-Optimized Forms:**

```tsx
<div className="p-4 md:p-6 lg:p-8">
  <h2 className="text-xl md:text-2xl mb-4 md:mb-6">New Task</h2>
  
  <form className="space-y-4">
    <input className="w-full min-h-[44px] px-4 text-base" />
    <textarea className="w-full min-h-[88px] px-4 py-3 text-base" />
    <select className="w-full min-h-[44px] px-4 text-base" />
    
    <div className="flex flex-col md:flex-row gap-3 pt-4">
      <button type="submit" className="flex-1 min-h-[44px]">Create</button>
      <button type="button" className="flex-1 min-h-[44px]">Cancel</button>
    </div>
  </form>
</div>
```

#### 4.3 ModalUserAuth

**Responsive Auth Modal:**

```tsx
<div className="w-full md:max-w-md p-6 md:p-8 bg-primary rounded-lg">
  <h2 className="text-2xl md:text-3xl mb-6">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
  
  <form className="space-y-4">
    <FloatingInput className="w-full min-h-[44px]" />
    <FloatingInput className="w-full min-h-[44px]" />
    
    <button type="submit" className="w-full min-h-[44px] text-base">
      {isSignUp ? 'Sign Up' : 'Log In'}
    </button>
    
    <div className="text-center text-sm">
      <button type="button" className="min-h-[44px] px-4">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
      </button>
    </div>
  </form>
</div>
```

## Data Models

No new data models are required for responsive design implementation. The existing data structures remain unchanged. However, some components may need additional props for responsive behavior:

```typescript
// Layout state management
interface LayoutState {
  isMobileMenuOpen: boolean;
  viewport: 'mobile' | 'tablet' | 'desktop';
}

// Component responsive props
interface ResponsiveComponentProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

Before defining the final properties, I've reviewed all testable criteria to eliminate redundancy:

**Redundancies Identified:**
- Multiple properties test "single-column layout on mobile" across different pages (1.1, 3.1, 5.1, 6.1, 7.1, 8.1) - these can be consolidated into one comprehensive property
- Multiple properties test "touch target minimum size" (1.2, 2.4, 3.5, 6.5, 7.3, 10.5) - these can be combined
- Multiple properties test "modal full width on mobile" (1.4, 4.4, 6.3, 9.1) - these can be consolidated
- Multiple properties test grid column counts at different breakpoints (4.1, 4.2, 4.3) - these can be combined into one property about responsive grids
- Properties about chart/element width fitting viewport (3.3, 5.4) can be combined

**Consolidated Properties:**

Property 1: Mobile single-column layout
*For any* page component rendered at mobile viewport width (< 768px), all major content sections should be stacked vertically in a single-column layout
**Validates: Requirements 1.1, 3.1, 5.1, 6.1, 7.1, 8.1**

Property 2: Touch target minimum size
*For any* interactive element (button, link, checkbox, toggle) rendered at mobile viewport width (< 768px), the element should have minimum dimensions of 44x44 pixels
**Validates: Requirements 1.2, 2.4, 3.5, 6.5, 7.3, 10.5**

Property 3: Modal full-width on mobile
*For any* modal component rendered at mobile viewport width (< 768px), the modal should occupy full viewport width minus appropriate padding
**Validates: Requirements 1.4, 4.4, 6.3, 9.1**

Property 4: No horizontal overflow
*For any* page or component rendered at any viewport width, the content width should not exceed the viewport width, preventing horizontal scrolling (except where explicitly intended like Kanban columns)
**Validates: Requirements 1.5, 3.4**

Property 5: Hamburger menu on mobile
*For any* page with navigation rendered at mobile viewport width (< 1024px), the sidebar navigation should be hidden and a hamburger menu icon should be visible
**Validates: Requirements 2.1**

Property 6: Navigation drawer interaction
*For any* mobile viewport, when the hamburger menu is tapped, the navigation drawer should become visible, and when a navigation item is selected, the drawer should close
**Validates: Requirements 2.2, 2.3**

Property 7: Persistent sidebar on desktop
*For any* page with navigation rendered at desktop viewport width (≥ 1024px), the sidebar navigation should be persistently visible
**Validates: Requirements 2.5**

Property 8: Responsive grid columns
*For any* grid layout component, the number of columns should adapt based on viewport: 1 column on mobile (< 768px), 2 columns on tablet (768px-1023px), and 3+ columns on desktop (≥ 1024px)
**Validates: Requirements 3.2, 4.1, 4.2, 4.3**

Property 9: Chart viewport fitting
*For any* chart or graph component, the width should not exceed the viewport width and should scale proportionally
**Validates: Requirements 3.3, 5.4**

Property 10: Kanban horizontal scroll
*For any* Kanban board view on mobile viewport, horizontal scrolling should be enabled for column navigation
**Validates: Requirements 4.6**

Property 11: Table to card transformation
*For any* table component rendered at mobile viewport width (< 768px), the layout should transform from table format to card-based layout
**Validates: Requirements 5.2, 6.1**

Property 12: Task detail modal display
*For any* task item, when tapped on mobile viewport, task details should display in a full-screen modal or expanded card
**Validates: Requirements 5.3**

Property 13: Form input sizing
*For any* form input element rendered at mobile viewport width (< 768px), the input should have minimum height of 44px and full width within its container
**Validates: Requirements 5.5, 8.2**

Property 14: Filter control wrapping
*For any* filter control group on mobile viewport, filter buttons should wrap to multiple lines or stack vertically to prevent horizontal overflow
**Validates: Requirements 6.2**

Property 15: Timer font scaling
*For any* timer display component on mobile viewport, the font size should be large enough to be readable (minimum 48px) without requiring zoom
**Validates: Requirements 7.2**

Property 16: Landscape orientation adaptation
*For any* page rendered in landscape orientation on mobile viewport, the layout should adjust to utilize available horizontal space
**Validates: Requirements 7.5**

Property 17: Interactive element spacing
*For any* group of interactive elements on mobile viewport, the spacing between elements should be at least 8px to prevent accidental taps
**Validates: Requirements 8.3**

Property 18: Feedback viewport containment
*For any* visual feedback element (toast, alert, notification), the element should fit within the viewport without causing overflow
**Validates: Requirements 8.5**

Property 19: Modal centering on desktop
*For any* modal component rendered at tablet or desktop viewport width (≥ 768px), the modal should be centered with a maximum width constraint
**Validates: Requirements 9.2**

Property 20: Modal scroll lock
*For any* open modal, scrolling within the modal content should not cause the body/background to scroll
**Validates: Requirements 9.3**

Property 21: Click-outside modal close
*For any* modal, clicking or tapping outside the modal content area should close the modal
**Validates: Requirements 9.5**

## Error Handling

### Viewport Detection Errors

**Issue**: Browser doesn't support viewport queries or returns incorrect dimensions

**Handling**:
- Provide fallback to default desktop layout
- Use CSS media queries as primary mechanism (more reliable than JavaScript)
- Log warning for debugging purposes

```typescript
const getViewportWidth = (): number => {
  try {
    return window.innerWidth || document.documentElement.clientWidth || 1024;
  } catch (error) {
    console.warn('Viewport detection failed, using default width');
    return 1024; // Default to desktop
  }
};
```

### Touch Event Errors

**Issue**: Touch events not supported or fail to register

**Handling**:
- Ensure all touch interactions have mouse event fallbacks
- Use pointer events where possible for unified handling
- Gracefully degrade to click events

```typescript
const handleInteraction = (e: React.PointerEvent | React.MouseEvent) => {
  e.preventDefault();
  // Handle interaction
};

<button onPointerDown={handleInteraction} onClick={handleInteraction}>
  Action
</button>
```

### Layout Shift Errors

**Issue**: Content shifts unexpectedly during responsive transitions

**Handling**:
- Use CSS transitions for smooth layout changes
- Reserve space for dynamic content with min-height
- Implement skeleton loaders for async content

```css
.responsive-container {
  transition: all 0.3s ease-in-out;
  min-height: 200px;
}
```

### Modal Scroll Lock Errors

**Issue**: Body scroll not properly locked when modal is open

**Handling**:
- Set `overflow: hidden` on body when modal opens
- Restore original overflow value when modal closes
- Handle iOS Safari specific issues with fixed positioning

```typescript
useEffect(() => {
  if (isModalOpen) {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }
}, [isModalOpen]);
```

### Image/Chart Rendering Errors

**Issue**: Charts or images don't scale properly or fail to render at small viewports

**Handling**:
- Use ResponsiveContainer from recharts for all charts
- Implement error boundaries for chart components
- Provide fallback content if rendering fails

```tsx
<ErrorBoundary fallback={<div>Chart unavailable</div>}>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      {/* Chart content */}
    </PieChart>
  </ResponsiveContainer>
</ErrorBoundary>
```

### Keyboard Visibility Errors (Mobile)

**Issue**: Virtual keyboard covers form inputs on mobile

**Handling**:
- Use `scrollIntoView` when input receives focus
- Adjust modal/form positioning when keyboard appears
- Test with different mobile browsers (Safari, Chrome)

```typescript
const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  setTimeout(() => {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300); // Delay for keyboard animation
};
```

## Testing Strategy

### Unit Testing

Unit tests will verify individual component responsive behavior in isolation:

**Component Rendering Tests:**
- Test that components render without errors at different viewport widths
- Verify correct CSS classes are applied based on viewport
- Check that conditional rendering works (e.g., hamburger vs sidebar)

**Example:**
```typescript
describe('SideNavBar', () => {
  it('should render hamburger menu on mobile', () => {
    // Set viewport to mobile width
    global.innerWidth = 375;
    const { getByRole } = render(<SideNavBar isMobile={true} />);
    expect(getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });
  
  it('should render persistent sidebar on desktop', () => {
    global.innerWidth = 1280;
    const { getByRole } = render(<SideNavBar isMobile={false} />);
    expect(getByRole('navigation')).toBeVisible();
  });
});
```

**Interaction Tests:**
- Test touch/click interactions on responsive elements
- Verify modal open/close behavior
- Test navigation drawer slide-out functionality

**Style Tests:**
- Verify computed styles match expected responsive values
- Check element dimensions meet minimum requirements
- Test that layouts don't overflow

### Property-Based Testing

Property-based tests will verify universal responsive properties across many viewport sizes and component states:

**Testing Framework**: We'll use **fast-check** for TypeScript/React property-based testing, configured to run a minimum of 100 iterations per property.

**Generator Strategy:**
- Viewport width generator: random widths from 320px to 2560px
- Component state generator: random combinations of props and data
- Interaction sequence generator: random user interaction flows

**Example Property Test:**
```typescript
import fc from 'fast-check';

describe('Responsive Properties', () => {
  it('Property 2: Touch target minimum size', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }), // Mobile viewport widths
        fc.array(fc.record({ label: fc.string(), onClick: fc.func(fc.constant(undefined)) })), // Button data
        (viewportWidth, buttons) => {
          // Render component at viewport width
          const { container } = render(
            <div style={{ width: viewportWidth }}>
              {buttons.map((btn, i) => (
                <button key={i} onClick={btn.onClick}>{btn.label}</button>
              ))}
            </div>
          );
          
          // Verify all buttons meet minimum size
          const buttonElements = container.querySelectorAll('button');
          buttonElements.forEach(button => {
            const rect = button.getBoundingClientRect();
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

**Property Test Coverage:**
Each correctness property will have a corresponding property-based test:
- Property 1-21: Each will be implemented as a separate test
- Tests will use viewport width generators to test across breakpoints
- Component data generators will create varied test scenarios
- Interaction generators will simulate user behavior

### Visual Regression Testing

While not part of the core testing strategy, visual regression testing can supplement automated tests:

**Tools**: Playwright or Cypress with screenshot comparison
**Approach**: Capture screenshots at key breakpoints (375px, 768px, 1280px) and compare against baselines

### Manual Testing Checklist

Some aspects require manual verification:

- [ ] Test on actual mobile devices (iOS Safari, Android Chrome)
- [ ] Verify touch interactions feel natural
- [ ] Check that text remains readable at all sizes
- [ ] Test with different content lengths (short/long text)
- [ ] Verify landscape orientation on mobile
- [ ] Test with browser zoom at 200%
- [ ] Check accessibility with screen readers
- [ ] Verify keyboard navigation works on all viewports

### Testing Priorities

1. **Critical Path** (Must test thoroughly):
   - Navigation functionality (hamburger menu, drawer)
   - Modal interactions
   - Form inputs and submissions
   - Touch target sizes

2. **High Priority** (Should test):
   - Grid layouts and column counts
   - Chart responsiveness
   - Table to card transformations
   - Overflow prevention

3. **Medium Priority** (Nice to test):
   - Animation smoothness
   - Spacing consistency
   - Font size scaling
   - Visual feedback positioning

## Implementation Notes

### Development Workflow

1. **Mobile-First Development**: Start with mobile styles, then add breakpoint-specific enhancements
2. **Component Isolation**: Test each component in isolation using Storybook or similar tool
3. **Incremental Implementation**: Complete one page at a time, fully tested before moving to next
4. **Browser Testing**: Test in Chrome, Firefox, Safari, and mobile browsers regularly

### Performance Considerations

- **Minimize Re-renders**: Use React.memo for components that don't need frequent updates
- **Lazy Load Images**: Use lazy loading for images and charts on mobile
- **Optimize Bundle Size**: Ensure responsive utilities don't significantly increase bundle size
- **CSS-First Approach**: Prefer CSS media queries over JavaScript for better performance

### Accessibility Considerations

- **Focus Management**: Ensure focus moves appropriately when navigation drawer opens/closes
- **ARIA Labels**: Add appropriate ARIA labels for responsive UI changes
- **Keyboard Navigation**: Ensure all interactions work with keyboard, not just touch/mouse
- **Screen Reader Announcements**: Announce layout changes to screen reader users

### Browser Compatibility

Target browsers:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

Known issues to handle:
- iOS Safari: Fixed positioning with keyboard
- Android Chrome: Viewport height with address bar
- Safari: Flexbox gap property support (use margin fallback)

## References

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Touch Target Size Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [fast-check Documentation](https://fast-check.dev/)
