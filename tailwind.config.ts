import {type Config} from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: "class",
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        placeholder: "hsl(var(--placeholder))",
        ring: "hsl(var(--ring))"
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({addComponents, addUtilities, theme}) {
      addComponents({
        ".section-container": {
          width: theme("width.full"),
          maxWidth: theme("maxWidth.xl"),
          marginLeft: theme("margin.auto"),
          marginRight: theme("margin.auto"),
          [`@media (min-width: ${theme("screens.md")})`]: {
            maxWidth: theme("maxWidth.4xl")
          }
        }
      });
      addUtilities({
        ".ring-appearance": {
          "--tw-ring-opacity": "1",
          "--tw-ring-color": "hsl(var(--ring) / var(--tw-ring-opacity))",
          "--tw-ring-offset-width": "2px",
          "--tw-ring-offset-color": "hsl(var(--background))"
        }
      });
    })
  ]
} satisfies Config;

export default config;
