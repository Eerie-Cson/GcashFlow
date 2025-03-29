import React from "react";
import logo from "../../app/images/icon2.png";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Logo" className="h-12 w-12 rounded-lg" />
          <span className="text-xl font-semibold">GCash Flow</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Features
          </a>
          <a
            href="#scenarios"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Scenarios
          </a>
          <a
            href="#profit"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Pricing
          </a>
          <a
            href="#support"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Support
          </a>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
