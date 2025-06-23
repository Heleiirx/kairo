// src/routes/auth/authActions.ts
import { redirect } from "react-router-dom";
// import api from "../services/api";
import { useAuthStore } from "../store/authStore";

// export async function loginAction({ request }: any) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");

//   try {
//     await api.post("/login", { email, password });
//     authStore.getState().setToken(mockToken);
//     return redirect("/dashboard");
//   } catch (error) {
//     return { error: "Credenciales inválidas" };
//   }
// }

// export async function registerAction({ request }: any) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");

//   try {
//     await api.post("/register", { email, password });
//     useAuthStore.getState().login(token, user);
//     return redirect("/dashboard");
//   } catch (error) {
//     return { error: "Error al crear la cuenta" };
//   }
// }

// src/routes/auth/authActions.ts
export async function registerAction({ request }: any) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  useAuthStore.getState().login(email, password);
  console.log("Datos recibidos en signUp:", { email, password });

  // Solo para prueba: devuelve los datos a la vista
  console.log( email, password,);
  return redirect("/dashboard");
}

// src/routes/auth/authActions.ts
export async function loginAction({ request }: any) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Datos recibidos en loginAction:", { email, password });

  // Solo para prueba: devuelve los datos a la vista
  return { email, password, message: "Datos recibidos correctamente (test)" };
}
