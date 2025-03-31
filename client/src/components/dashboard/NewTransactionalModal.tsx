import React, { useEffect } from "react";
import { X } from "lucide-react";
import { TransactionType } from "@/types";
import { formatPHP } from "@/libs/formatter";
import { calculateProfit } from "@/libs/useProfitCalculator";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionType: TransactionType;
  setTransactionType: (type: TransactionType) => void;
  profitMethod: string;
  setProfitMethod: (method: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  handleTransaction: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  transactionType,
  setTransactionType,
  profitMethod,
  setProfitMethod,
  amount,
  setAmount,
  handleTransaction,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    handleTransaction();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-xl w-full max-w-sm animate-fadeInScale">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">New Transaction</h2>
          <button
            className="text-gray-300 hover:text-white cursor-pointer"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Transaction Type Toggle Switch */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Transaction Type</p>
          <div
            className="relative flex items-center bg-gray-700 p-1 rounded-full w-full max-w-xs mx-auto cursor-pointer transition-all"
            onClick={() =>
              setTransactionType(
                transactionType === TransactionType.CASH_IN
                  ? TransactionType.CASH_OUT
                  : TransactionType.CASH_IN
              )
            }
          >
            {/* Toggle Background */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 
                ${
                  transactionType === TransactionType.CASH_IN
                    ? "left-1 bg-blue-600"
                    : "left-1/2 bg-purple-600"
                }`}
            ></div>

            {/* Labels */}
            <span
              className={`flex-1 text-center py-2 text-sm font-medium transition-all z-10 ${
                transactionType === TransactionType.CASH_IN
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Cash-In
            </span>
            <span
              className={`flex-1 text-center py-2 text-sm font-medium transition-all z-10 ${
                transactionType === TransactionType.CASH_OUT
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              Cash-Out
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount in PHP"
          className="w-full bg-gray-900 border border-indigo-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />

        {/* Estimated Profit (Disabled Look) */}
        <div
          className={`bg-gray-900 p-4 rounded-xl mt-4 flex justify-between transition-all duration-300 
            ${amount ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
        >
          <span className="text-gray-400">Estimated Profit:</span>
          <span
            className={`text-lg font-semibold ${
              amount ? "text-green-400" : "text-gray-500"
            }`}
          >
            {amount
              ? formatPHP(calculateProfit(parseFloat(amount)))
              : formatPHP(0)}
          </span>
        </div>

        {/* Profit Method Checkbox */}
        <div className="mt-4 flex justify-end items-center gap-2">
          <input
            type="checkbox"
            id="feePaidInCash"
            checked={profitMethod === "separate"}
            onChange={() =>
              setProfitMethod(
                profitMethod === "separate" ? "included" : "separate"
              )
            }
            className={`accent-purple-500 ${
              transactionType === TransactionType.CASH_IN
                ? "cursor-not-allowed"
                : ""
            }`}
            disabled={transactionType === TransactionType.CASH_IN}
          />
          <label
            htmlFor="feePaidInCash"
            className={`text-gray-400 ${
              transactionType === TransactionType.CASH_IN
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Fee paid in cash
          </label>
        </div>

        {/* Process Transaction Button */}
        <button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold py-3 rounded-xl transition-all"
          onClick={handleSubmit}
        >
          Process Transaction
        </button>
      </div>
    </div>
  );
};
