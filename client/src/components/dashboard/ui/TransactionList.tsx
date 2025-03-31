import React from "react";
import { History, CirclePlus } from "lucide-react";
import { Transaction } from "@/types";
import { TransactionItem } from "./TransactionItem";
import { ResetButton } from "./ResetButton";

interface TransactionListProps {
  transactions: Transaction[];
  onNewTransaction: () => void;
  onReset: () => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onNewTransaction,
  onReset,
}) => {
  return (
    <div className="bg-gray-900/50 rounded-3xl border border-gray-500 p-6 backdrop-blur-lg h-[calc(115vh-16rem)] flex flex-col">
      <div className="flex justify-between w-full items-center mb-6">
        <div className="flex items-center gap-3">
          <History className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
        </div>
        <div className="flex gap-2">
          <ResetButton onConfirm={onReset} />
          <button
            onClick={onNewTransaction}
            className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-blue-400"
          >
            <CirclePlus className="h-5 w-5" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Scrollable Transaction List */}
      <div className="flex-1 overflow-y-auto mt-3 mb-10 space-y-4 scrollbar-hide">
        {transactions.map((transaction) => (
          <TransactionItem
            key={`${transaction.date}-${transaction.amount}`}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};
