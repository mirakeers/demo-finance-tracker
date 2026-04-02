import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import "../../i18n/i18n";
import { Card } from "../ui/Card/Card";
import {
  TransactionForm,
  type TransactionFormSubmitData,
} from "./TransactionForm";

const TransactionFormStory = () => {
  const [submitted, setSubmitted] = useState<TransactionFormSubmitData | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      {isOpen ? (
        <Card>
          <TransactionForm
            onCancel={() => setIsOpen(false)}
            onSubmit={(data) => {
              setSubmitted(data);
              setIsOpen(false);
            }}
          />
        </Card>
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm"
            onClick={() => setIsOpen(true)}
          >
            Open form
          </button>
        </div>
      )}

      {submitted && (
        <Card>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(
              {
                ...submitted,
                date: submitted.date.toISOString(),
              },
              null,
              2,
            )}
          </pre>
        </Card>
      )}
    </div>
  );
};

const meta = {
  title: "Features/TransactionForm",
  render: () => <TransactionFormStory />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {};
