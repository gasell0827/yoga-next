import type { Config } from "tailwindcss";

import { COLOR_SYSTEM } from "./src/shared/constants/styles/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        suit: ["SUIT Variable", "sans-serif"],
      },
      colors: COLOR_SYSTEM,
    },
  },
  plugins: [],
};

export default config;
