import { useMemo } from "react";
import { parse, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Table, type TableColumn } from "../ui/Table/Table";
import { TableFilters } from "../ui/Table/TableFilters.tsx";
import { TablePagination } from "../ui/Table/TablePagination";
import type { Transaction } from "../../types";
import { categories, type Category } from "../../data/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { useTableSort } from "../../hooks/useTableSort";
import { useTablePagination } from "../../hooks/useTablePagination";
import { useTableFilters } from "../../hooks/useTableFilters";
import { DATE_FORMAT } from "../../constants/date";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

type DataGridProps = {
  transactions: Transaction[];
};

const sourceOptions = ["imported", "manual", "modified"] as const;

const INITIAL_FILTERS = {
  dateMin: "",
  dateMax: "",
  amountMin: "",
  amountMax: "",
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
          type: "range",
          input: "date",
          minPlaceholder: t(($) => $.transaction.date.placeholder.min),
          maxPlaceholder: t(($) => $.transaction.date.placeholder.max),
          slot: <CalendarDaysIcon className="size-4" />,
          wrapperClass: "basis-90 grow-0 order-0",
        },
      },
      {
        id: "amount",
        header: t(($) => $.transaction.amount.label),
        wrapper: ({ amount }) => formatCurrency(amount),
        alignment: "right",
        headerClassName: "min-w-28",
        filter: {
          type: "range",
          input: "number",
          minPlaceholder: t(($) => $.transaction.amount.placeholder.min),
          maxPlaceholder: t(($) => $.transaction.amount.placeholder.max),
          slot: <>€</>,
          wrapperClass: "order-3",
        },
      },
      {
        id: "description",
        header: t(($) => $.transaction.description.label),
        headerClassName: "w-full",
        filter: {
          type: "text",
          placeholder: t(($) => $.transaction.description.placeholder),
          slot: <MagnifyingGlassIcon className="size-4" />,
          wrapperClass: "order-4",
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
          wrapperClass: "basis-50 order-2",
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
          wrapperClass: "basis-40 order-1",
        },
      },
    ],
    [t],
  );

  const { filters, setFilter } = useTableFilters(INITIAL_FILTERS);

  const filteredRows = useMemo(() => {
    const dateMin = filters.dateMin
      ? parse(filters.dateMin, DATE_FORMAT, new Date())
      : null;
    const dateMax = filters.dateMax
      ? parse(filters.dateMax, DATE_FORMAT, new Date())
      : null;
    const amountMin = filters.amountMin ? Number(filters.amountMin) : null;
    const amountMax = filters.amountMax ? Number(filters.amountMax) : null;
    const descriptionFilter = filters.description.trim().toLowerCase();
    const categoryFilter = filters.category;
    const sourceFilter = filters.source;

    return transactions.filter((transaction) => {
      const transactionDate = parseISO(transaction.date);

      if (dateMin && transactionDate < dateMin) return false;
      if (dateMax && transactionDate > dateMax) return false;

      if (amountMin !== null && transaction.amount < amountMin) {
        return false;
      }

      if (amountMax !== null && transaction.amount > amountMax) {
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
