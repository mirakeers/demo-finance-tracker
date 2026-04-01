import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
import type { Transaction } from "../../../types";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getCategoryColor } from "../../../utils/getCategoryColor";
import { Badge } from "../Badge";
import { Table, type TableColumn } from "./Table";

const categories: Transaction["category"][] = [
  "groceries",
  "food_drink",
  "dining",
  "transport",
  "shopping",
  "entertainment",
  "bills_utilities",
  "healthcare",
  "education",
  "misc",
];

const generateMockData = (count: number): Transaction[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `tx-${i + 1}`,
    date: `2026-03-${String((i % 28) + 1).padStart(2, "0")}`,
    description: `Transaction ${i + 1}`,
    category: categories[i % categories.length],
    amount: Number((Math.random() * 200).toFixed(2)),
    source: i % 2 === 0 ? "imported" : "manual",
  }));

type TableStoryContentProps = {
  isEmpty?: boolean;
};

const TableStoryContent = ({ isEmpty = false }: TableStoryContentProps) => {
  const { t } = useTranslation();

  const rows = useMemo(() => generateMockData(100), []);

  const columns = useMemo<TableColumn<Transaction>[]>(
    () => [
      {
        id: "date",
        header: t("transactions.date"),
        headerClassName: "min-w-30",
        cell: ({ date }) => date,
      },
      {
        id: "amount",
        header: t("transactions.amount"),
        cell: ({ amount }) => formatCurrency(amount),
        alignment: "right",
        cellClassName: "text-t-base",
      },
      {
        id: "description",
        header: t("transactions.description"),
        cell: ({ description }) => description,
        headerClassName: "w-full",
      },
      {
        id: "category",
        header: t("transactions.category"),
        cell: ({ category }) => (
          <Badge color={getCategoryColor(category)}>
            {t(`category.${category}`)}
          </Badge>
        ),
      },
      {
        id: "source",
        header: t("transactions.source"),
        cell: ({ source }) => source,
      },
    ],
    [t],
  );

  return (
    <Table
      id="storybook-table"
      columns={columns}
      rows={isEmpty ? [] : rows}
      emptyState="No data available."
    />
  );
};

const meta = {
  title: "UI/Table",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TableStoryContent />,
};

export const Empty: Story = {
  render: () => <TableStoryContent isEmpty />,
};
