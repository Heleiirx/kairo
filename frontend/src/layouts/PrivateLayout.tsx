import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/navbar/SideNavBar';
import ContainerXL from '../components/ContainerXL';
import { MobileMenuProvider, useMobileMenu } from '../context/MobileMenuContext';
import { Menu } from 'lucide-react';

function PrivateLayoutContent() {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <ContainerXL>
      <div className="flex min-h-screen">
        {/* Mobile: Hamburger button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden fixed top-4 left-4 z-50 bg-primary rounded-lg p-3 shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-secondary" />
        </button>
        
        {/* Mobile: Overlay backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
        
        {/* Mobile: Slide-out sidebar */}
        <div className={`lg:hidden fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SideNavBar isMobile={true} onClose={closeMenu} />
        </div>
        
        {/* Desktop: Persistent sidebar */}
        <div className="hidden lg:block">
          <SideNavBar isMobile={false} />
        </div>
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </ContainerXL>
  );
}

export default function PrivateLayout() {
  return (
    <MobileMenuProvider>
      <PrivateLayoutContent />
    </MobileMenuProvider>
  );
}
