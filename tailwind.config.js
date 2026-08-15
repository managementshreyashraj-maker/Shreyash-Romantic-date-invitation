/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fffaf6',
          100: '#fff3ec',
          200: '#fce7da',
        },
        blush: {
          400: '#f4a9b6',
          500: '#ec7d8f',
          600: '#e05a72',
          700: '#c8425a',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(192, 66, 90, 0.35)',
        glow: '0 0 40px -8px rgba(236, 125, 143, 0.45)',
      },
    },
  },
  plugins: [],
};
