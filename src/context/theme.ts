import { createContext, useContext } from 'react';

export type Theme = 'base' | 'super';

interface ThemeContextValue {
  theme: Theme;
  isSuperMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'base',
  isSuperMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
