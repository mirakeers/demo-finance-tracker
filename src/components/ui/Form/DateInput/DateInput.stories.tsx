import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DateInput } from "./DateInput";

const DateInputStory = () => {
  const [value, setValue] = useState("02/04/2026");

  return (
    <div style={{ maxWidth: 300 }}>
      <DateInput value={value} onChange={setValue} />
    </div>
  );
};

const meta = {
  title: "UI/Forms/Fields/DateInput",
  render: () => <DateInputStory />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
