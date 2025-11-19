interface ModalXLProps {
    children?: React.ReactNode;
    onClose?: () => void;
}

export default function ModalXL({children, onClose}: ModalXLProps) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

