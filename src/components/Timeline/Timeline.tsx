import { addDays, format, parseISO } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { Button } from "../ui/Button/Button";

type TimelineProps = {
  transactions: Transaction[];
  selectedDate: string;
  onDateChange: (nextDate: string) => void;
};

type TimelineGroup = {
  total: number;
  items: Transaction[];
};

const getDayTransactions = (
  transactions: Transaction[],
  selectedDate: string,
) => transactions.filter((transaction) => transaction.date === selectedDate);

const getTimelineGroup = (
  transactions: Transaction[],
  kind: "expense" | "income",
): TimelineGroup => {
  const items = transactions.filter((transaction) =>
    kind === "expense" ? transaction.amount < 0 : transaction.amount > 0,
  );

  const total = items.reduce((sum, transaction) => sum + transaction.amount, 0);

  return { total, items };
};

const getHeaderLabel = (selectedDate: string) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const formattedDate = format(parseISO(selectedDate), "dd.MM.yyyy");

  return selectedDate === today ? `${formattedDate} (today)` : formattedDate;
};

export const Timeline = ({
  transactions,
  selectedDate,
  onDateChange,
}: TimelineProps) => {
  const dayTransactions = getDayTransactions(transactions, selectedDate);
  const expenses = getTimelineGroup(dayTransactions, "expense");
  const income = getTimelineGroup(dayTransactions, "income");

  const handlePreviousDay = () => {
    onDateChange(format(addDays(parseISO(selectedDate), -1), "yyyy-MM-dd"));
  };

  const handleNextDay = () => {
    onDateChange(format(addDays(parseISO(selectedDate), 1), "yyyy-MM-dd"));
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center gap-4">
        <Button
          variant="primary"
          aria-label="Previous day"
          onClick={handlePreviousDay}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <div
          className="flex-1 bg-b-card px-4 py-2 text-center text-xl font-semibold text-t-base"
          aria-live="polite"
        >
          {getHeaderLabel(selectedDate)}
        </div>

        <Button variant="primary" aria-label="Next day" onClick={handleNextDay}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TimelinePanel
          title="-"
          total={expenses.total}
          items={expenses.items}
          emptyText="No expense transactions"
        />

        <TimelinePanel
          title="+"
          total={income.total}
          items={income.items}
          emptyText="No income transactions"
        />
      </div>
    </section>
  );
};

type TimelinePanelProps = {
  title: "-" | "+";
  total: number;
  items: Transaction[];
  emptyText: string;
};

const TimelinePanel = ({
  title,
  total,
  items,
  emptyText,
}: TimelinePanelProps) => {
  return (
    <section className="flex min-h-56 flex-col gap-6 bg-b-card p-6">
      <header className="flex items-center gap-4">
        <span className="text-3xl font-semibold text-t-base">{title}</span>
        <span className="text-5xl font-semibold tracking-tight text-t-base">
          {formatCurrency(Math.abs(total))}
        </span>
      </header>

      {items.length === 0 ? (
        <p className="my-auto text-center text-lg text-t-muted">{emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((transaction) => (
            <li
              key={transaction.id}
              className="flex items-center justify-between gap-4"
            >
              <CategoryBadge category={transaction.category} />

              <div className="flex items-center gap-3 text-lg text-t-base">
                <span>{formatCurrency(Math.abs(transaction.amount))}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
