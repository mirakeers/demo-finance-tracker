import { Table, type TableColumn } from "../ui/Table/Table";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { useTranslation } from "react-i18next";
import { TablePagination } from "../ui/Table/TablePagination";
import { useMemo, useState } from "react";

type DataGridProps = {
  transactions: Transaction[];
};

export default function DataGrid({ transactions }: DataGridProps) {
  const { t } = useTranslation();
  const columns: TableColumn<Transaction>[] = [
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
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  type TypeSort = {
    column: string;
    direction: "asc" | "desc";
  };
  const INITIAL_SORT: TypeSort = { column: "date", direction: "desc" };
  const [sort, setSort] = useState<TypeSort>(INITIAL_SORT);

  const sortedRows = useMemo(() => {
    if (!sort) return transactions;

    const { column, direction } = sort;

    return [...transactions].sort((a, b) => {
      const aVal = a[column as keyof Transaction];
      const bVal = b[column as keyof Transaction];

      if (aVal === bVal) return 0;

      const result =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));

      return direction === "asc" ? result : -result;
    });
  }, [transactions, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  const visibleRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return sortedRows.slice(start, end);
  }, [sortedRows, page, pageSize]);

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setPage((currentPage) => Math.min(pageCount, currentPage + 1));
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const handleSort = (column: string) => {
    setSort((prev) => {
      if (prev.direction === "asc") {
        return { column, direction: "desc" };
      } else {
        return { column, direction: "asc" };
      }
      return INITIAL_SORT;
    });
  };

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
