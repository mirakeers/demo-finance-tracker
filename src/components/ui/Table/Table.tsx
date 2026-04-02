import type { ReactNode } from "react";

type Alignment = "left" | "right" | "center";

export type TableColumn<Row> = {
  id: keyof Row & string;
  header: ReactNode;
  wrapper?: (row: Row) => ReactNode;
  alignment?: Alignment;
  headerClassName?: string;
  cellClassName?: string;
};

type TableProps<Row extends { id: string }> = {
  id?: string;
  columns: TableColumn<Row>[];
  rows: Row[];
  emptyState?: ReactNode;
  className?: string;
};

export const Table = <Row extends { id: string }>({
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
              key={id}
              className={`px-4 py-2 text-sm font-semibol text-t-base 
                text-${alignment} 
                ${headerClassName}
                `}
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
