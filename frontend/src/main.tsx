import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx';
import Proyects from './pages/Proyects.tsx';
import ProjectDetails from './pages/ProjectDetails.tsx';
import Tasks from './pages/Tasks.tsx';
import Pomodoro from './pages/Pomodoro.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateLayout from './layouts/PrivateLayout.tsx';
import PublicLayout from './layouts/PublicLayout.tsx';
import { loginAction, registerAction  } from './services/authActions.tsx';
import RequireAuth from './hooks/useRequireAuth.tsx';
import OAuthCallback from './services/OAuthCallback.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children:[
      { index: true, element: <App /> },
      { path: 'signin', element: <App />, action: loginAction },
      { path: 'signup', element: <App />, action: registerAction },
      { path: "/oauth/callback", element: <OAuthCallback /> }
    ]
  },
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: 'pomodoro', 
        element:
        <RequireAuth>
          <Pomodoro />
        </RequireAuth>
      }, 
      {
        path: 'dashboard', 
        element:
        <RequireAuth>
          <Dashboard />
        </RequireAuth> 
      },
      {
        path: 'proyects', 
        element: 
        <RequireAuth>
          <Proyects />
        </RequireAuth>
      },
      {
        path: 'proyects/:id', 
        element: 
        <RequireAuth>
          <ProjectDetails />
        </RequireAuth>
      },
      {
        path: 'tasks', 
        element: 
        <RequireAuth>
          <Tasks />
        </RequireAuth>
      },
  
    ]
  },
  {path: "*", element: <NotFoundPage />},
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
