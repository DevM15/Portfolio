import React from 'react';
import { useTheme } from '../utils/ThemeContext';

/**
 * ThemeToggle:
 * Minimal architectural theme toggle switch.
 * - Displays a fine Sun icon in light mode and Moon icon in dark mode.
 * - Captures mouse click event coordinates to initiate organic CSS View Transition ink-bleed.
 * - Features subtle hover scaling and smooth icon rotation.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-cursor="button"
      className="group relative flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--bg-surface-elevated)] transition-all duration-300 shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
    >
      <div className="relative w-4 h-4 flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-45">
        {isDark ? (
          /* Moon Icon (Dark Mode Active) */
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--accent)] transition-colors"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          /* Sun Icon (Light Mode Active) */
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </div>

      {/* Subtle indicator dot */}
      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-80" />
    </button>
  );
}
