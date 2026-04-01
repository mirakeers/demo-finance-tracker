import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";

const enableMocking = async () => {
  const { worker } = await import("./mocks/browser.ts");
  await worker.start();
};

enableMocking().then(() => {
  import("./bootstrap.tsx");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
