import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

/** A simple reusable button component */
const Button = ({ label, primary, onClick }: ButtonProps) => {
  const mode = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-900";

  return (
    <button
      onClick={onClick}
      className={`${mode} font-semibold px-4 py-2 rounded-md shadow-sm transition`}
    >
      {label}
    </button>
  );
};

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    primary: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
  },
};
