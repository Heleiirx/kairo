import Logo from "../../assets/Logo.svg";
import { Palette } from "lucide-react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuthModal } from "../../context/AuthModalContext";
import type { JSX } from "react";


export default function TopNavBar() :JSX.Element{
  const [_, toggleTheme] = useDarkMode();
  const { openLogin, openSignUp } = useAuthModal();

    return(
        <div className="bg-primary w-full h-auto md:h-16 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-0 gap-4 md:gap-0">
            <img src={Logo} alt="Logo" className="w-16 md:w-22" />
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
                <button 
                    onClick={openSignUp} 
                    className="border rounded text-white px-4 py-2 hover:bg-secondary/30 w-full md:w-auto min-h-[44px] min-w-[44px]"
                >
                    Sign Up
                </button>
                <button 
                    onClick={openLogin} 
                    className="rounded text-white px-4 py-2 hover:bg-secondary/30 w-full md:w-auto min-h-[44px] min-w-[44px]"
                >
                    Log In
                </button>
                <button 
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-transparent min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                    <Palette className="text-white" size={30} strokeWidth={1}/>
                </button>
            </div>
        </div>
    )
}