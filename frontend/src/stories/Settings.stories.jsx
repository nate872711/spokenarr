// frontend/src/stories/Settings.stories.jsx
import Settings from "../pages/Settings";

export default {
  title: "Pages/Settings",
  component: Settings,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The **Settings** page allows users to view and configure application options such as download paths, auto-download toggles, and preferred sources. This story uses mock API data to simulate live settings.",
      },
    },
  },
};

export const Default = () => <Settings />;

Default.storyName = "Settings Page (Mock API)";
