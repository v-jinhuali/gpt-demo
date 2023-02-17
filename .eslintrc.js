module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module",
    ecmaVersion: 6
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    commonjs: true,
    es2021: true
  },
  settings: {
    "import/ignore": ["node_modules"],
    react: {
      version: "latest"
    }
  },
  plugins: ["react", "@typescript-eslint", "jest", "testing-library/react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "prettier"
  ],
  rules: {
    quotes: [
      2,
      "double",
      {
        avoidEscape: true
      }
    ],
    "no-console": 0,
    "no-debugger": 1,
    "no-var": 1,
    semi: ["error", "always"],
    "no-irregular-whitespace": 0,
    "no-trailing-spaces": 1,
    "eol-last": 0,
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        vars: "all",
        args: "after-used"
      }
    ],
    "no-case-declarations": 0,
    "no-underscore-dangle": 0,
    "no-alert": 2,
    "no-lone-blocks": 0,
    "no-class-assign": 2,
    "no-cond-assign": 2,
    "no-const-assign": 2,
    "no-delete-var": 2,
    "no-dupe-keys": 2,
    "use-isnan": 2,
    "no-duplicate-case": 2,
    "no-dupe-args": 2,
    "no-empty": 2,
    "no-func-assign": 2,
    "no-invalid-this": 0,
    "no-redeclare": 2,
    "no-spaced-func": 2,
    "no-this-before-super": 0,
    "no-undef": 2,
    "no-return-assign": 0,
    "no-script-url": 2,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": 2,
    "no-extra-boolean-cast": 0,
    "no-unreachable": 1,
    "comma-dangle": 2,
    "no-mixed-spaces-and-tabs": 2,
    "prefer-arrow-callback": 0,
    "arrow-parens": 0,
    "arrow-spacing": 0,
    camelcase: 0,
    "jsx-quotes": [1, "prefer-double"],
    "react/display-name": 0,
    "react/forbid-prop-types": [
      2,
      {
        forbid: ["any"]
      }
    ],
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-curly-spacing": [
      2,
      {
        when: "never",
        children: true
      }
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-key": 2,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-uses-vars": 2,
    "react/no-danger": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 0,
    "react/no-direct-mutation-state": 2,
    "react/no-multi-comp": 0,
    "react/no-set-state": 0,
    "react/no-unknown-property": 2,
    "react/prefer-es6-class": 2,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 2,
    "react/self-closing-comp": 0,
    "react/sort-comp": 0,
    "react/no-array-index-key": 0,
    "react/no-deprecated": 1,
    "react/jsx-equals-spacing": 2,
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error",
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "jest/no-disabled-tests": "warn",
    "jest/prefer-to-have-length": "warn",
    "testing-library/no-debugging-utils": "warn"
  }
};
