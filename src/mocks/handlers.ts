import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/transactions", async () => {
    await delay(1200);

    const response = await fetch("/data/Personal_Finance_Dataset.csv");

    if (!response.ok) {
      return HttpResponse.json(
        { message: "Failed to load CSV mock data" },
        { status: 500 },
      );
    }

    const csvText = await response.text();

    return new HttpResponse(csvText, {
      headers: {
        "Content-Type": "text/csv",
      },
    });
  }),
];