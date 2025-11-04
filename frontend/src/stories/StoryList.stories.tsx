import type { Meta, StoryObj } from "@storybook/react";
import StoryList from "../components/StoryList";

const meta: Meta<typeof StoryList> = {
  title: "Components/StoryList",
  component: StoryList,
};

export default meta;
type Story = StoryObj<typeof StoryList>;

export const Default: Story = {
  args: {
    stories: [
      {
        id: 1,
        title: "Echoes of Tomorrow",
        description: "A tale of future narrators and digital voices.",
        author: "Nova Quinn",
        date: "2025-11-04",
      },
      {
        id: 2,
        title: "The Voice Within",
        description: "An introspective story about identity and sound.",
        author: "Eli Verse",
        date: "2025-10-20",
      },
    ],
  },
};
