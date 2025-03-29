export const fetchTransactions = async () => {
  const response = await fetch("/api/transactions");
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};
