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
    variant: "primary",
    children: "Primary",
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        <PlusIcon className="size-4" />
        <span className="ml-2">Primary Icon</span>
      </>
    ),
  },
};
export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: (
      <>
        <PlusIcon className="size-4" />
        <span className="ml-2">Primary Icon + Disabled</span>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Cancel",
  },
};

export const OutlineWithIcon: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <PlusIcon className="size-4" />
        <span className="ml-2">Add transaction</span>
      </>
    ),
  },
};

export const OutlineDisabled: Story = {
  args: {
    variant: "outline",
    disabled: true,
    children: (
      <>
        <PlusIcon className="size-4" />
        <span className="ml-2">Outline Icon + Disabled</span>
      </>
    ),
  },
};

export const GhostIcon: Story = {
  args: {
    variant: "ghost",
    "aria-label": "Edit transaction",
    children: <PencilIcon className="size-4" />,
  },
};
export const GhostIconDisabled: Story = {
  args: {
    variant: "ghost",
    disabled: true,
    "aria-label": "Edit transaction",
    children: <PencilIcon className="size-4" />,
  },
};
