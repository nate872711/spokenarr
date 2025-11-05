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
          "The **Settings** page displays and controls user preferences for Spokenarr. Use the toggles below to test different settings configurations live.",
      },
    },
  },
  argTypes: {
    autoDownload: {
      control: "boolean",
      description: "Simulate Auto Download setting",
    },
    notifications: {
      control: "boolean",
      description: "Toggle whether notifications are enabled",
    },
    preferredSource: {
      control: "text",
      description: "Set preferred audiobook source name",
    },
  },
};

const Template = (args) => {
  window.mockSettings = args;
  return <Settings />;
};

export const Default = Template.bind({});
Default.args = {
  downloadPath: "/app/audio",
  autoDownload: true,
  notifications: true,
  preferredSource: "AudiobookBay",
};

Default.storyName = "Settings Page (Interactive Controls)";
