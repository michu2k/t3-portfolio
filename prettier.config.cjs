/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  printWidth: 120,
  bracketSameLine: true,
  bracketSpacing: false,
  trailingComma: "none",
  quoteProps: "consistent"
};

module.exports = config;
