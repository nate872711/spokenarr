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
          "The **Downloads** page displays active and completed audiobook downloads with live progress bars. This story uses mock data when the backend API is unavailable.",
      },
    },
  },
};

export const Default = () => <Downloads />;

Default.storyName = "Downloads Page (Mock API)";
