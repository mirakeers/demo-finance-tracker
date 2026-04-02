import { useCallback, useState } from "react";
import { formatDate } from "../utils/formatDate";
import {
  INITIAL_TRANSACTION_FILTERS,
  type TransactionFilters,
} from "../types";

export const useTransactionViewState = (initialDay: Date) => {
  const [currentDay, setCurrentDay] = useState(initialDay);
  const [filters, setFilters] = useState<TransactionFilters>(() => {
    const today = formatDate(initialDay, { machine: true });

    return {
      ...INITIAL_TRANSACTION_FILTERS,
      dateMin: INITIAL_TRANSACTION_FILTERS.useCurrentDay ? today : "",
      dateMax: INITIAL_TRANSACTION_FILTERS.useCurrentDay ? today : "",
    };
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
      setFilters((current) => {
        if (!checked) {
          return {
            ...current,
            useCurrentDay: false,
            dateMin: "",
            dateMax: "",
          };
        }

        const nextDate = formatDate(currentDay, { machine: true });

        return {
          ...current,
          useCurrentDay: true,
          dateMin: nextDate,
          dateMax: nextDate,
        };
      });
    },
    [currentDay],
  );

  const handleCurrentDayChange = useCallback((nextDay: Date) => {
    setCurrentDay(nextDay);

    setFilters((current) => {
      if (!current.useCurrentDay) {
        return current;
      }

      const nextDate = formatDate(nextDay, { machine: true });

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
};