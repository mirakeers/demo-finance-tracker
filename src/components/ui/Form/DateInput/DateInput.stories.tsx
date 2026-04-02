import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import styles from "../FormLayout.module.css";
import { DateInput } from "./DateInput";

const DateInputStory = () => {
  const [value, setValue] = useState("2026-04-02");

  return (
    <div style={{ maxWidth: 300 }}>
      <DateInput
        value={value}
        onChange={setValue}
        placeholder="dd/MM/yyyy"
        slot={<CalendarDaysIcon className={styles.icon} />}
        clearable={value !== ""}
        onClear={() => setValue("")}
      />
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

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <DateInput value="" onChange={() => {}} placeholder="dd/MM/yyyy" />
    </div>
  ),
};
