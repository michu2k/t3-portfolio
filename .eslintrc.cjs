/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "indent": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "semi": ["warn", "always"],
    "quotes": ["error", "double", {allowTemplateLiterals: true}],
    "no-multiple-empty-lines": ["error", {max: 1, maxEOF: 0}],
    "arrow-parens": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "no-multi-spaces": "error",
    "comma-dangle": "warn",
    "react/jsx-tag-spacing": "error",
    "comma-spacing": ["error"],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_"}
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["server-only"],
          // Node.js builtins prefixed with `node:`.
          ["^node:"],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^react", "^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ["^"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
          // Side effect imports.
          ["^\\u0000"]
        ]
      }
    ]
  }
};

module.exports = config;
