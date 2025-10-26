/**
 * @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions}
 */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 120,
  bracketSameLine: true,
  bracketSpacing: true,
  trailingComma: "none",
  quoteProps: "consistent"
};
