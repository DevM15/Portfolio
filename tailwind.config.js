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
          DEFAULT: '#F7F6F2', // Warm Ivory (User specification)
          surface: '#EFECE6',
          muted: '#E5E1D8',
          border: '#DED9CE',
        },
        charcoal: {
          DEFAULT: '#252A27', // Deep Charcoal (User specification)
          light: '#353C38',
          muted: '#4B544F',
        },
        sage: {
          DEFAULT: '#788477', // Muted Sage (User specification)
          light: '#8E9C8D',
          dark: '#5C665B',
        },
        accent: {
          cyan: '#65E6D2', // Legacy highlight
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
