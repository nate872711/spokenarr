import { StorybookConfig } from "@storybook/react-vite";

const config = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
};

export default config;
