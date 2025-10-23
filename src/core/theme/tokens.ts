import { Theme, SemanticColors } from "./types";
import { typography } from "./typography";

const brand = {
  primary: "#111111",
  primaryMuted: "#1E1E1E",
  onPrimary: "#FFFFFF",
};

const green = { base: "#2ecc71", on: "#0F2B1F" };
const yellow = { base: "#f1c40f", on: "#2B2500" };
const red = { base: "#e74c3c", on: "#2B0F0F" };

const light: SemanticColors = {
  bg: "#FFFFFF",
  card: "#FFFFFF",
  surface: "#F6F7F9",
  text: "#111111",
  textSecondary: "#6B7280",
  border: "#E5E7EB",

  primary: brand.primary,
  primaryMuted: brand.primaryMuted,
  onPrimary: brand.onPrimary,

  success: green.base,
  onSuccess: green.on,
  warning: yellow.base,
  onWarning: yellow.on,
  danger: red.base,
  onDanger: red.on,

  inputBg: "#F3F4F6",
  inputText: "#111111",
  placeholder: "#9CA3AF",

  overlay: "rgba(0,0,0,0.4)",
  shadow: "rgba(0,0,0,0.15)",
};

const dark: SemanticColors = {
  bg: "#0F141B",
  card: "#121720",
  surface: "#161C25",
  text: "#F3F4F6",
  textSecondary: "#9CA3AF",
  border: "#263042",

  primary: "#FFFFFF",
  primaryMuted: "#DADDE2",
  onPrimary: "#111111",

  success: green.base,
  onSuccess: green.on,
  warning: yellow.base,
  onWarning: yellow.on,
  danger: red.base,
  onDanger: red.on,

  inputBg: "#1B2230",
  inputText: "#F3F4F6",
  placeholder: "#8892A6",

  overlay: "rgba(0,0,0,0.5)",
  shadow: "rgba(0,0,0,0.5)",
};

export const makeTheme = (mode: "light" | "dark"): Theme => ({
  mode,
  dark: mode === "dark",
  colors: mode === "dark" ? dark : light,
  typography,
  icon: { size: 22, strokeWidth: 2 },
  radius: { sm: 4, md: 8, lg: 16, xl: 24, full: 999 },
});
