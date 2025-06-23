import { Outlet } from 'react-router-dom';
import TopNavBar from '../ui components/TopNavBar';
import ModalUserAuth from '../ui components/ModalUserAuth';
import { AuthModalProvider } from '../context/AuthModalContext';

export default function PublicLayout() {

  return (
    <AuthModalProvider>
      <TopNavBar />
      <main>
        <Outlet />
      </main>
      <ModalUserAuth />
    </AuthModalProvider>
  );
}
