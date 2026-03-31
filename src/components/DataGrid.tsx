import type { Transaction } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

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
            <th>Description</th>
            <th>Category</th>
            <th>Source</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.source}</td>

              <td>{formatCurrency(transaction.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
