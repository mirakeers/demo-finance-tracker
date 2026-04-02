import type { Transaction } from "../types";
import { mapImportedTransaction } from "./mapImportedTransactions";

type ImportedCsvRow = Record<string, string>;

export const parseCsv = (csv: string): ImportedCsvRow[] => {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    const row: ImportedCsvRow = {};
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim() ?? "";
    });
    return row;
  });
}

export const loadImportedTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/transactions`);
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const csv = await res.text();
  const rows = parseCsv(csv);
  return rows.reverse().map(mapImportedTransaction);
}