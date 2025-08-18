import { Grid3X3, CheckSquare, Folder, Clock, TrendingUp, Settings, LogOut } from "lucide-react";
import SmLogo from "../../assets/Sm-logo.svg";

export default function SideNavBar(){
    return(
        <div className="w-18 rounded m-4 bg-primary flex flex-col items-center py-6 space-y-6">
            <button className="p-3 rounded-lg bg-primary-600 hover:bg-primary-500 transition-colors">
                <img src={SmLogo} alt="kario logo" className="w-10 h-10 text-white" />
            </button>

            <div className="flex flex-col space-y-4">
                <button className="p-3 rounded-lg hover:bg-secondary transition-colors">
                    <Grid3X3 className="w-6 h-6 text-secondary" />
                </button>
                <button className="p-3 rounded-lg bg-secondary hover:bg-secondary-500 transition-colors">
                    <CheckSquare className="w-6 h-6 text-primary" />
                </button>
                <button className="p-3 rounded-lg hover:bg-secondary transition-colors">
                    <Folder className="w-6 h-6 text-secondary" />
                </button>
                <button className="p-3 rounded-lg hover:bg-secondary transition-colors">
                    <Clock className="w-6 h-6 text-secondary" />
                </button>
                <button className="p-3 rounded-lg hover:bg-secondary transition-colors">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                </button>
                <button className="p-3 rounded-lg hover:bg-secondary transition-colors">
                    <Settings className="w-6 h-6 text-secondary" />
                </button>
            </div>

            <div className="mt-4">
                <button className="p-3 rounded-lg hover:bg-secondary-600 transition-colors">
                <LogOut className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    )
}