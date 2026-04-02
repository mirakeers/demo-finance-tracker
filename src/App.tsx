import { Card } from "./components/ui/Card/Card";
import DataGrid from "./components/DataGrid/DataGrid";
//import type { Transaction } from "./types";
import { useTransactions } from "./hooks/useTransactions";
import { useState } from "react";
import { Timeline } from "./components/Timeline/Timeline";

function App() {
  const { data } = useTransactions();
  const [currentDay, setCurrentDay] = useState("2026-04-01");

  return (
    <>
      <div className="flex flex-col px-8 md:px-32 max-w-7xl gap-12 mx-auto py-8 ">
        <header>
          <h1>Spending tracker</h1>
        </header>
        {currentDay}
        <main className="flex flex-col gap-4 md:gap-8 font-sans">
          <h2 className="sr-only">Timeline</h2>
          <Card>
            <Timeline
              transactions={data}
              selectedDate={currentDay}
              onDateChange={setCurrentDay}
            />
          </Card>
          <h2>My transactions</h2>
          <DataGrid transactions={data} />
        </main>
      </div>
    </>
  );
}
export default App;
