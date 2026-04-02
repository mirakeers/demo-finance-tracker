import { useMemo, useState } from "react";

export type TableSort<ColumnId extends string> = {
  column: ColumnId;
  direction: "asc" | "desc";
};

const compareValues = (aValue: unknown, bValue: unknown) => {
  if (aValue === bValue) return 0;

  if (typeof aValue === "number" && typeof bValue === "number") {
    return aValue - bValue;
  }

  if (aValue instanceof Date && bValue instanceof Date) {
    return aValue.getTime() - bValue.getTime();
  }

  return String(aValue).localeCompare(String(bValue));
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
      const result = compareValues(a[column], b[column]);
      return direction === "asc" ? result : -result;
    });
  }, [rows, sort]);

  const handleSort = (column: ColumnId) => {
    setSort((current) => {
      if (current.column !== column) {
        return { column, direction: "asc" };
      }

      return {
        column: current.column,
        direction: current.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  return { sort, sortedRows, handleSort };
};