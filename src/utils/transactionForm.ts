import { formatDate } from "./formatDate";
import type { Transaction } from "../types";
import type {
  TransactionFormSubmitData,
  TransactionFormValues,
} from "../components/TransactionForm/TransactionForm";
import type { TransactionOverride } from "./transactionCookie";

export const createManualTransaction = (
  data: TransactionFormSubmitData,
): Transaction => ({
  id: crypto.randomUUID(),
  ...data,
});

export const mapTransactionToFormValues = (
  transaction: Transaction,
): TransactionFormValues => ({
  date: formatDate(transaction.date, { machine: true }),
  category: transaction.category,
  amount: String(transaction.amount),
  description: transaction.description,
});

export const createTransactionOverride = (
  transaction: Transaction,
  data: TransactionFormSubmitData,
): TransactionOverride => {
  const override: TransactionOverride = {
    id: transaction.id,
  };

  const nextDate = formatDate(data.date, { machine: true });
  const currentDate = formatDate(transaction.date, { machine: true });

  if (nextDate !== currentDate) {
    override.date = nextDate;
  }

  if (data.category !== transaction.category) {
    override.category = data.category;
  }

  if (data.amount !== transaction.amount) {
    override.amount = data.amount;
  }

  if (data.description !== transaction.description) {
    override.description = data.description;
  }

  return override;
};