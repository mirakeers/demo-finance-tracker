import { t } from "i18next";
import type { Transaction } from "../types";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryBadgeCss } from "../utils/getCategoryColor";
import { Badge } from "./ui/Badge";

type DataGridProps = {
  transactions: Transaction[];
};
export default function DataGrid({ transactions }: DataGridProps) {
  return (
    <section>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th className="w-full">Description</th>
            <th>Category</th>
            <th>Source</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(
            ({ id, date, description, category, source, amount }) => (
              <tr key={id}>
                <td className="text-nowrap">{date}</td>
                <td>{formatCurrency(amount)}</td>
                <td>{description}</td>
                <td>
                  <Badge className={getCategoryBadgeCss(category)}>
                    {t(`category.${category}`)}
                  </Badge>
                </td>
                <td>{source}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </section>
  );
}
