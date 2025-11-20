# Context Providers

This directory contains React context providers for global state management.

## MobileMenuContext

Context for managing mobile navigation menu state across the application.

### Setup

Wrap your application with the `MobileMenuProvider`:

```tsx
import { MobileMenuProvider } from './context/MobileMenuContext';

function App() {
  return (
    <MobileMenuProvider>
      <YourApp />
    </MobileMenuProvider>
  );
}
```

### Usage

Use the `useMobileMenu` hook to access and control the mobile menu:

```tsx
import { useMobileMenu } from './context/MobileMenuContext';

function HamburgerButton() {
  const { isOpen, toggleMenu } = useMobileMenu();
  
  return (
    <button onClick={toggleMenu}>
      {isOpen ? '✕' : '☰'}
    </button>
  );
}

function MobileNav() {
  const { isOpen, closeMenu } = useMobileMenu();
  
  if (!isOpen) return null;
  
  return (
    <nav>
      <button onClick={closeMenu}>Close</button>
      {/* Navigation items */}
    </nav>
  );
}
```

### API

- `isOpen: boolean` - Current state of the mobile menu
- `openMenu: () => void` - Opens the mobile menu
- `closeMenu: () => void` - Closes the mobile menu
- `toggleMenu: () => void` - Toggles the mobile menu state

## AuthModalContext

Context for managing authentication modal state.

### Setup

Wrap your application with the `AuthModalProvider`:

```tsx
import { AuthModalProvider } from './context/AuthModalContext';

function App() {
  return (
    <AuthModalProvider>
      <YourApp />
    </AuthModalProvider>
  );
}
```

### Usage

Use the `useAuthModal` hook to access and control the authentication modal:

```tsx
import { useAuthModal } from './context/AuthModalContext';

function LoginButton() {
  const { openLogin } = useAuthModal();
  
  return (
    <button onClick={openLogin}>
      Log In
    </button>
  );
}

function SignUpButton() {
  const { openSignUp } = useAuthModal();
  
  return (
    <button onClick={openSignUp}>
      Sign Up
    </button>
  );
}

function AuthModal() {
  const { isOpen, isSignUp, closeModal } = useAuthModal();
  
  if (!isOpen) return null;
  
  return (
    <div>
      {isSignUp ? <SignUpForm /> : <LoginForm />}
      <button onClick={closeModal}>Close</button>
    </div>
  );
}
```

### API

- `isOpen: boolean` - Current state of the modal
- `isSignUp: boolean` - Whether the modal is in sign-up mode
- `setIsSignUp: (value: boolean) => void` - Sets the modal mode
- `openSignUp: () => void` - Opens the modal in sign-up mode
- `openLogin: () => void` - Opens the modal in login mode
- `closeModal: () => void` - Closes the modal
