import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { Table, type TableColumn } from "../ui/Table/Table";
import { useTableSort, type TableSort } from "../../hooks/useTableSort";
import { useTablePagination } from "../../hooks/useTablePagination";
import { TablePagination } from "../ui/Table/TablePagination";

type DataGridProps = {
  transactions: Transaction[];
};

const INITIAL_SORT: TableSort<keyof Transaction & string> = {
  column: "date",
  direction: "desc",
};

export default function DataGrid({ transactions }: DataGridProps) {
  const { t } = useTranslation();

  const columns = useMemo<TableColumn<Transaction>[]>(
    () => [
      {
        id: "date",
        header: t(($) => $.transactions.date),
        wrapper: ({ date }) => <span className="text-nowrap">{date}</span>,
      },
      {
        id: "amount",
        header: t(($) => $.transactions.amount),
        wrapper: ({ amount }) => formatCurrency(amount),
        alignment: "right",
        headerClassName: "min-w-28",
      },
      {
        id: "description",
        header: t(($) => $.transactions.description),
        headerClassName: "w-full",
      },
      {
        id: "category",
        header: t(($) => $.transactions.category),
        headerClassName: "min-w-44",
        wrapper: ({ category }) => <CategoryBadge category={category} />,
      },
      {
        id: "source",
        header: t(($) => $.transactions.source),
      },
    ],
    [t],
  );

  const { sort, sortedRows, handleSort } = useTableSort(
    transactions,
    INITIAL_SORT,
  );

  const {
    page,
    pageSize,
    visibleRows,
    handlePreviousPage,
    handleNextPage,
    handlePageSizeChange,
  } = useTablePagination(sortedRows);

  return (
    <section className="flex flex-col gap-4">
      <Table
        id="transactions"
        columns={columns}
        rows={visibleRows}
        onSort={handleSort}
        sortState={sort}
      />

      <TablePagination
        page={page}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        totalItems={transactions.length}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </section>
  );
}
