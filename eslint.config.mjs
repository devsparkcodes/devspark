import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "design-system/**",
      ".opencode/**",
      "docs/**",
    ],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
