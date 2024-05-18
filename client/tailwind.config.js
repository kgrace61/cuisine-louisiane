/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js,jsx,ts,tsx}', // All files in the pages directory
    './components/**/*.{html,js,jsx,ts,tsx}', // All files in the components directory
    './src/**/*.{html,js,jsx,ts,tsx}', // All files in the src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        pinyon: ['Pinyon Script', 'cursive'],
        julius: ['Julius Sans One', 'sans-serif'],
      },
      colors: {
        maroon: '#800000',
      },
    },
  },
  plugins: [],
};