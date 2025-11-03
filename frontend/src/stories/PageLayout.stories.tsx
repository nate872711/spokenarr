import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";

const meta: Meta<typeof PageLayout> = {
  title: "Layouts/PageLayout",
  component: PageLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  render: (args) => (
    <PageLayout {...args}>
      <div className="max-w-2xl mx-auto text-center mt-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Custom Content Example
        </h2>
        <p className="text-gray-600 mb-8">
          This layout demonstrates how your content would appear within the app’s
          header and footer.
        </p>
        <Button label="Explore More" primary />
      </div>
    </PageLayout>
  ),
};
