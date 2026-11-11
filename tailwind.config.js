/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#050706',
        ivory: {
          DEFAULT: '#F7F6F2', // Warm Ivory (Primary background)
          surface: '#EFECE6',
          muted: '#E5E1D8',
          border: '#DED9CE',
        },
        charcoal: {
          DEFAULT: '#252A27', // Deep Charcoal (Primary text)
          light: '#353C38',
          muted: '#4B544F',
        },
        sage: {
          DEFAULT: '#788477', // Muted Sage (Secondary information)
          light: '#8E9C8D',
          dark: '#5C665B',
        },
        terracotta: {
          DEFAULT: '#B96F52', // Restrained Terracotta Accent (New third accent)
          light: '#C98369',
          dark: '#9E583D',
        },
        accent: {
          terracotta: '#B96F52',
          cyan: '#65E6D2', // Legacy highlight
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'giant': ['clamp(3.5rem, 11vw, 9.5rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
        'meta': ['10px', { letterSpacing: '0.22em' }],
      },
    },
  },
  plugins: [],
}
