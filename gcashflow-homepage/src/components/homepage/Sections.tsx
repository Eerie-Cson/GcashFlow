import React from "react";
import { ArrowRight } from "lucide-react";

const Sections = () => {
  return (
    <section className="pt-28 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-blue-50 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500 opacity-10 transform rotate-12 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-indigo-500 opacity-10 transform -rotate-12 -translate-x-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              GCash Business Management Solution
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Effortless GCash Transaction Management
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your GCash business with our comprehensive platform.
              Handle cash-in and cash-out transactions seamlessly with
              transparent profit calculations and real-time balance tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center">
                Start Managing <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl transform rotate-3"></div>
            <div className="absolute -inset-4 bg-white rounded-2xl shadow-lg transform -rotate-3"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500 mb-1">GCash Balance</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱ 12,458.50
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500 mb-1">Cash Balance</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₱ 8,750.00
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Cash-In Transaction</span>
                    <span className="text-green-600 font-medium">
                      + ₱ 500.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Profit</span>
                    <span>₱ 15.00</span>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Cash-Out Transaction</span>
                    <span className="text-blue-600 font-medium">
                      + ₱ 1,000.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Profit</span>
                    <span>₱ 20.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sections;
