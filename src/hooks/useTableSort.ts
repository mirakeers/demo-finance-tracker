import { useMemo, useState } from "react";

export type TableSort<ColumnId extends string> = {
  column: ColumnId;
  direction: "asc" | "desc";
};

export const useTableSort = <
  Row extends Record<string, unknown>,
  ColumnId extends keyof Row & string,
>(
  rows: Row[],
  initialSort: TableSort<ColumnId>,
) => {
  const [sort, setSort] = useState<TableSort<ColumnId>>(initialSort);

  const sortedRows = useMemo(() => {
    const { column, direction } = sort;

    return [...rows].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === bValue) return 0;

      const result =
        typeof aValue === "number" && typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));

      return direction === "asc" ? result : -result;
    });
  }, [rows, sort]);

  const handleSort = (column: string) => {
    setSort((current) => {
      if (current.column !== column) {
        return { column: column as ColumnId, direction: "asc" };
      }

      return {
        column: current.column,
        direction: current.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  return { sort, sortedRows, handleSort };
};