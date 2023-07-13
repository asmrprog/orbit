module.exports = {
  extends: "../../.eslintrc.cjs",
  overrides: [
    {
      files: ["./src/**", "./scripts/**", "tsup.config.js"],
      rules: {
        "import/no-useless-path-segments": "off",
        "import/extensions": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
