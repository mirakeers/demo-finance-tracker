import type { Category } from "./data/categories";

export type TransactionSource = "imported" | "modified" | "manual";

export type ColorClass = "amber" | "lime" | "emerald" | "cyan" | "blue" | "violet" | "fuchsia" | "rose";

export type Transaction = {
  id: string;
  date: string; // ISO string
  amount: number;
  description: string;
  category: Category;
  source: TransactionSource;
};

export type TransactionFilters = {
  useCurrentDay: boolean;
  dateMin: string;
  dateMax: string;
  amountMin: string;
  amountMax: string;
  description: string;
  category: string;
  source: string;
};

export const INITIAL_TRANSACTION_FILTERS: TransactionFilters = {
  useCurrentDay: true,
  dateMin: "",
  dateMax: "",
  amountMin: "",
  amountMax: "",
  description: "",
  category: "",
  source: "",
};