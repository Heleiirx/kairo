import { useDarkMode } from "./hooks/useDarkMode";

function App() {
  const [isDarkMode, toggleTheme] = useDarkMode();

  return (
    <div className="w-screen bg-primary dark:bg-base dark:text-white">  
      <h1>Landing Page</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 border rounded dark:text-black"
      >
        Cambiar tema
      </button>
    </div>
  )
}

export default App
