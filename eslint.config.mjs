import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next", "prettier"],
  }),
  {
    rules: {
      "no-unused-vars": "off", 
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_|(Props|State)$|.*Type$",
        "ignoreRestSiblings": true,
        "args": "none" // 함수 매개변수는 검사하지 않음
      }]
    }
  }
];

export default eslintConfig;
