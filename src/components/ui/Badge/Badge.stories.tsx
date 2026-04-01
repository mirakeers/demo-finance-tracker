import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import type { ColorClass } from "../../../types";

const meta = {
  title: "UI/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const WithColor: Story = {
  args: {
    children: "Food",
    color: "lime",
  },
};

export const AllColors: Story = {
  render: () => {
    const colors: ColorClass[] = [
      "amber",
      "lime",
      "emerald",
      "cyan",
      "blue",
      "violet",
      "fuchsia",
      "rose",
    ];

    return (
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Badge key={color} color={color}>
            {color}
          </Badge>
        ))}
      </div>
    );
  },
};
