import React from "react";
import { Transaction, TransactionType } from "@/types";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => (
  <div className="bg-gray-800/50 p-4 rounded-xl flex justify-between items-center hover:bg-gray-800/70 transition-colors">
    <div className="flex items-center gap-4">
      <div>
        <p>
          {transaction.type === TransactionType.CASH_IN
            ? "Cash-In"
            : "Cash-Out"}
        </p>
        <p className="text-sm text-gray-400">
          {new Date(transaction.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p
        className={`font-semibold ${
          transaction.type === TransactionType.CASH_IN
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {transaction.type === TransactionType.CASH_IN ? "+" : "-"}₱
        {transaction.amount.toLocaleString()}
      </p>
      <p className="text-sm text-gray-400">
        Profit: ₱{transaction.profit.toLocaleString()}
      </p>
    </div>
  </div>
);
