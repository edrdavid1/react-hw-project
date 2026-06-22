import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkImages, lightImages } from '../theme/imagePaths';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'app_theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    try {
      return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'system';
    } catch {
      return 'system';
    }
  });

  const [prefersDark, setPrefersDark] = useState<boolean>(getSystemPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches);
    mq.addEventListener?.('change', handleChange);
    return () => {
      try {
        mq.removeEventListener('change', handleChange);
      } catch {
        // Safari fallback
        // @ts-ignore
        mq.removeListener?.(handleChange);
      }
    };
  }, []);

  const effectiveTheme: 'light' | 'dark' = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    const themeImages = effectiveTheme === 'dark' ? darkImages : lightImages;

    root.setAttribute('data-theme', effectiveTheme);
    root.style.setProperty('--hero-background', `url('${themeImages.heroBackground}')`);
    root.style.setProperty('--footer-background', `url('${themeImages.footerBackground}')`);
    root.style.setProperty('--menu-background', `url('${themeImages.menuBackground}')`);
  }, [effectiveTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore localStorage errors
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
      return;
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default ThemeProvider;
