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

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children:[
      { index: true, element: <App /> },
    ]
  },
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {path: 'clock', element: <Clock />},
      {path: 'dashboard', element: <Dashboard />},
      {path: 'proyects', element: <Proyects />},
      {path: 'tasks', element: <Tasks />},
    ]
  },
  {path: "*", element: <NotFoundPage />},
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
