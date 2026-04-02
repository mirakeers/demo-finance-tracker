import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type Alignment = "left" | "right" | "center";

export type ColumnFilter =
  | {
      type: "text" | "search" | "number";
      placeholder?: string;
    }
  | {
      type: "date";
      placeholder?: string;
    }
  | {
      type: "combobox";
      options: readonly string[];
      displayValue: (value: string) => string;
      renderOption?: (value: string) => ReactNode;
      placeholder?: string;
    };

export type TableColumn<Row> = {
  id: keyof Row & string;
  header: ReactNode;
  wrapper?: (row: Row) => ReactNode;
  alignment?: Alignment;
  headerClassName?: string;
  cellClassName?: string;
  filter?: ColumnFilter;
};

type TableProps<Row extends { id: string }> = {
  id?: string;
  columns: TableColumn<Row>[];
  rows: Row[];
  emptyState?: ReactNode;
  className?: string;
  onSort: (columnId: string) => void;
  sortState: {
    column: string;
    direction: "asc" | "desc";
  };
};

export const Table = <Row extends { id: string }>({
  id,
  columns,
  rows,
  emptyState = "No data available.",
  onSort,
  sortState,
  className = "",
}: TableProps<Row>) => (
  <table id={id} className={`min-w-full text-t-light ${className}`}>
    <thead>
      <tr>
        {columns.map(({ id, header, headerClassName = "" }) => (
          <th
            onClick={() => onSort?.(id)}
            key={id}
            className={`
                px-4 py-2 text-sm font-semibold cursor-pointer transition-colors
                ${sortState.column === id ? "text-t-base" : ""}
                ${headerClassName}
                `}
          >
            <span className="flex items-center justify-between gap-1 ">
              {header}

              {sortState.column !== id ? (
                <ChevronUpDownIcon className="size-2" />
              ) : sortState.direction === "asc" ? (
                <ChevronUpIcon className="size-2" />
              ) : (
                <ChevronDownIcon className="size-2" />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {rows.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="bg-b-card px-4 py-4 text-slate-400"
          >
            {emptyState}
          </td>
        </tr>
      ) : (
        rows.map((row) => (
          <tr key={row.id}>
            {columns.map(
              ({ id, wrapper, alignment = "left", cellClassName = "" }) => (
                <td
                  key={id}
                  className={`border-b-4 border-b-page bg-b-card px-4 py-1 text-slate-300 
                    text-${alignment} 
                    ${cellClassName}
                    `}
                >
                  {wrapper ? wrapper(row) : (row[id] as ReactNode)}
                </td>
              ),
            )}
          </tr>
        ))
      )}
    </tbody>
  </table>
);
