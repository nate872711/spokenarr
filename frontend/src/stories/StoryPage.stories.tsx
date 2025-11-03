import type { Meta, StoryObj } from '@storybook/react';
import { StoryPage } from '../components/StoryPage';

const meta: Meta<typeof StoryPage> = {
  title: 'Pages/StoryPage',
  component: StoryPage,
};
export default meta;

type Story = StoryObj<typeof StoryPage>;

export const Default: Story = {};
