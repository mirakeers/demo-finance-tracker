import type { Category } from "../types";

//needs to be defined like this so that tailwind registers the color classes
const colorClasses = {
  lime: "bg-lime-950 text-lime-200",
  cyan: "bg-cyan-950 text-cyan-200",
  violet: "bg-violet-950 text-violet-200",
  fuchsia: "bg-fuchsia-950 text-fuchsia-200",
  amber: "bg-amber-950 text-amber-200",
  rose: "bg-rose-950 text-rose-200",
  blue: "bg-blue-950 text-blue-200",
  emerald: "bg-emerald-950 text-emerald-200",
};

const categoryColorMap: Record<Category, keyof typeof colorClasses> = {
  groceries: "lime",
  food_drink: "lime",
  dining: "lime",
  transport: "cyan",
  travel: "cyan",
  shopping: "violet",
  personal_care: "violet",
  entertainment: "fuchsia",
  gifts_donations: "fuchsia",
  bills_utilities: "amber",
  rent: "amber",
  insurance: "amber",
  taxes: "amber",
  healthcare: "rose",
  education: "blue",
  misc: "blue",
  savings: "emerald",
  investments: "emerald",
};
export const getCategoryColor = (category: Category): string => {
  return categoryColorMap[category];
}
export const getCategoryBadgeCss = (category: Category): string => {
  return colorClasses[categoryColorMap[category]];
}