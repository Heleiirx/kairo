interface ModalXLProps {
    children?: React.ReactNode;
    onClose?: () => void;
}

export default function ModalXL({children, onClose}: ModalXLProps) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-full md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

