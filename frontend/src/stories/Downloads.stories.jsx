// frontend/src/stories/Downloads.stories.jsx
import Downloads from "../pages/Downloads";

export default {
  title: "Pages/Downloads",
  component: Downloads,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The **Downloads** page shows active and completed audiobook downloads with live progress bars. You can use the controls below to simulate different states.",
      },
    },
  },
  argTypes: {
    mockDownloads: {
      control: "object",
      description: "Simulated download data for visual testing",
    },
  },
};

const Template = (args) => {
  const { mockDownloads } = args;

  // Mock the API response if provided via args
  window.mockDownloads = mockDownloads;

  return <Downloads />;
};

export const Default = Template.bind({});
Default.args = {
  mockDownloads: [
    { id: 1, title: "The Hobbit", progress: 100 },
    { id: 2, title: "1984", progress: 75 },
    { id: 3, title: "Dune", progress: 30 },
  ],
};

Default.storyName = "Downloads Page (Interactive Mock)";
