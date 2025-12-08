import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/navbar/TopNavBar';
import ModalUserAuth from '../components/userAuth/ModalUserAuth';
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
