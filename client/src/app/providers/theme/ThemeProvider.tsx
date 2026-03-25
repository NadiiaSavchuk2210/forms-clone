import { useEffect, useState } from 'react';
import { ThemeContext } from './theme.context';
import { Theme } from '@/features/theme-switcher/model/theme.config';

const STORAGE_KEY = 'app-theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return savedTheme ?? 'green';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
