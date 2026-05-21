"use client";

import React from "react";
import { FiUsers, FiAward, FiMapPin } from "react-icons/fi";

const StatsSection = () => {
  const stats = [
    { label: "Satisfied Patients", value: "10K+", icon: <FiUsers /> },
    { label: "Expert Doctors", value: "500+", icon: <FiAward /> },
    { label: "Hospital Branches", value: "25+", icon: <FiMapPin /> },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      
      {/* Dynamic and clean background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-[100px] -top-40 -left-60"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-[80px] -bottom-20 -right-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Modern and more professional grid spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
            >
              
              {/* Clean Icon Container */}
              <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mb-8 text-4xl group-hover:bg-white group-hover:text-blue-700 transition-all duration-300 shadow-inner">
                {stat.icon}
              </div>

              <h3 className="text-5xl font-black text-white leading-tight">
                {stat.value}
              </h3>

              <p className="text-xl text-blue-100 mt-3 font-medium tracking-wide">
                {stat.label}
              </p>

              {/* Minimalist divider */}
              <div className="w-16 h-1 bg-white/30 mt-8 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;