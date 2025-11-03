import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Header from "../components/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    onLogin: { action: "login-clicked" },
    onLogout: { action: "logout-clicked" },
    onCreateAccount: { action: "create-account-clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "Spokenarr",
    subtitle: "Your voice-powered content platform",
  },
};

export const LoggedIn: Story = {
  args: {
    title: "Spokenarr",
    subtitle: "Welcome back!",
  },
};
