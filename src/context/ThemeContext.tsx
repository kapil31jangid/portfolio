import { useEffect, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './theme';

const STORAGE_KEY = 'portfolio-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'super' ? 'super' : 'base';
    } catch {
      return 'base';
    }
  });

  // Apply data-theme to <html> on every change
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'super' ? '#0E0E10' : '#F4F1EA');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'base' ? 'super' : 'base'));

  return (
    <ThemeContext.Provider value={{ theme, isSuperMode: theme === 'super', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
