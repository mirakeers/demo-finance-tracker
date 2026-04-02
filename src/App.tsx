import DataGrid from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { useTransactions } from "./hooks/useTransactions";
import { useTransactionViewState } from "./hooks/useTransactionViewState";

function App() {
  const { data } = useTransactions();
  const {
    currentDay,
    filters,
    handleFilterChange,
    handleUseCurrentDayChange,
    handleCurrentDayChange,
  } = useTransactionViewState(new Date());

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-8 md:px-32">
      <header>
        <h1>Spending tracker</h1>
      </header>

      <main className="flex flex-col gap-4 font-sans md:gap-8">
        <h2 className="sr-only">Timeline</h2>
        <Timeline
          transactions={data}
          selectedDate={currentDay}
          onDateChange={handleCurrentDayChange}
        />

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
