import { useState } from "react";
import { User, Bell, Clock, Palette, Globe, Shield } from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [settings, setSettings] = useState({
    // Profile settings
    username: "Usuario",
    email: "usuario@example.com",
    
    // Notification settings
    emailNotifications: true,
    taskReminders: true,
    projectUpdates: false,
    
    // Pomodoro settings
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    
    // Appearance settings
    theme: "dark",
    accentColor: "primary",
    
    // Language settings
    language: "es",
    
    // Privacy settings
    profileVisibility: "private",
    dataSharing: false
  });

  const sections: SettingSection[] = [
    { id: "profile", title: "Perfil", icon: <User className="w-5 h-5" /> },
    { id: "notifications", title: "Notificaciones", icon: <Bell className="w-5 h-5" /> },
    { id: "pomodoro", title: "Pomodoro", icon: <Clock className="w-5 h-5" /> },
    { id: "appearance", title: "Apariencia", icon: <Palette className="w-5 h-5" /> },
    { id: "language", title: "Idioma", icon: <Globe className="w-5 h-5" /> },
    { id: "privacy", title: "Privacidad", icon: <Shield className="w-5 h-5" /> }
  ];

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-base text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-serif mb-2">Configuración</h1>
        <p className="text-sm text-white/60">Personaliza tu experiencia en Kairo</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar Navigation - Horizontal scroll on mobile, vertical on desktop */}
        <aside className="md:w-64 md:flex-shrink-0">
          <nav className="bg-primary rounded-lg p-3 md:p-4">
            {/* Mobile: Horizontal scrolling tabs */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-3 px-3 md:mx-0 md:px-0">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors min-h-[44px] ${
                    activeSection === section.id
                      ? "bg-secondary text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {section.icon}
                  <span className="text-sm font-medium whitespace-nowrap md:whitespace-normal">{section.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-primary rounded-lg p-4 md:p-6">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Información del Perfil</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Nombre de usuario</label>
                  <input
                    type="text"
                    value={settings.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-white/80 mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                
                <button className="w-full md:w-auto mt-4 min-h-[44px] px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition-colors">
                  Guardar cambios
                </button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Preferencias de Notificaciones</h2>
              
              <div className="space-y-2">
                <ToggleSetting
                  label="Notificaciones por correo"
                  description="Recibe actualizaciones importantes por email"
                  checked={settings.emailNotifications}
                  onChange={(checked) => handleInputChange("emailNotifications", checked)}
                />
                
                <ToggleSetting
                  label="Recordatorios de tareas"
                  description="Recibe recordatorios cuando una tarea está próxima a vencer"
                  checked={settings.taskReminders}
                  onChange={(checked) => handleInputChange("taskReminders", checked)}
                />
                
                <ToggleSetting
                  label="Actualizaciones de proyectos"
                  description="Notificaciones sobre cambios en tus proyectos"
                  checked={settings.projectUpdates}
                  onChange={(checked) => handleInputChange("projectUpdates", checked)}
                />
              </div>
            </div>
          )}

          {/* Pomodoro Section */}
          {activeSection === "pomodoro" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Configuración del Pomodoro</h2>
              
              <div className="space-y-4">
                {/* Grid layout for inputs on tablet/desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Duración del trabajo (minutos)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.workDuration}
                      onChange={(e) => handleInputChange("workDuration", parseInt(e.target.value))}
                      className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Descanso corto (minutos)</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreak}
                      onChange={(e) => handleInputChange("shortBreak", parseInt(e.target.value))}
                      className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm text-white/80 mb-2">Descanso largo (minutos)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.longBreak}
                      onChange={(e) => handleInputChange("longBreak", parseInt(e.target.value))}
                      className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <ToggleSetting
                    label="Iniciar descansos automáticamente"
                    description="Los descansos comenzarán sin intervención"
                    checked={settings.autoStartBreaks}
                    onChange={(checked) => handleInputChange("autoStartBreaks", checked)}
                  />
                  
                  <ToggleSetting
                    label="Iniciar pomodoros automáticamente"
                    description="Los pomodoros comenzarán después de los descansos"
                    checked={settings.autoStartPomodoros}
                    onChange={(checked) => handleInputChange("autoStartPomodoros", checked)}
                  />
                </div>
                
                <button className="w-full md:w-auto mt-4 min-h-[44px] px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition-colors">
                  Guardar configuración
                </button>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Apariencia</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Tema</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleInputChange("theme", e.target.value)}
                    className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-white/80 mb-3">Color de acento</label>
                  <div className="flex gap-3">
                    {["primary", "secondary", "base-contrast"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleInputChange("accentColor", color)}
                        className={`min-w-[44px] min-h-[44px] w-12 h-12 rounded-lg bg-${color} border-2 transition-all ${
                          settings.accentColor === color
                            ? "border-white scale-110"
                            : "border-white/20 hover:scale-105"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language Section */}
          {activeSection === "language" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Idioma y Región</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Idioma de la aplicación</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                    className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl font-medium mb-4">Privacidad y Seguridad</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Visibilidad del perfil</label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
                    className="w-full min-h-[44px] bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                    <option value="friends">Solo amigos</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <ToggleSetting
                    label="Compartir datos de uso"
                    description="Ayúdanos a mejorar compartiendo datos anónimos de uso"
                    checked={settings.dataSharing}
                    onChange={(checked) => handleInputChange("dataSharing", checked)}
                  />
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <button className="w-full md:w-auto min-h-[44px] px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md hover:bg-red-500/30 transition-colors">
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Toggle Setting Component
interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSetting({ label, description, checked, onChange }: ToggleSettingProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 min-h-[44px]">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white">{label}</h3>
        <p className="text-xs text-white/60 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-12 h-6 rounded-full transition-colors min-h-[44px] flex items-center ${
          checked ? "bg-secondary" : "bg-white/20"
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
