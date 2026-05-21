"use client";

import React from "react";
import { FaHeartbeat, FaBrain, FaStethoscope, FaBaby, FaMagic } from "react-icons/fa";

const Specializations = () => {
  const categories = [
    { name: "Cardiology", icon: <FaHeartbeat />, desc: "Heart & blood vessels" },
    { name: "Neurology", icon: <FaBrain />, desc: "Brain & nerves" },
    { name: "Gynecology", icon: <FaStethoscope />, desc: "Women health" },
    { name: "Pediatrics", icon: <FaBaby />, desc: "Child care" },
    { name: "Dermatology", icon: <FaMagic />, desc: "Skin treatment" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center px-4">
        
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">
          Our Specializations
        </h2>
        <p className="text-slate-500 mb-12">
          Choose the right specialist for your health needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>

              <h3 className="font-bold text-slate-800 mb-2">
                {cat.name}
              </h3>

              <p className="text-sm text-slate-400">
                {cat.desc}
              </p>

              <div className="w-0 group-hover:w-12 h-1 bg-blue-500 mt-6 transition-all duration-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;