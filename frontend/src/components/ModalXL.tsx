import { useEffect, useRef } from 'react';

interface ModalXLProps {
    children?: React.ReactNode;
    onClose?: () => void;
}

export default function ModalXL({children, onClose}: ModalXLProps) {
    const modalContentRef = useRef<HTMLDivElement>(null);

    // Implement scroll lock when modal is open
    useEffect(() => {
        // Save original body overflow style
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        
        // Get scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        // Add padding to prevent layout shift when scrollbar disappears
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
        // Restore original styles on cleanup
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, []);

    // Handle keyboard visibility on mobile - scroll input into view
    useEffect(() => {
        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            
            // Check if focused element is an input, textarea, or select
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT'
            ) {
                // Delay to allow keyboard animation
                setTimeout(() => {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            }
        };

        const modalElement = modalContentRef.current;
        if (modalElement) {
            modalElement.addEventListener('focusin', handleFocusIn);
            
            return () => {
                modalElement.removeEventListener('focusin', handleFocusIn);
            };
        }
    }, []);

    // Click-outside-to-close functionality
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the modal content
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div 
                ref={modalContentRef}
                className="w-full h-full md:h-auto md:w-auto md:max-w-2xl lg:max-w-4xl md:max-h-[90vh] overflow-auto bg-primary md:rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

