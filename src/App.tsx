import { useMemo, useState } from "react";
import DataGrid from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { TransactionFormDialog } from "./components/TransactionForm/TransactionFormDialog";
import type {
  TransactionFormSubmitData,
  TransactionFormValues,
} from "./components/TransactionForm/TransactionForm";
import { Button } from "./components/ui/Button/Button";
import { useTransactions } from "./hooks/useTransactions";
import { useTransactionViewState } from "./hooks/useTransactionViewState";
import type { Transaction } from "./types";
import { mapTransactionToFormValues } from "./utils/transactionForm";

function App() {
  const { data, isLoading, addManualTransaction, updateTransaction } =
    useTransactions();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const {
    currentDay,
    filters,
    resetFilters,
    handleFilterChange,
    handleUseCurrentDayChange,
    handleCurrentDayChange,
  } = useTransactionViewState(new Date());

  const transactionFormMode = editingTransaction ? "edit" : "create";
  const transactionFormInitialValues = useMemo<
    Partial<TransactionFormValues> | undefined
  >(
    () =>
      editingTransaction
        ? mapTransactionToFormValues(editingTransaction)
        : undefined,
    [editingTransaction],
  );

  const openCreateTransactionForm = () => {
    setEditingTransaction(null);
    setIsTransactionFormOpen(true);
  };

  const openEditTransactionForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const closeTransactionForm = () => {
    setEditingTransaction(null);
    setIsTransactionFormOpen(false);
  };

  const handleSubmitTransaction = (formData: TransactionFormSubmitData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction, formData);
      resetFilters();
      closeTransactionForm();
      return;
    }

    addManualTransaction(formData);
    resetFilters();
    closeTransactionForm();
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
            <Button onClick={openCreateTransactionForm}>Add transaction</Button>
          </div>

          <DataGrid
            transactions={data}
            isLoading={isLoading}
            filters={filters}
            onFilterChange={handleFilterChange}
            onUseCurrentDayChange={handleUseCurrentDayChange}
            onEditTransaction={openEditTransactionForm}
          />
        </section>
      </main>

      <TransactionFormDialog
        open={isTransactionFormOpen}
        mode={transactionFormMode}
        initialValues={transactionFormInitialValues}
        onClose={closeTransactionForm}
        onSubmit={handleSubmitTransaction}
      />
    </div>
  );
}

export default App;
