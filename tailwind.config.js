/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sue-ellen': ['"Sue Ellen Francisco"', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'kusikay-bg': '#F1D9D2',
        'kusikay-text': '#523524',
        'kusikay-accent': '#853C29',
        'kusikay-accent-hover': '#6A2F21',
      },
    },
  },
  plugins: [],
}