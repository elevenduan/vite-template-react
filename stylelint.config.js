const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"]
      }
    ]
  }
};

export default config;
