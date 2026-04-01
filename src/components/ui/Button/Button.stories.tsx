import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Add manual transaction",
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon className="size-4" />
        Add manual transaction
      </>
    ),
  },
};

export const Icon: Story = {
  args: {
    variant: "icon",
    "aria-label": "Edit transaction",
    children: <PencilIcon className="size-4" />,
  },
};
