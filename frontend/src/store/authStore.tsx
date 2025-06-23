import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: { email: string } | null; // ajusta según lo que devuelva tu API
  login: (token: string, user: { email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
