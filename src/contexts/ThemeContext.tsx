import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
export type Paper = 'graph' | 'dots' | 'ruled' | 'plain';
export type TextSize = 'sm' | 'md' | 'lg';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  /** Background of the notebook page; set as data-paper on <html> */
  paper: Paper;
  setPaper: (p: Paper) => void;
  /** Long-form reading size; set as data-text on <html> */
  textSize: TextSize;
  setTextSize: (s: TextSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const read = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
  try {
    const v = localStorage.getItem(key) as T | null;
    return v && allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode — the choice just won't persist */
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // index.html applies the saved theme before first paint; mirror it here
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  );
  const [paper, setPaper] = useState<Paper>(() => read('paper', ['graph', 'dots', 'ruled', 'plain'], 'graph'));
  const [textSize, setTextSize] = useState<TextSize>(() => read('text-size', ['sm', 'md', 'lg'], 'md'));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'light') {
      root.classList.add('light');
    }
    save('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.paper = paper;
    save('paper', paper);
  }, [paper]);

  useEffect(() => {
    document.documentElement.dataset.text = textSize;
    save('text-size', textSize);
  }, [textSize]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, paper, setPaper, textSize, setTextSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
