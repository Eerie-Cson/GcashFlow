import React from "react";
import { PieChart } from "lucide-react";

interface ProfitCardProps {
  profits: {
    totalProfit: number;
    cashInProfit: number;
    cashOutProfit: number;
  };
}

export const ProfitCard: React.FC<ProfitCardProps> = ({ profits }) => {
  const { totalProfit, cashInProfit, cashOutProfit } = profits;

  const cashInPercentage =
    totalProfit > 0 ? (cashInProfit / totalProfit) * 100 : 0;
  const cashOutPercentage =
    totalProfit > 0 ? (cashOutProfit / totalProfit) * 100 : 0;

  return (
    <div className="relative p-0.5 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-gray-900 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Total Profit</p>
            <p className="text-2xl font-bold">
              ₱{totalProfit.toLocaleString()}
            </p>
          </div>
          <div className="bg-blue-900/40 p-3 rounded-xl text-blue-400">
            <PieChart className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-4">
          {/* Cash-In Profit */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Cash-In Profit</span>
              <span className="text-gray-200">
                ₱{cashInProfit.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                style={{ width: `${cashInPercentage}%` }}
              />
            </div>
          </div>
          {/* Cash-Out Profit */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Cash-Out Profit</span>
              <span className="text-gray-200">
                ₱{cashOutProfit.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                style={{ width: `${cashOutPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
