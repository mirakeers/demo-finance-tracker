import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { Transaction } from "../../types";
import { Timeline } from "./Timeline";

const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    date: "2026-04-01",
    description: "Lunch",
    category: "food_drink",
    amount: -42.12,
    source: "imported",
  },
  {
    id: "tx-2",
    date: "2026-04-01",
    description: "Train",
    category: "transport",
    amount: -8,
    source: "manual",
  },
  {
    id: "tx-3",
    date: "2026-04-01",
    description: "Dinner",
    category: "food_drink",
    amount: -42.12,
    source: "imported",
  },
  {
    id: "tx-4",
    date: "2026-04-02",
    description: "Salary",
    category: "misc",
    amount: 2400,
    source: "imported",
  },
];

const TimelineStoryContent = () => {
  const [selectedDate, setSelectedDate] = useState("2026-04-01");

  return (
    <Timeline
      transactions={mockTransactions}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
};

const meta = {
  title: "Features/Timeline",
  render: () => <TimelineStoryContent />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
