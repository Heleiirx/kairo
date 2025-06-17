export default function ModalXL({children}: {children?: React.ReactNode}) {
    return (
        <div className="w-6xl h-80 min-h-9/10 bg-white rounded shadow-xl/30">
            {children}
        </div>
    )
}