import { redirect } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export async function registerAction({ request }: any) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { name, email, password };

  try {
    console.log("URL completa:", api.defaults.baseURL + "auth/register");
    // Send registration data to backend
    const res = await api.post("/auth/register", data, {withCredentials: true});

    // Get and save the data in zustand
    const { token, user } = res.data;
    useAuthStore.getState().login(token, user);

    return redirect("/dashboard");

  } catch (error: any) {
    return {
      error: error || "Error al crear la cuenta",
    };
  }
}

export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { email, password };

  try {
    console.log(data);
    // Send login data to backend
    const res = await api.post("auth/login", { data });

    // Get and save data in zustand
    const { token, user } = res.data;
    useAuthStore.getState().login(token, user);

    return redirect("/dashboard");

  } catch (error: any) {
    return {
      error: error.response?.data?.message || "Credenciales inválidas",
    };
  }
}
