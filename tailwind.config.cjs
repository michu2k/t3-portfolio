import defaultTheme from "tailwindcss/defaultTheme";

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "#38bdf8" // sky.400
      }
    }
  },
  plugins: []
};

module.exports = config;
