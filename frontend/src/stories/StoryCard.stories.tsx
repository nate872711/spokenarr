import type { Meta, StoryObj } from '@storybook/react';
import { StoryCard } from '../components/StoryCard';

const meta: Meta<typeof StoryCard> = {
  title: 'Components/StoryCard',
  component: StoryCard,
};
export default meta;

type Story = StoryObj<typeof StoryCard>;

export const Default: Story = {
  args: {
    title: 'Sample Story',
    author: 'Narrator',
  },
};
