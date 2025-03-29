"use client";
import React from "react";
import Sections from "@/components/homepage/Sections";
import Navigation from "@/components/homepage/Navigation";
import Features from "@/components/homepage/Features";
import Scenario from "@/components/homepage/Scenario";
import Cta from "@/components/homepage/Cta";
import Footer from "@/components/homepage/Footer";

const page = () => {
  const primaryGradient = {
    background: "linear-gradient(90deg, #1a56db 0%, #4f46e5 100%)",
  };
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Sections />
      <Features />
      <Scenario />
      <Cta style={primaryGradient} />
      <Footer style={primaryGradient} />
    </div>
  );
};

export default page;
