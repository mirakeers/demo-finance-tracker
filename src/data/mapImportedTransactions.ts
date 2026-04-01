import type { Category, Transaction } from "../types";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

const categoryMap: Record<string, Category> = {
  // Food
  "groceries": "groceries",
  "food & drink": "food_drink",
  "food and drink": "food_drink",
  "dining": "dining",
  "restaurants": "dining",

  // Transport
  "transport": "transport",
  "transportation": "transport",
  "travel": "travel",

  // Shopping / lifestyle
  "shopping": "shopping",
  "personal care": "personal_care",
  "entertainment": "entertainment",

  // Housing / obligations
  "bills & utilities": "bills_utilities",
  "bills and utilities": "bills_utilities",
  "utilities": "bills_utilities",
  "rent": "rent",
  "insurance": "insurance",
  "taxes": "taxes",

  // Health
  "healthcare": "healthcare",
  "health": "healthcare",

  // Growth
  "education": "education",
  "savings": "savings",
  "investments": "investments",

  // Social
  "gifts & donations": "gifts_donations",
  "gifts and donations": "gifts_donations",
  "donations": "gifts_donations",
};

export const mapCategory = (raw: string): Category => {
  return categoryMap[normalize(raw)] ?? "misc";
}

export const mapImportedTransaction = (
  row: Record<string, string>,
  index: number,
): Transaction => ({
  id: `import-${(index + 1).toString().padStart(3, "0")}`,
  date: row.Date,
  description: row["Transaction Description"]?.trim() ?? "",
  category: mapCategory(row.Category),
  amount: Number(row.Amount),
  source: "imported",
});