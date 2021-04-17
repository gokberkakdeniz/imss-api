// eslint-disable-next-line no-undef
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:jest/recommended",
  ],
  env: {
    "jest/globals": true,
    node: true,
    commonjs: true,
  },
  rules: {
    "prettier/prettier": "error",
  },
};
