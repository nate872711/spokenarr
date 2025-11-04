const baseConfig = require("../tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "../src/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.mdx",
  ],
  corePlugins: baseConfig.corePlugins,
  theme: baseConfig.theme,
  plugins: baseConfig.plugins,
};
