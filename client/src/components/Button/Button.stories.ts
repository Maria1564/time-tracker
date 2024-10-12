import type { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"
import { fn } from "@storybook/test"
const meta = {
  title: "UI KIT/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    children: { control: "text" },
    secondary: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    onClick: fn(),
    children: "Click me",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const Secondary: Story = {
  args: {
    secondary: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
