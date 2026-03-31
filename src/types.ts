export type TransactionSource = "imported" | "modified" | "manual";

export type Category =
  | "groceries"
  | "food_drink"
  | "dining"
  | "transport"
  | "shopping"
  | "entertainment"
  | "bills_utilities"
  | "rent"
  | "healthcare"
  | "travel"
  | "education"
  | "personal_care"
  | "insurance"
  | "taxes"
  | "savings"
  | "investments"
  | "gifts_donations"
  | "misc";

export type ColorClass = "amber" | "lime" | "emerald" | "cyan" | "blue" | "violet" | "fuchsia" | "rose";

export type Transaction = {
  id: string;
  date: string; // ISO string
  amount: number;
  description: string;
  category: Category;
  source: TransactionSource;
};