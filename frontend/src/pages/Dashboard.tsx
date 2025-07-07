import { useAuthStore } from "../store/authStore"

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <>  
      <h1>Dashboard</h1>
      <h2>Hola, {user?.name} </h2>
      <button onClick={logout}>Cerrar sesión</button>
    </>
  )
}

export default Dashboard
