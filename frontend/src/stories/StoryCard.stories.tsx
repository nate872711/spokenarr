import type { Meta, StoryObj } from "@storybook/react";
import StoryCard from "../components/StoryCard";

const meta: Meta<typeof StoryCard> = {
  title: "Components/StoryCard",
  component: StoryCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StoryCard>;

export const Default: Story = {
  args: {
    title: "The Future of Spoken Narratives",
    description: "A look into the next evolution of audio storytelling.",
    author: "Spokenarr Team",
    date: "Nov 2025",
  },
};
