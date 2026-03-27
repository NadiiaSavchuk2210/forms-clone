import { createContext } from 'react';

import { Theme } from '@/features/theme-switcher/model/theme.config';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
