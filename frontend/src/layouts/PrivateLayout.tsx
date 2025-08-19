import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/navbar/SideNavBar';
import ContainerXL from '../components/ContainerXL';

export default function PrivateLayout() {
  return (
    <ContainerXL>
    <div className="flex min-h-screen">
      <SideNavBar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
    </ContainerXL>
  );
}
