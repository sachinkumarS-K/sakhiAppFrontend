/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode using a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans all files
  theme: {
    extend: {},
  },
  plugins: [],
};
