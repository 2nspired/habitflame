/**
 * base prettier options
 * see: https://prettier.io/docs/en/options
 * @type {import('prettier').Config}
 */

const config = {
  arrowParens: "always",
  printWidth: 90,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

/**
 * sorted imports
 * see: https://github.com/IanVS/prettier-plugin-sort-imports
 * @type {import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */

const sortConfig = {
  importOrder: [
    "^@core/(.*)$",
    "",
    "^@server/(.*)$",
    "",
    "^@ui/(.*)$",
    "",
    "^[~/]",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

const prettierConfig = { ...config, ...sortConfig };

export default prettierConfig;
