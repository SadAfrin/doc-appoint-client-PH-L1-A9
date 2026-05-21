"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify";
import MyBookings from "@/components/dashboard/MyBookings";
import MyProfile from "@/components/dashboard/MyProfile";
import AddDoctor from "@/components/dashboard/AddDoctor"; // Importing the admin form component

export const metadata = {
  title: "Dashboard | Doctor Appointment",
  description: "Book your doctor appointment easily.",
};


const DashboardPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Set default tab dynamically inside useEffect based on email rule definitions
  const [activeTab, setActiveTab] = useState("");

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    // 1. Wait until the session fetching process is completely finished
    if (isPending) return;

    // 2. Once pending is false, check if user data actually exists
    if (!user) {
      toast.error("Unauthorized! Please login to access the dashboard.");
      router.push("/login");
      return; // Stop further execution
    }
    
    // 3. If user exists, safely set the active tab according to role metrics
    if (user.email === ADMIN_EMAIL) {
      setActiveTab("add-doctor");
    } else {
      setActiveTab("bookings");
    }
  }, [user, isPending, router, ADMIN_EMAIL]);

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
    <div className="min-h-screen bg-indigo-100 p-4 sm:p-10 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title - Dynamically switches text content matching roles */}
        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
            {isAdmin ? "Admin Dashboard" : "Patient Dashboard"}
          </h1>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            {isAdmin ? "Manage Clinic Schedules and System Core" : "Manage your medical appointments and health profile"}
          </p>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-2 opacity-80" />
        </div>

        {/* Buttons Toggle Controller - Renders tabs conditionally */}
        <div className="flex items-center gap-3 w-full justify-center z-10">
          {isAdmin ? (
            <>
              <button 
                onClick={() => setActiveTab("add-doctor")}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 min-w-[130px] border cursor-pointer ${
                  activeTab === "add-doctor" 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.01]" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                Add Doctors
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setActiveTab("bookings")}
                className={`px-6 py-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 min-w-[130px] border cursor-pointer ${
                  activeTab === "bookings" 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.01]" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                My Bookings
              </button>
            </>
          )}

          {/* Profile tab is shared by both regular patients and admin */}
          <button 
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 min-w-[130px] border cursor-pointer ${
              activeTab === "profile" 
                ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.01]" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            My Profile
          </button>
        </div>

        {/* Dynamic Component Switching View Area */}
        <div className="transition-all duration-300 max-w-2xl mx-auto">
          {activeTab === "add-doctor" && isAdmin && <AddDoctor />}
          {activeTab === "bookings" && !isAdmin && <MyBookings user={user} />}
          {activeTab === "profile" && <MyProfile user={user} />}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;