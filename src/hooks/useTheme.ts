
"use client";

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme(defaultTheme: Theme = 'light'): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    const storedTheme = localStorage.getItem('zutara-theme') as Theme | null; // Updated key
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('zutara-theme', theme); // Updated key
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
}
