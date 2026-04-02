import { useCallback, useState } from "react";
import {
  INITIAL_TRANSACTION_FILTERS,
  type TransactionFilters,
} from "../types";
import { formatDate } from "../utils/formatDate";

export function useTransactionFilters(initialDay: Date) {
  const [currentDay, setCurrentDay] = useState(initialDay);

  const [filters, setFilters] = useState<TransactionFilters>({
    ...INITIAL_TRANSACTION_FILTERS,
    useCurrentDay: true,
    dateMin: formatDate(initialDay, { machine: true }),
    dateMax: formatDate(initialDay, { machine: true }),
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
        const nextDate = formatDate(currentDay, { machine: true });

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

  const handleCurrentDayChange = useCallback((nextDay: Date) => {
    setCurrentDay(nextDay);

    const nextDate = formatDate(nextDay, { machine: true });

    setFilters((current) => {
      if (!current.useCurrentDay) return current;

      return {
        ...current,
        dateMin: nextDate,
        dateMax: nextDate,
      };
    });
  }, []);

  return {
    currentDay,
    filters,
    handleFilterChange,
    handleUseCurrentDayChange,
    handleCurrentDayChange,
  };
}