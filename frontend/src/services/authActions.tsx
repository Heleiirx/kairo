// src/routes/auth/authActions.ts
import { redirect } from "react-router-dom";
import api from "../services/api";

// export async function loginAction({ request }: any) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");

//   try {
//     await api.post("/login", { email, password });
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

  console.log("Datos recibidos en signUp:", { email, password });

  // Solo para prueba: devuelve los datos a la vista
  return { email, password, message: "Datos recibidos correctamente (test)" };
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
