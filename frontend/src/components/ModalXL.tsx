export default function ModalXL({children}: {children?: React.ReactNode}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
            {children}
        </div>
    )
}

