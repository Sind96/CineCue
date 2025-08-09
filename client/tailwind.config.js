/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E50914",
        secondary: "#141414",
        accent: "#b81d24",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        card: "0 4px 15px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
