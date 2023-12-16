import plugin from "tailwindcss/plugin";
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
        primary: "#3b82f6" // blue.500
      }
    }
  },
  plugins: [
    plugin(function ({addComponents, theme}) {
      addComponents({
        ".section-container": {
          width: theme("width.full"),
          maxWidth: theme("maxWidth.xl"),
          marginLeft: theme("margin.auto"),
          marginRight: theme("margin.auto"),
          [`@media (min-width: ${theme("screens.md")})`]: {
            maxWidth: theme("maxWidth.6xl")
          }
        }
      });
    })
  ]
};

module.exports = config;
