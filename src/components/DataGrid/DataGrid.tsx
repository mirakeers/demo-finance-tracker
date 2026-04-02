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
    },
    {
      id: "description",
      header: t(($) => $.transactions.description),
      headerClassName: "w-full",
    },
    {
      id: "category",
      header: t(($) => $.transactions.category),
      wrapper: ({ category }) => <CategoryBadge category={category} />,
    },
    {
      id: "source",
      header: t(($) => $.transactions.source),
    },
  ];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const pageCount = Math.max(1, Math.ceil(transactions.length / pageSize));

  const visibleRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return transactions.slice(start, end);
  }, [transactions, pageSize, page]);

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

  return (
    <section className="flex flex-col gap-4">
      <Table id="transactions" columns={columns} rows={visibleRows} />
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
