import React from "react";
import { Smartphone, Wallet } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  type: "gcash" | "cash";
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, type }) => {
  const isGCash = type === "gcash";

  return (
    <div className="relative p-0.5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">
              {isGCash ? "GCash Balance" : "Cash Balance"}
            </p>
            <p className="text-2xl font-bold">₱{balance.toLocaleString()}</p>
          </div>
          <div className="bg-blue-900/40 p-3 rounded-xl text-blue-400">
            {isGCash ? (
              <Smartphone className="h-6 w-6 text-blue-400" />
            ) : (
              <Wallet className="h-6 w-6 text-purple-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
