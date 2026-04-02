import { useMemo } from "react";
import { parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  CalendarDaysIcon,
  CircleStackIcon,
  CurrencyEuroIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Table, type TableColumn } from "../ui/Table/Table";
import { TableFilters } from "../ui/Table/TableFilters/TableFilters";
import { TablePagination } from "../ui/Table/TablePagination";
import type { Transaction, TransactionFilters } from "../../types";
import { categories, type Category } from "../../data/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { useTableSort } from "../../hooks/useTableSort";
import { useTablePagination } from "../../hooks/useTablePagination";
import styles from "../ui/Form/FormLayout.module.css";
import { Button } from "../ui/Button/Button";

type DataGridProps = {
  transactions: Transaction[];
  filters: TransactionFilters;
  onFilterChange: <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K],
  ) => void;
  onUseCurrentDayChange: (checked: boolean) => void;
  onEditTransaction: (transaction: Transaction) => void;
};

type TransactionColumnId = keyof Transaction & string;
type DataGridColumnId = TransactionColumnId | "actions";

const sourceOptions = ["imported", "manual", "modified"] as const;

export default function DataGrid({
  transactions,
  filters,
  onFilterChange,
  onUseCurrentDayChange,
  onEditTransaction,
}: DataGridProps) {
  const { t } = useTranslation();

  const columns = useMemo<TableColumn<Transaction, DataGridColumnId>[]>(
    () => [
      {
        id: "date",
        header: t(($) => $.transaction.date.label),
        wrapper: ({ date }) => (
          <span className="text-nowrap">{formatDate(date)}</span>
        ),
        filter: {
          type: "range",
          input: "date",
          wrapperClass: "min-w-72",
          minPlaceholder: t(($) => $.transaction.date.placeholder.min),
          maxPlaceholder: t(($) => $.transaction.date.placeholder.max),
          slot: <CalendarDaysIcon className={styles.icon} />,
        },
      },
      {
        id: "category",
        header: t(($) => $.transaction.category.label),
        headerClassName: "min-w-44",
        wrapper: ({ category }) => <CategoryBadge category={category} />,
        filter: {
          type: "combobox",
          wrapperClass: "min-w-52",
          placeholder: t(($) => $.transaction.category.placeholder),
          options: categories,
          displayValue: (value) => t(($) => $.category[value as Category]),
          renderOption: (value) => (
            <CategoryBadge category={value as Category} />
          ),
          slot: <TagIcon className={styles.icon} />,
        },
      },
      {
        id: "source",
        header: t(($) => $.transaction.source.label),
        filter: {
          type: "combobox",
          wrapperClass: "min-w-44",
          placeholder: t(($) => $.transaction.source.placeholder),
          options: sourceOptions,
          displayValue: (value) => value,
          slot: <CircleStackIcon className={styles.icon} />,
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
          wrapperClass: "min-w-72",
          minPlaceholder: t(($) => $.transaction.amount.placeholder.min),
          maxPlaceholder: t(($) => $.transaction.amount.placeholder.max),
          slot: <CurrencyEuroIcon className={styles.icon} />,
        },
      },
      {
        id: "description",
        header: t(($) => $.transaction.description.label),
        headerClassName: "w-full",
        filter: {
          type: "text",
          wrapperClass: "min-w-72",
          placeholder: t(($) => $.transaction.description.placeholder),
          slot: <MagnifyingGlassIcon className={styles.icon} />,
        },
      },
      {
        id: "actions",
        header: "Actions",
        alignment: "center",
        headerClassName: "min-w-20",
        sortable: false,
        wrapper: (transaction) => (
          <Button
            variant="ghost"
            aria-label={`Edit ${transaction.description}`}
            onClick={() => onEditTransaction(transaction)}
          >
            <PencilIcon className="size-4" />
          </Button>
        ),
      },
    ],
    [onEditTransaction, t],
  );

  const tableFilters = {
    dateMin: filters.dateMin,
    dateMax: filters.dateMax,
    amountMin: filters.amountMin,
    amountMax: filters.amountMax,
    description: filters.description,
    category: filters.category,
    source: filters.source,
  };

  const handleTableFilterChange = <K extends keyof typeof tableFilters>(
    key: K,
    value: (typeof tableFilters)[K],
  ) => {
    onFilterChange(key, value);
  };

  const filteredRows = useMemo(() => {
    const dateMin = filters.dateMin ? parseISO(filters.dateMin) : null;
    const dateMax = filters.dateMax ? parseISO(filters.dateMax) : null;
    const amountMin = filters.amountMin ? Number(filters.amountMin) : null;
    const amountMax = filters.amountMax ? Number(filters.amountMax) : null;
    const descriptionFilter = filters.description.trim().toLowerCase();
    const categoryFilter = filters.category;
    const sourceFilter = filters.source;

    return transactions.filter((transaction) => {
      const transactionDate = transaction.date;

      if (dateMin && transactionDate < dateMin) return false;
      if (dateMax && transactionDate > dateMax) return false;
      if (amountMin !== null && transaction.amount < amountMin) return false;
      if (amountMax !== null && transaction.amount > amountMax) return false;

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

  const { sort, sortedRows, handleSort } = useTableSort<
    Transaction,
    TransactionColumnId
  >(filteredRows, {
    column: "date",
    direction: "desc",
  });

  const handleTableSort = (columnId: DataGridColumnId) => {
    if (columnId === "actions") return;
    handleSort(columnId);
  };

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
      <TableFilters
        columns={columns.filter((column) => column.id !== "actions")}
        filters={tableFilters}
        onChange={handleTableFilterChange}
        useCurrentDay={filters.useCurrentDay}
        onUseCurrentDayChange={onUseCurrentDayChange}
      />

      <Table<Transaction, DataGridColumnId>
        id="transactions"
        columns={columns}
        rows={visibleRows}
        onSort={handleTableSort}
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
