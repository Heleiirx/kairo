import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useDarkMode(): [boolean, () => void] {
  const getInitialTheme = (): boolean => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const theme: Theme = isDarkMode ? 'dark' : 'light';

    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return [isDarkMode, toggleTheme];
}
