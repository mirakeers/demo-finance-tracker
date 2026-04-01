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

export const loadImportedTransactions = async () => {
  const res = await fetch("/api/transactions");
  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const csv = await res.text();
  const rows = parseCsv(csv);
  console.log("succesfully got transactions", rows)
  //return rows.map(mapImportedTransaction);
}