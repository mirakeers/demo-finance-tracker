import { t } from "i18next";
import { getCategoryColor } from "../../utils/getCategoryColor";
import { Badge } from "../ui/Badge";
import { Table, type TableColumn } from "../ui/Table/Table";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

type DataGridProps = {
  transactions: Transaction[];
};

const columns: TableColumn<Transaction>[] = [
  {
    id: "date",
    header: t("transactions.date"),
    wrapper: ({ date }) => <span className="text-nowrap">{date}</span>,
  },
  {
    id: "amount",
    header: t("transactions.amount"),
    wrapper: ({ amount }) => formatCurrency(amount),
  },
  {
    id: "description",
    header: t("transactions.description"),
    headerClassName: "w-full",
  },
  {
    id: "category",
    header: t("transactions.category"),
    wrapper: ({ category }) => (
      <Badge color={getCategoryColor(category)}>
        {t(`category.${category}`)}
      </Badge>
    ),
  },
  {
    id: "source",
    header: t("transactions.source"),
  },
];

export default function DataGrid({ transactions }: DataGridProps) {
  return (
    <section>
      <Table id="transactions" columns={columns} rows={transactions} />
    </section>
  );
}
