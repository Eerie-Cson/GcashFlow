"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { ArrowUpRight, Wallet, CreditCard } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

enum TransactionType {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}

type Transaction = {
  id?: string;
  type: TransactionType;
  amount: number;
  profit?: number;
  profitMethod?: string | null;
  date: string;
};

type Balances = {
  gcashBalance: number;
  cashBalance: number;
};

const calculateProfit = (amount: number) => {
  if (amount <= 45) return 5;
  if (amount <= 250) return 10;
  if (amount <= 500) return 15;
  if (amount <= 1000) return 20;

  // For amounts > 1000
  const fullChunks = Math.floor(amount / 1000);
  const remainder = amount % 1000;

  let profit = fullChunks * 20;

  // Calculate remainder profit
  if (remainder > 500) {
    profit += 15;
  } else if (remainder > 250) {
    profit += 10;
  } else if (remainder > 45) {
    profit += 5;
  }

  return profit;
};

const TransactionApp = () => {
  const [balances, setBalances] = useState<Balances>({
    gcashBalance: 5000,
    cashBalance: 10000,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState<
    TransactionType.CASH_IN | TransactionType.CASH_OUT
  >(TransactionType.CASH_IN);
  const [profitMethod, setProfitMethod] = useState("included");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      const processedTransactions = Array.isArray(data)
        ? data.map((transaction) => ({
            ...transaction,
            profit: transaction.profit || calculateProfit(transaction.amount),
            date: transaction.createdAt,
          }))
        : [];

      setTransactions(processedTransactions);

      // Optionally recalculate balances based on fetched transactions
      // This is a simple example and might need adjustment based on your exact requirements
      const gcashBalance = calculateBalanceFromTransactions(data, "gcash");
      const cashBalance = calculateBalanceFromTransactions(data, "cash");
      setBalances({ gcashBalance, cashBalance });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to calculate balance from transactions
  const calculateBalanceFromTransactions = (
    transactions: Transaction[],
    balanceType: "gcash" | "cash"
  ) => {
    // This is a simplified calculation and might need to be adjusted
    // based on your specific business logic
    return transactions.reduce(
      (balance, transaction) => {
        const profit =
          transaction.profit || calculateProfit(transaction.amount) || 0;

        if (balanceType === "gcash") {
          if (transaction.type === TransactionType.CASH_IN) {
            return balance - transaction.amount;
          }
          if (transaction.type === TransactionType.CASH_OUT) {
            return transaction.profitMethod === "included"
              ? balance + transaction.amount + profit
              : balance + transaction.amount;
          }
        } else {
          if (transaction.type === TransactionType.CASH_IN) {
            return balance + transaction.amount + profit;
          }
          if (transaction.type === TransactionType.CASH_OUT) {
            return balance - transaction.amount;
          }
        }
        return balance;
      },
      balanceType === "gcash" ? 5000 : 10000
    );
  };

  const handleTransaction = async () => {
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const profit = calculateProfit(amount);
    const newTransaction: Omit<Transaction, "id"> = {
      date: new Date().toISOString(),
      type: transactionType,
      amount,
      profit,
      profitMethod:
        transactionType === TransactionType.CASH_OUT ? profitMethod : null,
    };

    try {
      const response = await fetch("/api/transactions/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      const createdTransaction = await response.json();

      // Refetch transactions to ensure we have the latest data
      await fetchTransactions();

      // Reset form
      setTransactionAmount("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Error creating transaction:", err);
    }
  };

  // Rest of the component remains the same as your previous implementation
  // ... (keep the existing render method and other methods)

  const calculateOverview = useMemo(() => {
    if (transactions.length === 0) {
      console.log("empty");
      return {
        dailyProfit: 0,
        weeklyProfit: 0,
        dailyProfitData: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-PH", { weekday: "short" }),
          profit: 0,
        })).reverse(),
      };
    }
    const now = new Date();

    // Generate daily profit data for the last 7 days
    const dailyProfitData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dailyTransactions = transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return transactionDate.toDateString() === date.toDateString();
      });

      console.log("dT: ", transactions);

      return {
        date: date.toLocaleDateString("en-PH", { weekday: "short" }),
        profit: dailyTransactions.reduce(
          (total, t) => total + (t.profit || 0),
          0
        ),
      };
    }).reverse(); // Reverse to show most recent first

    console.log(dailyProfitData);

    const dailyProfit = dailyProfitData.reduce(
      (total, day) => total + day.profit,
      0
    );

    const weeklyTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return transactionDate >= oneWeekAgo;
    });

    const weeklyProfit = weeklyTransactions.reduce(
      (total, t) => total + (t.profit || 0),
      0
    );

    return {
      dailyProfit,
      weeklyProfit,
      dailyProfitData,
    };
  }, [transactions]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">GCash Business Dashboard</h1>
        <p className="text-muted-foreground">
          Track your GCash and Cash transactions
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="profit-guide">Profit Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            {/* Profit Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profit Summary
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Daily Profit
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ₱{calculateOverview.dailyProfit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Weekly Profit
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₱{calculateOverview.weeklyProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profit Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Profit Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={calculateOverview.dailyProfitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* GCash Transactions Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  GCash Transactions
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Balance
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      ₱{balances.gcashBalance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        transactions.filter(
                          (t: { type: TransactionType }) =>
                            t.type === TransactionType.CASH_IN ||
                            t.type === TransactionType.CASH_OUT
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real Cash Transactions Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cash Transactions
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Balance
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₱{balances.cashBalance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Transactions
                    </p>
                    <p className="text-2xl font-bold">
                      {
                        transactions.filter(
                          (t: { type: TransactionType }) =>
                            t.type === TransactionType.CASH_IN ||
                            t.type === TransactionType.CASH_OUT
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <Input
                  type="number"
                  placeholder="Enter transaction amount"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="w-full mt-4" role="tablist">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={
                      transactionType === TransactionType.CASH_IN
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setTransactionType(TransactionType.CASH_IN)}
                  >
                    Cash In
                  </Button>
                  <Button
                    variant={
                      transactionType === TransactionType.CASH_OUT
                        ? "default"
                        : "outline"
                    }
                    onClick={() => setTransactionType(TransactionType.CASH_OUT)}
                  >
                    Cash Out
                  </Button>
                </div>
              </div>

              {transactionType === TransactionType.CASH_OUT && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Profit Method
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant={
                        profitMethod === "included" ? "default" : "outline"
                      }
                      onClick={() => setProfitMethod("included")}
                    >
                      Profit Included
                    </Button>
                    <Button
                      variant={
                        profitMethod === "separate" ? "default" : "outline"
                      }
                      onClick={() => setProfitMethod("separate")}
                    >
                      Profit Separate
                    </Button>
                  </div>
                </div>
              )}

              {transactionAmount && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Profit for this transaction: ₱
                  {calculateProfit(parseFloat(transactionAmount))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" disabled={!transactionAmount}>
                    Process Transaction
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to process this transaction?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleTransaction}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="profit-guide">
          <Card>
            <CardHeader>
              <CardTitle>Profit Calculation Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Profit Applies to Both Cash-In and Cash-Out Transactions
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>PHP 1 - 45</span>
                  <span>PHP 5 profit</span>
                </div>
                <div className="flex justify-between">
                  <span>PHP 46 - 250</span>
                  <span>PHP 10 profit</span>
                </div>
                <div className="flex justify-between">
                  <span>PHP 251 - 500</span>
                  <span>PHP 15 profit</span>
                </div>
                <div className="flex justify-between">
                  <span>PHP 501 - 1000</span>
                  <span>PHP 20 profit</span>
                </div>
                <div className="flex justify-between">
                  <span>Beyond PHP 1000</span>
                  <span>
                    Cumulative profit (e.g., PHP 1500 = PHP 35 profit)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionApp;
