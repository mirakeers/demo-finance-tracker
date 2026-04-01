
export const categories = [
  "groceries",
  "food_drink",
  "dining",
  "transport",
  "shopping",
  "entertainment",
  "bills_utilities",
  "rent",
  "healthcare",
  "travel",
  "education",
  "personal_care",
  "insurance",
  "taxes",
  "savings",
  "investments",
  "gifts_donations",
  "misc"
] as const;

export type Category = typeof categories[number];