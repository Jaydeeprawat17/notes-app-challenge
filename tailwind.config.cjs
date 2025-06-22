/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 Add this line
  content: ["./index.html", "./src/**/*.{js,ts,svelte}"],

  theme: {
    extend: {},
  },
  plugins: [],
};
