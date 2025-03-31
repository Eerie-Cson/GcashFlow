import React, { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { calculateProfits } from "@/libs/useProfitCalculator";
import { BalanceCard } from "./ui/BalanceCard";
import { ProfitCard } from "./ui/ProfitCard";
import { TransactionList } from "./ui/TransactionList";
import { NewTransactionModal } from "./NewTransactionalModal";
import { InitialSetupForm } from "./InitialSetupForm";

export const Dashboard: React.FC = () => {
  const {
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
  } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const profits = calculateProfits(transactions);

  if (initialSetup) {
    return (
      <InitialSetupForm
        initialBalances={initialBalances}
        setInitialBalances={setInitialBalances}
        onComplete={completeInitialSetup}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-purple-600 blur-3xl"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <BalanceCard balance={balances.gcash} type="gcash" />
            <BalanceCard balance={balances.cash} type="cash" />
            <ProfitCard profits={profits} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              onNewTransaction={() => setIsModalOpen(true)}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        profitMethod={profitMethod}
        setProfitMethod={setProfitMethod}
        amount={amount}
        setAmount={setAmount}
        handleTransaction={handleTransaction}
      />
    </div>
  );
};
