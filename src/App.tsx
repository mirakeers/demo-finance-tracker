import { Card } from "./components/Card/Card";

function App() {
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
          <Card>DataGrid component</Card>
        </main>
      </div>
    </>
  );
}
export default App;
