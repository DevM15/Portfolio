import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light'; // Light mode is default
  });

  // Keep HTML root data-theme attribute in sync
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (e) {
      // Ignore storage errors in private browsing
    }
  }, [theme]);

  const toggleTheme = useCallback((event) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // If user prefers reduced motion or browser doesn't support View Transitions API, switch instantly
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    // Capture click coordinates for organic ink-bleed expansion origin
    let x = window.innerWidth / 2;
    let y = 40; // Default near top-nav

    if (event && event.clientX !== undefined) {
      x = event.clientX;
      y = event.clientY;
    }

    document.documentElement.style.setProperty('--ink-x', `${x}px`);
    document.documentElement.style.setProperty('--ink-y', `${y}px`);

    // Calculate maximum radius to fully cover viewport corners
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    document.documentElement.style.setProperty('--ink-radius', `${maxRadius}px`);

    // Flag whether expanding into dark or dissolving into light
    document.documentElement.dataset.transitionDirection = nextTheme === 'dark' ? 'to-dark' : 'to-light';

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.finished.finally(() => {
      delete document.documentElement.dataset.transitionDirection;
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
