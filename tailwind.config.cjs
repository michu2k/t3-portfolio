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
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};

module.exports = config;
