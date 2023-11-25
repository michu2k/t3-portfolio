import defaultTheme from "tailwindcss/defaultTheme";

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  darkMode: "class",
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "#3b82f6", // blue.500
        secondary: "#dbeafe" // blue.100
      }
    }
  },
  plugins: []
};

module.exports = config;
