import { redirect, type ActionFunctionArgs } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import type { AuthResponse } from "../types/userInterfaces";

/**
 * Action para registrar un nuevo usuario.
 */
export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!name || !email || ! password) return { error: "Todos los campos son obligatorios" };

  const data = { name, email, password };

  try {
    const res = await api.post<AuthResponse>("/auth/register", data);

    // Get and save data in zustand
    const { token, user } = res.data;
    useAuthStore.getState().login(token, user);

    return redirect("/dashboard");

  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    return {
      error: err.response?.data?.message || "Error al crear la cuenta",
    };
  }
}

/**
 * Action para iniciar sesión con email y contraseña.
 */
export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if(!email || !password) return { error: "Email y contraseña son obligatorios" };

  const data = { email, password };

  try {
    const res = await api.post<AuthResponse>("/auth/login", data );

    // Get and save data in zustand
    const { token, user } = res.data;
    useAuthStore.getState().login(token, user);

    return redirect("/dashboard");

  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    return {
      error: err.response?.data?.message || "Credenciales inválidas",
    };
  }
}
