import { Outlet } from 'react-router-dom';
import SideNavBar from '../ui components/SideNavBar';
import ContainerXL from '../components/ContainerXL';

export default function PrivateLayout() {
  return (
    <ContainerXL>
    <div className="flex">
      <SideNavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
    </ContainerXL>
  );
}
