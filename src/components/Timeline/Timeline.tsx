import { addDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Transaction } from "../../types";
import { Button } from "../ui/Button/Button";
import { DateInput } from "../ui/Form/DateInput/DateInput";
import { formatDate } from "../../utils/formatDate";
import { TimelinePanel, type TimelineCategoryGroup } from "./TimelinePanel";

type TimelineProps = {
  transactions: Transaction[];
  selectedDate: Date;
  onDateChange: (nextDate: Date) => void;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getDayTransactions = (transactions: Transaction[], selectedDate: Date) =>
  transactions.filter((transaction) =>
    isSameDay(transaction.date, selectedDate),
  );

const getPanelTransactions = (
  transactions: Transaction[],
  kind: "expense" | "income",
) =>
  transactions.filter((transaction) =>
    kind === "expense" ? transaction.amount < 0 : transaction.amount > 0,
  );

const getTotal = (transactions: Transaction[]) =>
  transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

const getCategoryGroups = (
  transactions: Transaction[],
): TimelineCategoryGroup[] => {
  const grouped = new Map<Transaction["category"], TimelineCategoryGroup>();

  transactions.forEach((transaction) => {
    const current = grouped.get(transaction.category);

    if (current) {
      current.total += transaction.amount;
      current.count += 1;
      return;
    }

    grouped.set(transaction.category, {
      category: transaction.category,
      total: transaction.amount,
      count: 1,
    });
  });

  return Array.from(grouped.values()).sort(
    (a, b) => Math.abs(b.total) - Math.abs(a.total),
  );
};

export const Timeline = ({
  transactions,
  selectedDate,
  onDateChange,
}: TimelineProps) => {
  const dayTransactions = getDayTransactions(transactions, selectedDate);

  const expenseTransactions = getPanelTransactions(dayTransactions, "expense");
  const incomeTransactions = getPanelTransactions(dayTransactions, "income");

  const expenseGroups = getCategoryGroups(expenseTransactions);
  const incomeGroups = getCategoryGroups(incomeTransactions);

  const expenseTotal = getTotal(expenseTransactions);
  const incomeTotal = getTotal(incomeTransactions);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-4">
        <Button
          variant="primary"
          aria-label="Previous day"
          onClick={() => onDateChange(addDays(selectedDate, -1))}
        >
          <ChevronLeftIcon className="size-5" />
        </Button>

        <form
          className="flex-1 px-4 py-2"
          aria-live="polite"
          onSubmit={(event) => event.preventDefault()}
        >
          <DateInput
            value={formatDate(selectedDate, { machine: true })}
            onChange={() => {}}
            onCommit={(nextDate) => {
              if (nextDate) {
                onDateChange(new Date(nextDate));
              }
            }}
            className="justify-center text-center"
          />
        </form>

        <Button
          variant="primary"
          aria-label="Next day"
          onClick={() => onDateChange(addDays(selectedDate, 1))}
        >
          <ChevronRightIcon className="size-5" />
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TimelinePanel
          sign="-"
          total={expenseTotal}
          groups={expenseGroups}
          emptyText="No expense transactions"
        />

        <TimelinePanel
          sign="+"
          total={incomeTotal}
          groups={incomeGroups}
          emptyText="No income transactions"
        />
      </div>
    </div>
  );
};
