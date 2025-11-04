import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: "1.5rem", backgroundColor: "#f8f9fa" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
