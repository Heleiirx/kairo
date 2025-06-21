import { Outlet } from 'react-router-dom';
import TopNavBar from '../ui components/TopNavBar';

export default function PublicLayout() {
  return (
    <>
      <TopNavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
