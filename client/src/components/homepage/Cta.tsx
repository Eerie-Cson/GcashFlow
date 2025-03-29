import React from "react";

const Cta = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <section className="py-16" style={style}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to optimize your GCash business?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Start managing your transactions more efficiently today.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:shadow-lg transition">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default Cta;
