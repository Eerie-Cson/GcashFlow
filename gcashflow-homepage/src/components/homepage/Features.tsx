import React from "react";
import { RefreshCcw, BarChart, DollarSign } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Your GCash Business
          </h2>
          <p className="text-xl text-gray-600">
            Our platform offers everything you need to manage your GCash
            transactions efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <RefreshCcw size={28} />,
              title: "Seamless Transactions",
              description:
                "Process cash-in and cash-out transactions quickly with automatic balance updates.",
            },
            {
              icon: <BarChart size={28} />,
              title: "Balance Management",
              description:
                "Track both your GCash and physical cash balances in real-time with every transaction.",
            },
            {
              icon: <DollarSign size={28} />,
              title: "Profit Tracking",
              description:
                "Automatically calculate profits based on our transparent tiered fee structure.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition"
            >
              <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
