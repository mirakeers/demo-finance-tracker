export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}