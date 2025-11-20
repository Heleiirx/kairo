import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ModalXL from "../ModalXL";
import SignInForm from "./SignInForm";
import SignUpForm from "../userAuth/SignUpForm";
import smLogo from "../../assets/Sm-logo.svg";
import { useAuthModal } from "../../context/AuthModalContext";
import{ X }from "lucide-react";

export default function ModalUserAuth() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleToggle = () => setIsSignUp(!isSignUp);
    const { isOpen, isSignUp, closeModal, setIsSignUp } = useAuthModal();
    
    // Change the URL when the modal opens or closes
    useEffect(() => {
        if (isOpen) {
            const modalPath = isSignUp ? "/signup" : "/signin";
            if (location.pathname !== modalPath) {
                navigate(modalPath, { replace: true });
            }
        } else {
            if (location.pathname === "/signup" || location.pathname === "/signin") {
                navigate("/", { replace: true });
            }
        }
    }, [isOpen, isSignUp]);

    // Implement modal scroll lock to prevent body scrolling
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ModalXL onClose={closeModal}>
            <button
                className="z-100 absolute top-4 right-4 md:top-7 md:right-7 p-1 size-8 md:size-10 bg-base-contrast rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors duration-300"
                onClick={closeModal}
                aria-label="Close modal"
            >
                <X className="text-primary w-5 h-5 md:w-6 md:h-6"/>
            </button>
            
            {/* Mobile layout: Single column, full-width */}
            <div className="md:hidden relative flex flex-col w-full min-h-[90vh] overflow-y-auto bg-base text-white p-6">
                <div className="flex flex-col items-center gap-6 py-8">
                    <img src={smLogo} alt="Logo kairo, reloj" className="size-16" />
                    
                    {isSignUp ? <SignUpForm /> : <SignInForm />}
                    
                    <div className="flex flex-col items-center gap-4 mt-4 text-center">
                        <span className="text-white text-sm">
                            {isSignUp 
                                ? "Already have an account?" 
                                : "Don't have an account?"}
                        </span>
                        <button
                            className="border border-white p-3 w-full min-h-[44px] rounded"
                            onClick={handleToggle}
                        >
                            {isSignUp ? "Log in" : "Sign up"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tablet/Desktop layout: Two-panel design with max-width constraint */}
            <div className="hidden md:flex relative w-full max-w-3xl h-[500px] overflow-hidden bg-base rounded shadow-xl/30 text-white">
                {/* Form panel */}
                <div
                    className={`
                    h-full w-2/3 bg-base flex-col justify-center items-center gap-6 
                    transform transition-transform duration-500 ease-in-out
                    ${isSignUp ? "translate-x-0 flex" : "translate-x-1/2 hidden"}
                `}>
                    <SignUpForm />
                </div>
                <div
                    className={`
                    h-full w-2/3 bg-base flex flex-col justify-center items-center gap-6 
                    transform transition-transform duration-500 ease-in-out
                    ${!isSignUp ? "translate-x-1/2 flex" : "translate-x-0 hidden"}
                `}>
                    <SignInForm />
                </div>
                
                {/* Text panel */}
                <div
                    className={`
                        h-full w-1/3 p-6 bg-primary flex flex-col justify-center items-center gap-4 text-white 
                        transform transition-transform duration-500 ease-in-out
                        ${!isSignUp ? "-translate-x-[200%]" : "translate-x-0"}
                    `}
                >
                    <img src={smLogo} alt="Logo kairo, reloj" className="size-16" />
                    <h2 className="text-3xl font-medium">Hello there!</h2>
                    <span className={`text-white text-center ${isSignUp ? "inline" : "hidden"}`}>
                        If you already have an account, you can{" "}
                        <p className="font-bold text-base-contrast inline">log in</p> here.
                    </span>
                    <span className={`text-white text-center ${isSignUp ? "hidden" : "inline"}`}>
                        If you want to save your progress and access your account from any device, you{" "}
                        <p className="font-bold text-base-contrast inline">can create an account</p> here.
                    </span>
                    <button
                        className="border border-white p-2 w-2/3 min-h-[44px] rounded"
                        onClick={handleToggle}
                    >
                       {isSignUp ? "Log in" : "Sign up"}
                    </button>
                </div>
            </div>
        </ModalXL>
    );
}
