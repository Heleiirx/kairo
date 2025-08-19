import { useState } from "react";
import { Grid3X3, CheckSquare, Folder, Clock, TrendingUp, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import SmLogo from "../../assets/Sm-logo.svg";

export default function SideNavBar(){
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: Grid3X3, label: "Dashboard", path: "/dashboard" },
        { icon: CheckSquare, label: "Tasks", path: "/tasks" },
        { icon: Folder, label: "Projects", path: "/proyects" },
        { icon: Clock, label: "Pomodoro", path: "/clock" },
        { icon: TrendingUp, label: "Stats", path: "/stats" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
        <div className={`${isExpanded ? 'w-64' : 'w-18'} transition-all duration-300 ease-in-out rounded-lg m-4 bg-primary flex flex-col py-6 relative shadow-lg`}>
            {/* Toggle Button */}
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-8 bg-secondary rounded-full p-1 hover:bg-secondary/80 transition-colors z-10 shadow-md"
            >
                {isExpanded ? (
                    <ChevronLeft className="w-4 h-4 text-primary" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-primary" />
                )}
            </button>

            {/* Logo Section */}
            <div className={`${isExpanded ? 'px-6 mb-8' : 'px-3 mb-6'} flex items-center transition-all duration-300`}>
                <div className="flex items-center gap-3">
                    <div className="p-2">
                        <img src={SmLogo} alt="kairo logo" className="w-8 h-8" />
                    </div>
                    {isExpanded && (
                        <span className="text-white text-xl font-medium tracking-wider">
                            KAIRO
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 flex flex-col space-y-2 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`
                                flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                                ${active 
                                    ? 'bg-secondary text-primary font-medium' 
                                    : 'text-secondary hover:bg-secondary/20 hover:text-white'
                                }
                                ${isExpanded ? 'justify-start' : 'justify-center'}
                            `}
                        >
                            <Icon className="w-6 h-6 flex-shrink-0" />
                            {isExpanded && (
                                <span className="text-base font-medium whitespace-nowrap">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="px-3 mt-6">
                <button 
                    onClick={handleLogout}
                    className={`
                        flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                        text-white hover:bg-red-600/20 hover:text-red-300
                        ${isExpanded ? 'justify-start w-full' : 'justify-center'}
                    `}
                >
                    <LogOut className="w-6 h-6 flex-shrink-0" />
                    {isExpanded && (
                        <span className="text-base font-medium whitespace-nowrap">
                            Log out
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}