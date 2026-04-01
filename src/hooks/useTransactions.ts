import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import { loadImportedTransactions } from "../data/loadImportedTransations";

export const useTransactions = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    loadImportedTransactions()
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch(() => {
        if (mounted) setError("Failed to load transactions");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);
  return { data, loading, error };
}