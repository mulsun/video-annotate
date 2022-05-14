module.exports = {
  root: true,
  env: {
    es2018: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "object-curly-spacing": 0,
    "indent": 0,
    "max-len": 0,
  },
};
