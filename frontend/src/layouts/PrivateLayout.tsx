import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';

export default function PrivateLayout() {
  return (
    <div className="flex">
      <SideNavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
