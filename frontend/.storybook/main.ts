import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
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
    "@storybook/addon-themes",
  ],

  viteFinal: async (viteConfig) => {
    // Fix for file watching and rebuilds in Docker/CI
    viteConfig.server = viteConfig.server || {};
    viteConfig.server.watch = { usePolling: true };
    return viteConfig;
  },

  docs: {
    autodocs: "tag",
  },
};

export default config;
