/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  container: {
    padding: {
      DEFAULT: '1rem',
      lg: '3rem',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  colors: {
    primary: '#050402',
    secondary: '#1C1D24',
    tertiary: '#131419',
    accent: {
      DEFAULT: 'rgb(139 92 246)',
      hover: '#925a2b',
    },
    paragraph: '#878e99',
  },
  plugins: [],
}