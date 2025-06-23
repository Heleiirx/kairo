import { useAuthStore } from "../store/authStore"

function Dashboard() {
  const { user, logout} = useAuthStore();

  return (
    <>  
      <h1>Dashboard</h1>
      <h2>Hola, {user?.email} </h2>
      <button onClick={logout}>Cerrar sesión</button>
    </>
  )
}

export default Dashboard
