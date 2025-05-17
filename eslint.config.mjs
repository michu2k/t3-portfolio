import {FlatCompat} from "@eslint/eslintrc";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import eslintTs from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
});

export default eslintTs.config(
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: "Common config",
    plugins: {
      "unused-imports": unusedImportsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "@typescript-eslint": eslintTs.plugin
    },
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      "import/newline-after-import": "error",
      "import/no-mutable-exports": "error",
      "import/no-anonymous-default-export": ["error", {allowObject: true}],
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
    },
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  {
    ignores: [".next"]
  }
);
