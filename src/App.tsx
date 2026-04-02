import { useCallback, useState } from "react";
import { format, parseISO } from "date-fns";
import { Card } from "./components/ui/Card/Card";
import DataGrid from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { useTransactions } from "./hooks/useTransactions";
import { INITIAL_TRANSACTION_FILTERS, type TransactionFilters } from "./types";

const formatFilterDate = (date: string) => format(parseISO(date), "dd/MM/yyyy");

function App() {
  const { data } = useTransactions();

  const [currentDay, setCurrentDay] = useState("2026-04-01");
  const [filters, setFilters] = useState<TransactionFilters>({
    ...INITIAL_TRANSACTION_FILTERS,
    useCurrentDay: true,
    dateMin: formatFilterDate("2026-04-01"),
    dateMax: formatFilterDate("2026-04-01"),
  });

  const handleFilterChange = useCallback(
    <K extends keyof TransactionFilters>(
      key: K,
      value: TransactionFilters[K],
    ) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const handleUseCurrentDayChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        const nextDate = formatFilterDate(currentDay);

        setFilters((current) => ({
          ...current,
          useCurrentDay: true,
          dateMin: nextDate,
          dateMax: nextDate,
        }));
        return;
      }

      setFilters((current) => ({
        ...current,
        useCurrentDay: false,
        dateMin: "",
        dateMax: "",
      }));
    },
    [currentDay],
  );

  const handleCurrentDayChange = useCallback(
    (nextDay: string) => {
      setCurrentDay(nextDay);

      if (!filters.useCurrentDay) return;

      const nextDate = formatFilterDate(nextDay);

      setFilters((current) => ({
        ...current,
        dateMin: nextDate,
        dateMax: nextDate,
      }));
    },
    [filters.useCurrentDay],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-8 md:px-32">
      <header>
        <h1>Spending tracker</h1>
      </header>

      <main className="flex flex-col gap-4 font-sans md:gap-8">
        <h2 className="sr-only">Timeline</h2>
        <Card>
          <Timeline
            transactions={data}
            selectedDate={currentDay}
            onDateChange={handleCurrentDayChange}
          />
        </Card>

        <h2>My transactions</h2>
        <DataGrid
          transactions={data}
          filters={filters}
          onFilterChange={handleFilterChange}
          onUseCurrentDayChange={handleUseCurrentDayChange}
        />
      </main>
    </div>
  );
}

export default App;
