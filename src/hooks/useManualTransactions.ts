import { useMemo, useState } from "react";
import type { Transaction } from "../types";
import type { TransactionFormSubmitData } from "../components/TransactionForm/TransactionForm";

const createManualTransaction = (
  data: TransactionFormSubmitData,
): Transaction => ({
  id: crypto.randomUUID(),
  ...data,
});

export const useManualTransactions = (importedTransactions: Transaction[]) => {
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>([]);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const transactions = useMemo(
    () => [...manualTransactions, ...importedTransactions],
    [manualTransactions, importedTransactions],
  );

  const openTransactionForm = () => setIsTransactionFormOpen(true);
  const closeTransactionForm = () => setIsTransactionFormOpen(false);

  const handleAddTransaction = (data: TransactionFormSubmitData) => {
    setManualTransactions((current) => [
      createManualTransaction(data),
      ...current,
    ]);
    closeTransactionForm();
  };

  return {
    transactions,
    isTransactionFormOpen,
    openTransactionForm,
    closeTransactionForm,
    handleAddTransaction,
  };
};