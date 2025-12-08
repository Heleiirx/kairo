import { createContext, useContext, useState } from "react";
import { type ReactNode } from "react";

// Context to manage authentication modal state
interface AuthModalContextType {
    isOpen: boolean;
    isSignUp: boolean;
    setIsSignUp: (value: boolean) => void;
    openSignUp: () => void;
    openLogin: () => void;
    closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

interface AuthModalProviderProps {
  children: ReactNode;
}

// Provider component to manage authentication modal state
export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const openSignUp = () => {
    console.log("Signup clicked");
    setIsSignUp(true);
    setIsOpen(true);
  };

  const openLogin = () => {
    console.log("Login clicked");
    setIsSignUp(false);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, isSignUp, setIsSignUp, openSignUp, openLogin, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

// Custom hook to use the AuthModalContext
export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within an AuthModalProvider");
  return context;
};
