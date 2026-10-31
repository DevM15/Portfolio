/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#11140F',
        black: '#090A08',
        ivory: {
          DEFAULT: '#E8E1D2',
          secondary: '#C8C1B2',
          muted: '#8A867B',
        },
        olive: '#686B5C',
        teal: '#176D6C',
        burgundy: '#582C2B',
        pink: '#E8D9DD',
      },
      fontFamily: {
        sans: ['"General Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"General Sans"', '"Inter"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
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
