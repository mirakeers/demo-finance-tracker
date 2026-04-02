import { useMemo } from "react";
import { parse, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "../ui/Table/Table";
import { TableFilters } from "../ui/Table/TableFilters";
import { TablePagination } from "../ui/Table/TablePagination";
import type { Transaction } from "../../types";
import { categories, type Category } from "../../data/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { useTableSort } from "../../hooks/useTableSort";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useTableFilters } from "../../hooks/useTableFilters";

type DataGridProps = {
  transactions: Transaction[];
};

const sourceOptions = ["imported", "manual", "modified"] as const;

const INITIAL_FILTERS = {
  date: "",
  amount: "",
  description: "",
  category: "",
  source: "",
};

export default function DataGrid({ transactions }: DataGridProps) {
  const { t } = useTranslation();

  const columns = useMemo<TableColumn<Transaction>[]>(
    () => [
      {
        id: "date",
        header: t(($) => $.transaction.date.label),
        wrapper: ({ date }) => <span className="text-nowrap">{date}</span>,
        filter: {
          type: "date",
          placeholder: t(($) => $.transaction.date.placeholder),
        },
      },
      {
        id: "amount",
        header: t(($) => $.transaction.amount.label),
        wrapper: ({ amount }) => formatCurrency(amount),
        alignment: "right",
        headerClassName: "min-w-28",
        filter: {
          type: "number",
          placeholder: t(($) => $.transaction.amount.placeholder),
        },
      },
      {
        id: "description",
        header: t(($) => $.transaction.description.label),
        headerClassName: "w-full",
        filter: {
          type: "search",
          placeholder: t(($) => $.transaction.description.placeholder),
        },
      },
      {
        id: "category",
        header: t(($) => $.transaction.category.label),
        headerClassName: "min-w-44",
        wrapper: ({ category }) => <CategoryBadge category={category} />,
        filter: {
          type: "combobox",
          placeholder: t(($) => $.transaction.category.placeholder),
          options: categories,
          displayValue: (value) => t(($) => $.category[value as Category]),
          renderOption: (value) => (
            <CategoryBadge category={value as Category} />
          ),
        },
      },
      {
        id: "source",
        header: t(($) => $.transaction.source.label),
        filter: {
          type: "combobox",
          placeholder: t(($) => $.transaction.source.placeholder),
          options: sourceOptions,
          displayValue: (value) => value,
        },
      },
    ],
    [t],
  );

  const { filters, setFilter } = useTableFilters(INITIAL_FILTERS);

  const filteredRows = useMemo(() => {
    const dateFilter = filters.date
      ? parse(filters.date, "dd/MM/yyyy", new Date())
      : null;
    const amountFilter = filters.amount ? Number(filters.amount) : null;
    const descriptionFilter = filters.description.trim().toLowerCase();
    const categoryFilter = filters.category;
    const sourceFilter = filters.source;

    return transactions.filter((transaction) => {
      if (dateFilter) {
        const transactionDate = parseISO(transaction.date);
        if (transactionDate < dateFilter) return false;
      }

      if (amountFilter !== null && transaction.amount < amountFilter) {
        return false;
      }

      if (
        descriptionFilter &&
        !transaction.description.toLowerCase().includes(descriptionFilter)
      ) {
        return false;
      }

      if (categoryFilter && transaction.category !== categoryFilter) {
        return false;
      }

      if (sourceFilter && transaction.source !== sourceFilter) {
        return false;
      }

      return true;
    });
  }, [transactions, filters]);

  const { sort, sortedRows, handleSort } = useTableSort(filteredRows, {
    column: "date",
    direction: "desc",
  });

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
      <TableFilters columns={columns} filters={filters} onChange={setFilter} />
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
        totalItems={sortedRows.length}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </section>
  );
}
