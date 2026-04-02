import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "../types";
import { loadImportedTransactions } from "../data/loadImportedTransations";
import {
  readManualTransactionsFromCookie,
  readTransactionOverridesFromCookie,
  writeManualTransactionsToCookie,
  writeTransactionOverridesToCookie,
  type TransactionOverride,
} from "../utils/transactionCookie";
import type { TransactionFormSubmitData } from "../components/TransactionForm/TransactionForm";
import {
  createTransactionOverride,
  createManualTransaction,
} from "../utils/transactionForm";

const applyOverride = (
  transaction: Transaction,
  override?: TransactionOverride,
): Transaction => {
  if (!override) return transaction;

  return {
    ...transaction,
    date: override.date ? new Date(override.date) : transaction.date,
    category: override.category ?? transaction.category,
    amount: override.amount ?? transaction.amount,
    description: override.description ?? transaction.description,
    source: "modified",
  };
};

export const useTransactions = () => {
  const [importedTransactions, setImportedTransactions] = useState<Transaction[]>(
    [],
  );
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>(
    () => readManualTransactionsFromCookie(),
  );
  const [transactionOverrides, setTransactionOverrides] = useState<
    TransactionOverride[]
  >(() => readTransactionOverridesFromCookie());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    loadImportedTransactions()
      .then((res) => {
        if (mounted) {
          setImportedTransactions(res);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load transactions");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const data = useMemo(() => {
    const overrideMap = new Map(
      transactionOverrides.map((override) => [override.id, override]),
    );

    const mergedImportedTransactions = importedTransactions.map((transaction) =>
      applyOverride(transaction, overrideMap.get(transaction.id)),
    );

    return [...manualTransactions, ...mergedImportedTransactions];
  }, [manualTransactions, importedTransactions, transactionOverrides]);

  const addManualTransaction = (formData: TransactionFormSubmitData) => {
    setManualTransactions((current) => {
      const next = [createManualTransaction(formData), ...current];
      writeManualTransactionsToCookie(next);
      return next;
    });
  };

  const updateTransaction = (
    transaction: Transaction,
    formData: TransactionFormSubmitData,
  ) => {
    if (transaction.source === "manual") {
      setManualTransactions((current) => {
        const next: Transaction[] = current.map((item) =>
          item.id === transaction.id
            ? ({
              ...item,
              ...formData,
              source: "manual",
            } satisfies Transaction)
            : item,
        );

        writeManualTransactionsToCookie(next);
        return next;
      });

      return;
    }

    setTransactionOverrides((current) => {
      const nextOverride = createTransactionOverride(transaction, formData);
      const next = [
        ...current.filter((override) => override.id !== transaction.id),
        nextOverride,
      ];

      writeTransactionOverridesToCookie(next);
      return next;
    });
  };

  return {
    data,
    loading,
    error,
    addManualTransaction,
    updateTransaction,
  };
};