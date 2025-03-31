import { Transaction, TransactionType } from "@/types";

export const calculateProfit = (amount: number) => {
  if (amount <= 0) return 0;
  if (amount <= 45) return 5;
  if (amount <= 250) return 10;
  if (amount <= 500) return 15;
  if (amount <= 1000) return 20;
  return Math.floor(amount / 1000) * 20;
};

export const calculateProfits = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      acc.totalProfit += transaction.profit;
      if (transaction.type === TransactionType.CASH_IN)
        acc.cashInProfit += transaction.profit;
      if (transaction.type === TransactionType.CASH_OUT)
        acc.cashOutProfit += transaction.profit;
      return acc;
    },
    { totalProfit: 0, cashInProfit: 0, cashOutProfit: 0 }
  );
};
