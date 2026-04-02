import { Card } from "./components/ui/Card/Card";
import DataGrid from "./components/DataGrid/DataGrid";
//import type { Transaction } from "./types";
import { useTransactions } from "./hooks/useTransactions";

/* const transactions: Transaction[] = [
  {
    id: "1",
    date: "2026-03-28",
    amount: -24.5,
    description: "Billa",
    category: "groceries",
    source: "imported",
  },
  {
    id: "2",
    date: "2026-03-27",
    amount: -8.9,
    description: "ÖBB Ticket",
    category: "transport",
    source: "manual",
  },
]; */

function App() {
  const { data, loading, error } = useTransactions();

  return (
    <>
      <div className="flex flex-col px-8 md:px-32 max-w-7xl gap-12 mx-auto py-8 ">
        <header>
          <h1>Spending tracker</h1>
        </header>
        <main className="flex flex-col gap-4 md:gap-8 font-sans">
          <h2 className="sr-only">Timeline</h2>
          <Card>Timeline component</Card>
          <h2>My transactions</h2>
          <DataGrid transactions={data} />
        </main>
      </div>
    </>
  );
}
export default App;
