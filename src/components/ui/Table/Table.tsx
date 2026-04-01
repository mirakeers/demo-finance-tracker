import type { ReactNode } from "react";

export type TableColumn<Row> = {
  id: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  alignment?: "left" | "right" | "center";
  headerClassName?: string;
  cellClassName?: string;
};

type TableProps<Row> = {
  id?: string;
  columns: TableColumn<Row>[];
  rows: Row[];
  emptyState?: ReactNode;
  className?: string;
};

export const Table = <Row,>({
  id,
  columns,
  rows,
  emptyState = "No data available.",
  className = "",
}: TableProps<Row>) => (
  <table id={id} className={`min-w-full text-t-light ${className}`}>
    <thead>
      <tr>
        {columns.map(
          ({ id, header, alignment = "left", headerClassName = "" }) => (
            <th
              className={`
                px-4 py-2 font-semibold text-sm text-t-base 
                text-${alignment}
                ${headerClassName}
              `}
              key={id}
            >
              {header}
            </th>
          ),
        )}
      </tr>
    </thead>

    <tbody>
      {rows.length === 0 ? (
        <tr>
          <td colSpan={columns.length}>{emptyState}</td>
        </tr>
      ) : (
        rows.map((row) => (
          <tr key={`table-{id}`}>
            {columns.map(
              ({ id, cell, alignment = "left", cellClassName = "" }) => (
                <td
                  key={id}
                  className={`
                    bg-b-card px-4 py-1 text-slate-300 border-b-4 border-b-page 
                    text-${alignment}
                    ${cellClassName}
                  `}
                >
                  {cell(row)}
                </td>
              ),
            )}
          </tr>
        ))
      )}
    </tbody>
  </table>
);
