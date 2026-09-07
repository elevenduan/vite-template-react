const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "selector-class-pattern": ["^(?:[a-z][a-zA-Z0-9]*|[a-z][a-z0-9]*(?:-[a-z0-9]+)+)$", { message: "Expected class selector to be kebab-case or camelCase" }],
    "no-descending-specificity": null,
  },
};

export default config;
