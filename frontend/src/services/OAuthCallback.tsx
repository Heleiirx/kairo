import { useEffect, type JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { OAuthUser } from "../types/userInterfaces";

/**
 * Componente que procesa el callback de autenticación OAuth (Google).
 * Lee el token y el usuario desde los query params,
 * Guarda la sesión y redirige al dashboard.
 */
export default function OAuthCallback(): JSX.Element {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = params.get("token");
    const userParam = params.get("user");

    if (!token || !userParam){
      navigate("/");
      return;
    }

    try {
      const user: OAuthUser = JSON.parse(decodeURIComponent(userParam));

      login(token, user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al parsear los datos del usuario", error);
      navigate("/");
    }

  }, [params, navigate, login]);

  return <p>Procesando autenticación con Google...</p>;
}
