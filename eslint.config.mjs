import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig({
  // Combine Next.js ESLint configs
  extends: [...nextVitals, ...nextTs],

  rules: {
    "@typescript-eslint/no-explicit-any": "error",
  },

  // Override default ignores
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
});
