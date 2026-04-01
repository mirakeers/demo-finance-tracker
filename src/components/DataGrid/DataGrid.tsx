import { Table, type TableColumn } from "../ui/Table/Table";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { CategoryBadge } from "../CategoryBadge/CategoryBadge";
import { useTranslation } from "react-i18next";

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

  return (
    <section>
      <Table id="transactions" columns={columns} rows={transactions} />
    </section>
  );
}
