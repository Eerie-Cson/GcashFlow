import React, { useState } from "react";

interface InitialSetupFormProps {
  initialBalances: {
    gcash: string;
    cash: string;
  };
  setInitialBalances: (
    value: React.SetStateAction<{
      gcash: string;
      cash: string;
    }>
  ) => void;
  onComplete: () => void;
}

export const InitialSetupForm: React.FC<InitialSetupFormProps> = ({
  initialBalances,
  setInitialBalances,
  onComplete,
}) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          GCashFlow
        </h1>
        <p className="text-gray-400 text-center mb-6 ">
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
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setInitialBalances((prev) => ({ ...prev, gcash: "" }));
                  setError(null);
                } else {
                  const parsedValue = parseFloat(value);
                  if (parsedValue >= 0) {
                    setInitialBalances((prev) => ({ ...prev, gcash: value }));
                    setError(null);
                  } else {
                    setError(
                      "Invalid value. Please enter a value greater than 0."
                    );
                  }
                }
              }}
            />
            {error && <p className="text-red-500">{error}</p>}
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
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all"
            onClick={onComplete}
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
};
