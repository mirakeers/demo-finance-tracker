import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a card",
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <h2>Card Title</h2>
        <p>Some descriptive content inside the card.</p>
      </div>
    ),
  },
};
