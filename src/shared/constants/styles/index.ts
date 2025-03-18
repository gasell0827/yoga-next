import { COLOR_SYSTEM } from "./colors";
import { TYPOGRAPHY_SYSTEM } from "./typography";

export const DESIGN_SYSTEM = {
  typography: TYPOGRAPHY_SYSTEM,
  colors: COLOR_SYSTEM,
} as const;

export * from "./colors";
export * from "./typography";
