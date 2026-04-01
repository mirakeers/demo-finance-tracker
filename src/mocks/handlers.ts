import { delay, http, HttpResponse } from "msw";


export const handlers = [
  http.get(`${import.meta.env.BASE_URL}api/transactions`, async () => {
    await delay(1200);
    const CSV_URL = `${import.meta.env.BASE_URL}data/Personal_Finance_Dataset.csv`;
    const response = await fetch(CSV_URL);

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