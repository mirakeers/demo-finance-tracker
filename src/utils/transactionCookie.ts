import type { Transaction } from "../types";

const TRANSACTIONS_COOKIE_KEY = "manual-transactions";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type SerializedTransaction = Omit<Transaction, "date"> & {
  date: string;
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

export const readManualTransactionsFromCookie = (): Transaction[] => {
  try {
    const cookieValue = readCookieValue(TRANSACTIONS_COOKIE_KEY);
    if (!cookieValue) return [];

    const parsed = JSON.parse(cookieValue) as SerializedTransaction[];
    return deserializeTransactions(parsed);
  } catch {
    return [];
  }
};

export const writeManualTransactionsToCookie = (
  transactions: Transaction[],
) => {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(
    JSON.stringify(serializeTransactions(transactions)),
  );

  document.cookie = `${TRANSACTIONS_COOKIE_KEY}=${value}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};