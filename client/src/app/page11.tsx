"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  Smartphone,
  Wallet,
  Clock,
  Download,
  History,
  Info,
  Plus,
} from "lucide-react";

type TransactionType = "CASH_IN" | "CASH_OUT";

type Transaction = {
  date: string;
  type: TransactionType;
  amount: number;
  profit: number;
  profitMethod?: string;
};

const calculateProfit = (amount: number) => {
  if (amount <= 45) return 5;
  if (amount <= 250) return 10;
  if (amount <= 500) return 15;
  if (amount <= 1000) return 20;
  return Math.min(Math.floor(amount / 500) * 15, 35);
};

const formatPHP = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CashFlowApp() {
  const [initialSetup, setInitialSetup] = useState(true);
  const [initialBalances, setInitialBalances] = useState({
    gcash: "",
    cash: "",
  });
  const [balances, setBalances] = useState({ gcash: 0, cash: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("CASH_IN");
  const [profitMethod, setProfitMethod] = useState("included");

  // Local storage persistence
  useEffect(() => {
    const saved = localStorage.getItem("cashFlowData");
    if (saved) {
      const { balances, transactions } = JSON.parse(saved);
      setBalances(balances);
      setTransactions(transactions);
      setInitialSetup(false);
    }
  }, []);

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

  const exportCSV = () => {
    const csvContent = [
      "Date,Type,Amount,Profit,Method",
      ...transactions.map(
        (t) =>
          `${new Date(t.date).toLocaleDateString()},${t.type},${t.amount},${
            t.profit
          },${t.profitMethod || "N/A"}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  if (initialSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            GCashFlow
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Set initial balances to start tracking
          </p>
          <div className="space-y-4">
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <label className="text-sm text-gray-300 mb-2 block">
                Initial GCash Balance
              </label>
              <input
                type="number"
                className="w-full text-white bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={initialBalances.gcash}
                onChange={(e) =>
                  setInitialBalances((prev) => ({
                    ...prev,
                    gcash: e.target.value,
                  }))
                }
              />
            </div>
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <label className="text-sm text-gray-300 mb-2 block">
                Initial Cash Balance
              </label>
              <input
                type="number"
                className="w-full text-white bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={initialBalances.cash}
                onChange={(e) =>
                  setInitialBalances((prev) => ({
                    ...prev,
                    cash: e.target.value,
                  }))
                }
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all"
              onClick={() => {
                setBalances({
                  gcash: Number(initialBalances.gcash),
                  cash: Number(initialBalances.cash),
                });
                setInitialSetup(false);
              }}
            >
              Start Tracking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            GCashFlow
          </h1>
          <p className="text-gray-400 mt-2">Dual Balance Management System</p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Balances and Quick Action */}
          <div className="lg:col-span-1 space-y-6">
            {/* GCash Balance Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
              <div className="flex items-center gap-4">
                <div className="bg-blue-900/20 p-3 rounded-xl">
                  <Smartphone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">GCash Balance</p>
                  <p className="text-2xl font-bold">
                    {formatPHP(balances.gcash)}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(balances.gcash / 10000) * 100}%` }}
                />
              </div>
            </div>

            {/* Cash Balance Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/20 p-3 rounded-xl">
                  <Wallet className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Cash Balance</p>
                  <p className="text-2xl font-bold">
                    {formatPHP(balances.cash)}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${(balances.cash / 20000) * 100}%` }}
                />
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-400" />
                Quick Actions
              </h3>
              <button
                className="w-full bg-gray-700/50 hover:bg-gray-700/70 p-3 rounded-lg text-sm mb-2 flex items-center gap-2"
                onClick={exportCSV}
              >
                <Download className="h-4 w-4" />
                Export Transactions
              </button>
            </div>
          </div>

          {/* Center Column - Transaction Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
              <h2 className="text-xl font-semibold mb-6">New Transaction</h2>

              <div className="grid gap-4">
                <div className="flex gap-2">
                  <button
                    className={`flex-1 p-3 rounded-xl transition-all ${
                      transactionType === "CASH_IN"
                        ? "bg-blue-600/30 border border-blue-500/50"
                        : "bg-gray-700/50 hover:bg-gray-700/70"
                    }`}
                    onClick={() => setTransactionType("CASH_IN")}
                  >
                    Cash-In
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-xl transition-all ${
                      transactionType === "CASH_OUT"
                        ? "bg-purple-600/30 border border-purple-500/50"
                        : "bg-gray-700/50 hover:bg-gray-700/70"
                    }`}
                    onClick={() => setTransactionType("CASH_OUT")}
                  >
                    Cash-Out
                  </button>
                </div>

                <input
                  type="number"
                  placeholder="Enter amount in PHP"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                {transactionType === "CASH_OUT" && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`p-2 rounded-lg ${
                        profitMethod === "included"
                          ? "bg-purple-600/30 border border-purple-500/50"
                          : "bg-gray-700/50 hover:bg-gray-700/70"
                      }`}
                      onClick={() => setProfitMethod("included")}
                    >
                      Profit Included
                    </button>
                    <button
                      className={`p-2 rounded-lg ${
                        profitMethod === "separate"
                          ? "bg-purple-600/30 border border-purple-500/50"
                          : "bg-gray-700/50 hover:bg-gray-700/70"
                      }`}
                      onClick={() => setProfitMethod("separate")}
                    >
                      Profit Separate
                    </button>
                  </div>
                )}

                {amount && (
                  <div className="bg-gray-900/30 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Estimated Profit:</span>
                      <span className="text-lg font-semibold text-green-400">
                        {formatPHP(calculateProfit(parseFloat(amount)))}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  onClick={handleTransaction}
                >
                  Process Transaction
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <History className="h-5 w-5 text-purple-400" />
                  Recent Transactions
                </h2>
                <span className="text-sm text-gray-400">
                  Last {transactions.length} transactions
                </span>
              </div>

              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-gray-700/10 hover:bg-gray-700/20 rounded-xl border border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "CASH_IN"
                            ? "bg-blue-900/20"
                            : "bg-purple-900/20"
                        }`}
                      >
                        {transaction.type === "CASH_IN" ? (
                          <ArrowDown className="h-5 w-5 text-blue-400" />
                        ) : (
                          <ArrowUp className="h-5 w-5 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type.replace("_", "-")}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          transaction.type === "CASH_IN"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {transaction.type === "CASH_IN" ? "+" : "-"}
                        {formatPHP(transaction.amount)}
                      </p>
                      <p className="text-sm text-green-400">
                        +{formatPHP(transaction.profit)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profit Guide Section */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/70">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-400" />
            Profit Calculation Guide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <p className="text-sm text-gray-400">₱1 - ₱45</p>
              <p className="text-lg font-semibold text-green-400">+₱5</p>
            </div>
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <p className="text-sm text-gray-400">₱46 - ₱250</p>
              <p className="text-lg font-semibold text-green-400">+₱10</p>
            </div>
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <p className="text-sm text-gray-400">₱251 - ₱500</p>
              <p className="text-lg font-semibold text-green-400">+₱15</p>
            </div>
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <p className="text-sm text-gray-400">₱501 - ₱1000</p>
              <p className="text-lg font-semibold text-green-400">+₱20</p>
            </div>
            <div className="bg-gray-700/20 p-4 rounded-xl">
              <p className="text-sm text-gray-400">₱1000+</p>
              <p className="text-lg font-semibold text-green-400">+₱15/₱500</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 mt-8 pb-4">
          <p className="flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            Independent tracking tool - Not affiliated with GCash or any
            financial institution
          </p>
        </div>
      </div>
    </div>
  );
}
