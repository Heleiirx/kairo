# Implementation Plan: Responsive Design

- [x] 1. Set up responsive infrastructure and utilities





  - Create viewport detection hook for determining current breakpoint
  - Create useMediaQuery hook for responsive behavior
  - Update ContainerXL to ensure proper viewport meta tag
  - Add mobile menu state management (context or store)
  - _Requirements: 10.1, 10.2, 10.5_

- [ ]* 1.1 Write property test for viewport detection
  - **Property 4: No horizontal overflow**
  - **Validates: Requirements 1.5, 3.4**

- [ ] 2. Implement responsive navigation (PrivateLayout and SideNavBar)
  - Add hamburger menu button that shows on mobile (< 1024px)
  - Implement slide-out navigation drawer for mobile with overlay backdrop
  - Add close button and click-outside-to-close functionality for mobile drawer
  - Ensure sidebar is persistent on desktop (≥ 1024px)
  - Update navigation item touch targets to meet 44x44px minimum on mobile
  - Add smooth transitions for drawer open/close animations
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 2.1 Write property test for hamburger menu visibility
  - **Property 5: Hamburger menu on mobile**
  - **Validates: Requirements 2.1**

- [ ]* 2.2 Write property test for navigation drawer interaction
  - **Property 6: Navigation drawer interaction**
  - **Validates: Requirements 2.2, 2.3**

- [ ]* 2.3 Write property test for persistent sidebar on desktop
  - **Property 7: Persistent sidebar on desktop**
  - **Validates: Requirements 2.5**

- [ ]* 2.4 Write property test for touch target sizes
  - **Property 2: Touch target minimum size**
  - **Validates: Requirements 1.2, 2.4, 3.5, 6.5, 7.3, 10.5**

- [ ] 3. Implement responsive landing page (PublicLayout and TopNavBar)
  - Update TopNavBar to stack elements on mobile or use compact horizontal layout
  - Ensure logo scales appropriately across viewports
  - Make Sign Up and Log In buttons full-width on mobile with proper touch targets
  - Update theme toggle button to meet touch target requirements
  - Adjust padding and spacing for mobile viewports
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 3.1 Write property test for mobile single-column layout
  - **Property 1: Mobile single-column layout**
  - **Validates: Requirements 1.1, 3.1, 5.1, 6.1, 7.1, 8.1**

- [ ] 4. Implement responsive authentication modal (ModalUserAuth)
  - Update modal to full-width on mobile (< 768px) with appropriate padding
  - Center modal with max-width constraint on tablet/desktop (≥ 768px)
  - Ensure form inputs meet 44px minimum height on mobile
  - Make form buttons full-width on mobile
  - Implement modal scroll lock to prevent body scrolling
  - Add click-outside-to-close functionality
  - _Requirements: 1.4, 9.1, 9.2, 9.3, 9.5_

- [ ]* 4.1 Write property test for modal full-width on mobile
  - **Property 3: Modal full-width on mobile**
  - **Validates: Requirements 1.4, 4.4, 6.3, 9.1**

- [ ]* 4.2 Write property test for modal centering on desktop
  - **Property 19: Modal centering on desktop**
  - **Validates: Requirements 9.2**

- [ ]* 4.3 Write property test for modal scroll lock
  - **Property 20: Modal scroll lock**
  - **Validates: Requirements 9.3**

- [ ]* 4.4 Write property test for click-outside modal close
  - **Property 21: Click-outside modal close**
  - **Validates: Requirements 9.5**

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement responsive Dashboard page
  - Update stats cards grid to: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
  - Stack all dashboard widgets vertically on mobile
  - Implement 2-column layout for widgets on tablet where appropriate
  - Maintain 4-column complex grid on desktop
  - Update FocusTimer controls to meet touch target requirements
  - Ensure charts (WeekTimeChart, HeatmapChart) scale to viewport width
  - Update ProjectList and TaskList for mobile card-based layouts
  - Prevent horizontal overflow on all viewports
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 6.1 Write property test for responsive grid columns
  - **Property 8: Responsive grid columns**
  - **Validates: Requirements 3.2, 4.1, 4.2, 4.3**

- [ ]* 6.2 Write property test for chart viewport fitting
  - **Property 9: Chart viewport fitting**
  - **Validates: Requirements 3.3, 5.4**

- [ ] 7. Implement responsive Projects page (Board view)
  - Update page header (title and description) for mobile font sizes
  - Make view tabs (Board/Kanban) wrap appropriately on mobile
  - Make "New project" button full-width on mobile with proper touch targets
  - Update ProjectsGrid to: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
  - Ensure ProjectCard components adapt to container width
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 8. Implement responsive Projects page (Kanban view)
  - Enable horizontal scrolling for Kanban columns on mobile
  - Set appropriate column width for mobile (280-320px)
  - Add snap scrolling for better mobile UX
  - Ensure KanbanTaskCard components have proper touch targets
  - Maintain readability of column headers and cards on mobile
  - _Requirements: 4.5, 4.6_

- [ ]* 8.1 Write property test for Kanban horizontal scroll
  - **Property 10: Kanban horizontal scroll**
  - **Validates: Requirements 4.6**

- [ ] 9. Implement responsive NewProjectModal
  - Update modal to full-width on mobile
  - Ensure form inputs meet minimum height requirements (44px)
  - Make form buttons full-width on mobile
  - Stack form fields vertically with appropriate spacing
  - _Requirements: 4.4, 9.1_

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement responsive Project Details page
  - Stack project header, actions, and info vertically on mobile
  - Make action buttons (Edit, Delete) full-width on mobile
  - Update project stats grid to: 2 columns (mobile), 4 columns (tablet/desktop)
  - Transform task table to card-based layout on mobile
  - Ensure charts scale to viewport width
  - Implement full-screen task detail modal on mobile
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 11.1 Write property test for table to card transformation
  - **Property 11: Table to card transformation**
  - **Validates: Requirements 5.2, 6.1**

- [ ]* 11.2 Write property test for task detail modal display
  - **Property 12: Task detail modal display**
  - **Validates: Requirements 5.3**

- [ ]* 11.3 Write property test for form input sizing
  - **Property 13: Form input sizing**
  - **Validates: Requirements 5.5, 8.2**

- [ ] 12. Implement responsive Tasks page
  - Update filter controls to wrap or stack on mobile
  - Make "New task" button full-width on mobile
  - Transform TaskTable to card-based layout on mobile (< 768px)
  - Keep table layout on tablet and desktop (≥ 768px)
  - Ensure task checkboxes meet touch target requirements on mobile
  - Display task properties in single-column format within cards
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 12.1 Write property test for filter control wrapping
  - **Property 14: Filter control wrapping**
  - **Validates: Requirements 6.2**

- [ ] 13. Implement responsive NewTaskModal
  - Update modal to full-width on mobile
  - Ensure all form inputs meet minimum height (44px)
  - Make form buttons full-width on mobile
  - Stack form fields with appropriate spacing
  - Ensure dropdowns and selects are touch-friendly
  - _Requirements: 6.3, 9.1_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement responsive Pomodoro page
  - Stack timer, controls, and session indicators vertically on mobile
  - Scale timer display font size appropriately (minimum 48px on mobile)
  - Ensure timer control buttons meet 64x64px size for easy tapping
  - Make session indicators wrap on mobile if needed
  - Adjust layout for landscape orientation on mobile
  - Center all content with appropriate padding
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 15.1 Write property test for timer font scaling
  - **Property 15: Timer font scaling**
  - **Validates: Requirements 7.2**

- [ ]* 15.2 Write property test for landscape orientation adaptation
  - **Property 16: Landscape orientation adaptation**
  - **Validates: Requirements 7.5**

- [ ] 16. Implement responsive Settings page
  - Stack settings sections vertically on mobile
  - Make form inputs full-width with minimum 44px height
  - Ensure adequate spacing between interactive elements (minimum 8px)
  - Organize settings in multi-column layout on tablet/desktop where appropriate
  - Make save/cancel buttons full-width on mobile
  - Ensure feedback messages fit within viewport
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 16.1 Write property test for interactive element spacing
  - **Property 17: Interactive element spacing**
  - **Validates: Requirements 8.3**

- [ ]* 16.2 Write property test for feedback viewport containment
  - **Property 18: Feedback viewport containment**
  - **Validates: Requirements 8.5**

- [ ] 17. Implement responsive ModalXL component
  - Update to full-width on mobile with appropriate padding
  - Center with max-width constraint on tablet/desktop
  - Implement scroll lock when modal is open
  - Ensure modal content scrolls while body remains locked
  - Add click-outside-to-close functionality
  - Handle keyboard visibility on mobile (scroll input into view)
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 18. Update STYLE_GUIDE.md with responsive patterns
  - Document responsive breakpoint usage
  - Add examples of mobile-first component patterns
  - Document touch target size requirements
  - Add grid layout responsive examples
  - Document modal responsive patterns
  - Include testing guidelines for responsive components
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 19. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.
  - Run all property-based tests
  - Verify no horizontal overflow on any page at any viewport
  - Test navigation flow on mobile, tablet, and desktop
  - Verify all modals work correctly across viewports
  - Test form submissions on mobile devices
  - Verify touch targets meet minimum requirements
  - Check that all pages are usable at 320px width (smallest mobile)

- [ ]* 19.1 Manual testing checklist
  - Test on actual iOS device (Safari)
  - Test on actual Android device (Chrome)
  - Test landscape orientation on mobile
  - Test with browser zoom at 200%
  - Verify keyboard navigation works on all viewports
  - Test with screen reader on mobile and desktop
