import { create } from "@storybook/theming";

export default create({
  base: "light",

  // Brand identity
  brandTitle: "Spokenarr UI",
  brandUrl: "https://spokenarr.io",
  brandImage: "/logos/spokenarr-logo.svg", // place in /frontend/public/logos/
  brandTarget: "_self",

  // Core colors
  colorPrimary: "#6C63FF",
  colorSecondary: "#FF6584",

  // UI colors
  appBg: "linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)",
  appContentBg: "#ffffff",
  appBorderColor: "#d1d5db",
  appBorderRadius: 12,

  // Typography
  fontBase: '"Inter", "Segoe UI", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#1f2937",
  textInverseColor: "#ffffff",

  // Toolbar colors
  barTextColor: "#1f2937",
  barSelectedColor: "#6C63FF",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#d1d5db",
  inputTextColor: "#111827",
  inputBorderRadius: 8,
});
