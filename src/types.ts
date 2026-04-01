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