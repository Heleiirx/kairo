import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';

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
