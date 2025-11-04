import type { Preview } from "@storybook/react";

// Global CSS imports (optional)
import "../src/index.css";

// Global Storybook parameters
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "centered",
    docs: {
      toc: true,
    },
  },

  // Optional decorators (e.g., global providers, themes)
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", backgroundColor: "#f8f9fa" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
