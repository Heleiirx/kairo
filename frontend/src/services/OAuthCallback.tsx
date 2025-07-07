import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { type JSX } from "react";

export default function OAuthCallback(): JSX.Element {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = params.get("token");
    const userParam = params.get("user");

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        login(token, user);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al parsear los datos del usuario:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [params, navigate, login]);

  return <p>Procesando autenticación con Google...</p>;
}
