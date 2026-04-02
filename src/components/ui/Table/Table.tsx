import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type Alignment = "left" | "right" | "center";

export type ColumnFilter =
  | {
      type: "date" | "search" | "text" | "number";
      placeholder?: string;
      wrapperClass?: string;
      slot?: React.ReactNode;
    }
  | {
      type: "range";
      input: "date" | "number";
      minPlaceholder?: string;
      maxPlaceholder?: string;
      wrapperClass?: string;
      slot?: React.ReactNode;
    }
  | {
      type: "combobox";
      options: readonly string[];
      displayValue: (value: string) => string;
      renderOption?: (value: string) => React.ReactNode;
      placeholder?: string;
      wrapperClass?: string;
      slot?: React.ReactNode;
    };

export type TableColumn<
  Row,
  ColumnId extends keyof Row & string = keyof Row & string,
> = {
  id: ColumnId;
  header: ReactNode;
  wrapper?: (row: Row) => ReactNode;
  alignment?: Alignment;
  headerClassName?: string;
  cellClassName?: string;
  filter?: ColumnFilter;
};

type TableSortState<ColumnId extends string> = {
  column: ColumnId;
  direction: "asc" | "desc";
};

type TableProps<
  Row extends { id: string },
  ColumnId extends keyof Row & string = keyof Row & string,
> = {
  id?: string;
  columns: TableColumn<Row, ColumnId>[];
  rows: Row[];
  emptyState?: ReactNode;
  className?: string;
  onSort: (columnId: ColumnId) => void;
  sortState: TableSortState<ColumnId>;
};

const alignmentClassNames: Record<Alignment, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Table = <
  Row extends { id: string },
  ColumnId extends keyof Row & string = keyof Row & string,
>({
  id,
  columns,
  rows,
  emptyState = "No data available.",
  onSort,
  sortState,
  className = "",
}: TableProps<Row, ColumnId>) => (
  <table id={id} className={`min-w-full text-t-light ${className}`}>
    <thead>
      <tr>
        {columns.map(({ id, header, headerClassName = "" }) => (
          <th
            key={id}
            onClick={() => onSort(id)}
            className={`
              cursor-pointer px-4 py-2 text-sm font-semibold transition-colors
              ${sortState.column === id ? "text-t-base" : ""}
              ${headerClassName}
            `}
          >
            <span className="flex items-center justify-between gap-1">
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
                  className={`
                    border-b-4 border-b-page bg-b-card px-4 py-1 text-slate-300
                    ${alignmentClassNames[alignment]}
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
