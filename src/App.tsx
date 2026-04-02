import DataGrid from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { TransactionFormDialog } from "./components/TransactionForm/TransactionFormDialog";
import type { TransactionFormSubmitData } from "./components/TransactionForm/TransactionForm";
import { Button } from "./components/ui/Button/Button";
import { useTransactions } from "./hooks/useTransactions";
import { useTransactionViewState } from "./hooks/useTransactionViewState";
import { useState } from "react";
import type { Transaction } from "./types";

const createManualTransaction = (
  data: TransactionFormSubmitData,
): Transaction => ({
  id: crypto.randomUUID(),
  ...data,
});

function App() {
  const { data, addManualTransaction } = useTransactions();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const {
    currentDay,
    filters,
    handleFilterChange,
    handleUseCurrentDayChange,
    handleCurrentDayChange,
  } = useTransactionViewState(new Date());

  const handleAddTransaction = (formData: TransactionFormSubmitData) => {
    addManualTransaction(createManualTransaction(formData));
    setIsTransactionFormOpen(false);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 py-8 md:px-32">
      <header>
        <h1>Spending tracker</h1>
      </header>

      <main className="flex flex-col gap-4 font-sans md:gap-8">
        <section>
          <h2 className="sr-only">Timeline</h2>
          <Timeline
            transactions={data}
            selectedDate={currentDay}
            onDateChange={handleCurrentDayChange}
          />
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex justify-between gap-4">
            <h2>My transactions</h2>
            <Button onClick={() => setIsTransactionFormOpen(true)}>
              Add transaction
            </Button>
          </div>

          <DataGrid
            transactions={data}
            filters={filters}
            onFilterChange={handleFilterChange}
            onUseCurrentDayChange={handleUseCurrentDayChange}
          />
        </section>
      </main>

      <TransactionFormDialog
        open={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}

export default App;
