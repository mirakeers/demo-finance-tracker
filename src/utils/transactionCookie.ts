import type { Transaction } from "../types";

const MANUAL_TRANSACTIONS_COOKIE_KEY = "manual-transactions";
const TRANSACTION_OVERRIDES_COOKIE_KEY = "transaction-overrides";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type SerializedTransaction = Omit<Transaction, "date"> & {
  date: string;
};

export type TransactionOverride = {
  id: string;
  date?: string;
  category?: Transaction["category"];
  amount?: number;
  description?: string;
};

const serializeTransactions = (
  transactions: Transaction[],
): SerializedTransaction[] =>
  transactions.map((transaction) => ({
    ...transaction,
    date: transaction.date.toISOString(),
  }));

const deserializeTransactions = (
  transactions: SerializedTransaction[],
): Transaction[] =>
  transactions.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));

const readCookieValue = (key: string) => {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${key}=`));

  return entry ? decodeURIComponent(entry.split("=").slice(1).join("=")) : null;
};

const writeCookieValue = (key: string, value: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};

export const readManualTransactionsFromCookie = (): Transaction[] => {
  try {
    const cookieValue = readCookieValue(MANUAL_TRANSACTIONS_COOKIE_KEY);
    if (!cookieValue) return [];

    const parsed = JSON.parse(cookieValue) as SerializedTransaction[];
    return deserializeTransactions(parsed);
  } catch {
    return [];
  }
};

export const writeManualTransactionsToCookie = (transactions: Transaction[]) => {
  writeCookieValue(
    MANUAL_TRANSACTIONS_COOKIE_KEY,
    JSON.stringify(serializeTransactions(transactions)),
  );
};

export const readTransactionOverridesFromCookie = (): TransactionOverride[] => {
  try {
    const cookieValue = readCookieValue(TRANSACTION_OVERRIDES_COOKIE_KEY);
    if (!cookieValue) return [];

    return JSON.parse(cookieValue) as TransactionOverride[];
  } catch {
    return [];
  }
};

export const writeTransactionOverridesToCookie = (
  overrides: TransactionOverride[],
) => {
  writeCookieValue(TRANSACTION_OVERRIDES_COOKIE_KEY, JSON.stringify(overrides));
};