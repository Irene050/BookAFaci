/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        menbere: ['Menbere', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};