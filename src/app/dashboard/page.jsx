"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify";
import MyBookings from "@/components/dashboard/MyBookings";
import MyProfile from "@/components/dashboard/MyProfile";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Unauthorized! Please login to access the dashboard.");
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50/50">
        <div className="flex flex-col items-center gap-2">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm text-blue-600 font-semibold animate-pulse">Verifying session security...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef6fc] p-4 sm:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            Patient Dashboard
          </h1>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            Manage your medical appointments and health profile
          </p>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-2 opacity-80" />
        </div>

        {/* Clean White Panel Frame */}
        <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/[0.03] flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
          
          {/* Left Side: Picture & Info */}
          <div className="flex items-center flex-col sm:flex-row text-center sm:text-left gap-5 z-10">
            <div className="w-24 h-24 rounded-full border-4 border-blue-600 p-1 bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src={user.image || "https://i.ibb.co/mR79Y6B/user-placeholder.png"} 
                alt={user.name || "User profile image"} 
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/mR79Y6B/user-placeholder.png";
                }}
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{user.name}</h2>
              <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-xl shadow-inner">
                  {user.email}
                </span>
              </div>
              
            </div>
          </div>

          {/* Right Side: Buttons Toggle Controller */}
          <div className="flex items-center gap-3 w-full md:w-auto border-t border-slate-100 md:border-t-0 pt-4 md:pt-0 justify-center z-10">
            <button 
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 min-w-[130px] border ${
                activeTab === "bookings" 
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20 shadow-md transform scale-[1.01]" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              My Bookings
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 min-w-[130px] border ${
                activeTab === "profile" 
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/20 shadow-md transform scale-[1.01]" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              My Profile
            </button>
          </div>

        </div>

        {/* Dynamic Component Switching View Area */}
        <div className="transition-all duration-300">
          {activeTab === "bookings" ? (
            <MyBookings user={user} />
          ) : (
            <MyProfile user={user} />
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;