import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Clock from './pages/Clock.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Proyects from './pages/Proyects.tsx';
import Tasks from './pages/Tasks.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateLayout from './layouts/PrivateLayout.tsx';
import PublicLayout from './layouts/PublicLayout.tsx';
import { loginAction, registerAction  } from './services/authActions.tsx';
import RequireAuth from './hooks/useRequireAuth.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children:[
      { index: true, element: <App /> },
      { path: 'signin', element: <App />, action: loginAction },
      { path: 'signup', element: <App />, action: registerAction }
    ]
  },
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        path: 'clock', 
        element:
        <RequireAuth>
          <Clock />
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
