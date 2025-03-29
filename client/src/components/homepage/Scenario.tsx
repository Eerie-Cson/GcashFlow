import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

const Scenario = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section
      id="scenarios"
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transaction Scenarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how our system handles different transaction types
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                "Cash-In",
                "Cash-Out (Profit in Transfer)",
                "Cash-Out (Separate Profit)",
              ].map((tab, index) => (
                <button
                  key={index}
                  className={`px-8 py-4 font-medium text-center ${
                    activeTab === index
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Cash-In Process
                  </h3>
                  <p className="text-gray-600 mb-6">
                    When a customer wants to convert their physical cash to
                    GCash:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        The customer pays you with real cash, including your
                        profit fee
                      </p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        You transfer the equivalent amount (excluding profit) to
                        their GCash account
                      </p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        Your GCash balance decreases while your cash balance
                        increases
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-4">Example Transaction</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Transaction Amount
                        </span>
                        <span className="font-medium">₱ 500.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Profit (Fee)</span>
                        <span className="font-medium text-green-600">
                          ₱ 15.00
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Customer Pays (Cash)
                        </span>
                        <span className="font-medium">₱ 515.00</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Customer Receives (GCash)
                        </span>
                        <span className="font-medium">₱ 500.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Cash-Out (Profit in Transfer)
                  </h3>
                  <p className="text-gray-600 mb-6">
                    When a customer wants to convert their GCash to physical
                    cash:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        The customer transfers the cash-out amount plus your
                        profit to your GCash account
                      </p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        You provide them with the equivalent real cash
                        (excluding profit)
                      </p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        Your GCash balance increases while your cash balance
                        decreases
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-4">Example Transaction</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Transaction Amount
                        </span>
                        <span className="font-medium">₱ 1,000.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Profit (Fee)</span>
                        <span className="font-medium text-green-600">
                          ₱ 20.00
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Customer Pays (GCash)
                        </span>
                        <span className="font-medium">₱ 1,020.00</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Customer Receives (Cash)
                        </span>
                        <span className="font-medium">₱ 1,000.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Cash-Out (Separate Profit)
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Alternative cash-out method with separate profit payment:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        The customer transfers only the cash-out amount to your
                        GCash account
                      </p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>They pay your profit separately in real cash</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-green-600 mt-1 mr-3 flex-shrink-0"
                      />
                      <p>
                        You provide the cash-out amount from your cash balance
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-4">Example Transaction</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Transaction Amount
                        </span>
                        <span className="font-medium">₱ 1,000.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Profit (Fee)</span>
                        <span className="font-medium text-green-600">
                          ₱ 20.00
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Customer Pays (GCash)
                        </span>
                        <span className="font-medium">₱ 1,000.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Customer Pays (Profit in Cash)
                        </span>
                        <span className="font-medium">₱ 20.00</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Customer Receives (Cash)
                        </span>
                        <span className="font-medium">₱ 1,000.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scenario;
