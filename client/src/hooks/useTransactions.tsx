import { useState, useEffect } from "react";
import { Transaction, TransactionType, Balances } from "@/types";
import { calculateProfit } from "@/libs/useProfitCalculator";

export const useTransactions = () => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.CASH_IN
  );
  const [initialSetup, setInitialSetup] = useState(true);
  const [initialBalances, setInitialBalances] = useState({
    gcash: "",
    cash: "",
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profitMethod, setProfitMethod] = useState("included");
  const [amount, setAmount] = useState("");
  const [balances, setBalances] = useState<Balances>({ gcash: 0, cash: 0 });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("cashFlowData");
    if (saved) {
      const { balances, transactions } = JSON.parse(saved);
      setBalances(balances);
      setTransactions(transactions);
      setInitialSetup(false);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!initialSetup) {
      localStorage.setItem(
        "cashFlowData",
        JSON.stringify({ balances, transactions })
      );
    }
  }, [balances, transactions, initialSetup]);

  const handleTransaction = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    const profit = calculateProfit(numericAmount);
    const newTransaction: Transaction = {
      date: new Date().toISOString(),
      type: transactionType,
      amount: numericAmount,
      profit,
      profitMethod: transactionType === "CASH_OUT" ? profitMethod : undefined,
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    setBalances((prev) => {
      if (transactionType === "CASH_IN") {
        return {
          gcash: prev.gcash - numericAmount,
          cash: prev.cash + numericAmount + profit,
        };
      } else {
        return profitMethod === "included"
          ? {
              gcash: prev.gcash + numericAmount + profit,
              cash: prev.cash - numericAmount,
            }
          : {
              gcash: prev.gcash + numericAmount,
              cash: prev.cash - numericAmount + profit,
            };
      }
    });

    setAmount("");
  };

  const handleReset = () => {
    localStorage.removeItem("cashFlowData");
    window.location.reload();
  };

  const completeInitialSetup = () => {
    setBalances({
      gcash: Number(initialBalances.gcash),
      cash: Number(initialBalances.cash),
    });
    setInitialSetup(false);
  };

  return {
    transactionType,
    setTransactionType,
    initialSetup,
    initialBalances,
    setInitialBalances,
    transactions,
    profitMethod,
    setProfitMethod,
    amount,
    setAmount,
    balances,
    handleTransaction,
    handleReset,
    completeInitialSetup,
  };
};
