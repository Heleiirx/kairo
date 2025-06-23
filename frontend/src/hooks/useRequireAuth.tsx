// src/components/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { type JSX } from "react";

interface RequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
