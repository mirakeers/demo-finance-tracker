import { addDays, format, parseISO } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Transaction } from "../../types";
import { Button } from "../ui/Button/Button";
import { TimelinePanel, type TimelineCategoryGroup } from "./TimelinePanel";

type TimelineProps = {
  transactions: Transaction[];
  selectedDate: string;
  onDateChange: (nextDate: string) => void;
};

const getDayTransactions = (
  transactions: Transaction[],
  selectedDate: string,
) => transactions.filter((transaction) => transaction.date === selectedDate);

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

const getHeaderLabel = (selectedDate: string) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(parseISO(selectedDate), "dd.MM.yyyy");

  return selectedDate === today ? `${formattedDate} (today)` : formattedDate;
};

const getNextDate = (selectedDate: string, diff: number) =>
  format(addDays(parseISO(selectedDate), diff), "yyyy-MM-dd");

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
    <section className="flex flex-col gap-4">
      <header className="flex items-center gap-4">
        <Button
          variant="primary"
          aria-label="Previous day"
          onClick={() => onDateChange(getNextDate(selectedDate, -1))}
        >
          <ChevronLeftIcon className="size-5" />
        </Button>

        <div
          className="flex-1 bg-b-card px-4 py-2 text-center text-xl font-semibold text-t-base"
          aria-live="polite"
        >
          {getHeaderLabel(selectedDate)}
        </div>

        <Button
          variant="primary"
          aria-label="Next day"
          onClick={() => onDateChange(getNextDate(selectedDate, 1))}
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
    </section>
  );
};
