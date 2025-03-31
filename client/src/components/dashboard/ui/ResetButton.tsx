import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onConfirm: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <RotateCcw size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Reset</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to reset all data?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                }}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
