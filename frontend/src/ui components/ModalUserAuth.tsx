import { useState } from "react";
import ModalXL from "../components/ModalXL";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import smLogo from "../assets/Sm-logo.svg";

export default function ModalUserAuth() {
    const [isSignUp, setIsSignUp] = useState(true);
    const handleToggle = () => setIsSignUp(!isSignUp);

    return (
        <ModalXL>
            <div className="flex h-full w-full overflow-hidden bg-base">
                {/* Panel Izquierdo */}
                <div
                    className={`
                    h-full w-2/3 bg-base flex-col justify-center items-center gap-6 
                    transform transition-transform duration-500 ease-in-out
                    ${!isSignUp ? "translate-x-1/2 transition-opacity hidden" : "translate-x-0 flex slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both"}
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
                
                {/* Panel Derecho */}
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
                        className="border border-white p-2 w-2/3 rounded"
                        onClick={handleToggle}
                    >
                       {isSignUp ? "Log in" : "Sign up"}
                    </button>
                </div>
            </div>
        </ModalXL>
    );
}
