/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 'class' orqali toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        accent: "#EC4899",
      },
      boxShadow: {
        "soft-lg": "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
}
