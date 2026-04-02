import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "../types";
import { loadImportedTransactions } from "../data/loadImportedTransations";
import { readManualTransactionsFromCookie, writeManualTransactionsToCookie } from "../utils/transactionCookie";

export const useTransactions = () => {
  const [importedTransactions, setImportedTransactions] = useState<Transaction[]>(
    [],
  );
  const [manualTransactions, setManualTransactions] = useState<Transaction[]>(
    () => readManualTransactionsFromCookie(),
  );
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

  const addManualTransaction = (transaction: Transaction) => {
    setManualTransactions((current) => {
      const next = [transaction, ...current];
      writeManualTransactionsToCookie(next);
      return next;
    });
  };

  const data = useMemo(
    () => [...manualTransactions, ...importedTransactions],
    [manualTransactions, importedTransactions],
  );

  return {
    data,
    loading,
    error,
    addManualTransaction,
  };
};