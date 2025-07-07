import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";
import type { PersistOptions } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
  } | null;
  login: (token: string, user: {
    id: string;
    name: string;
    lastname: string;
    email: string;
  }) => void;
  logout: () => void;
}

const STORAGE_KEY = 'auth-storage';

type AuthStore = AuthState;
type AuthPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>
) => StateCreator<AuthStore>;

// Crear el store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token: string, user: AuthState['user']) => set({ token, user }),
      logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Verificar si hay datos en el storage
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (!storedData || (state?.token === null && state?.user === null)) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  )
);
