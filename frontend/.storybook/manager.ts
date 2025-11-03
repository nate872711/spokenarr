import { addons } from "@storybook/manager-api";
import { spokenarrLight, spokenarrDark } from "./spokenarrThemes";

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

addons.setConfig({
  theme: prefersDark ? spokenarrDark : spokenarrLight,
});
