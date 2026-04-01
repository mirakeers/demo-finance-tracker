import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/i18n";

const start = async () => {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

start();
