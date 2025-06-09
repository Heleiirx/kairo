import Logo from "./../assets/Logo.svg";
import { Palette } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";


export default function TopNavBar(){
  const [isDarkMode, toggleTheme] = useDarkMode();

    return(
        <div className="bg-primary w-full h-16 flex items-center justify-between px-8">
            <img src={Logo} alt="Logo" className="w-22" />
            <div className="flex items-center gap-4">
                <button className="border rounded text-white p-2 hover:bg-secondary/30">Sign Up</button>
                <button className="rounded text-white p-2 hover:bg-secondary/30">Log In</button>
                <button onClick={toggleTheme}
                className="px-4 py-2 bg-transparent">
                    <Palette className="text-white" size={30} strokeWidth={1}/>
                </button>
            </div>
        </div>
    )
}