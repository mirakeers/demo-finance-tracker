import { useState } from "react";

export const useTableFilters = <T extends Record<string, string>>(
  initialFilters: T,
) => {
  const [filters, setFilters] = useState<T>(initialFilters);

  const setFilter = <K extends keyof T>(key: K, value: T[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, setFilter, resetFilters };
};