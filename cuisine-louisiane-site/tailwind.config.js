/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pinyon: ["Pinyon Script", "cursive"],
        julius: ["Julius Sans One", "sans-serif"],
      },
      colors: {
        maroon: "#800000",
      },
    },
  },
  plugins: [],
};
