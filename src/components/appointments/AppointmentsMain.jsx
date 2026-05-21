"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Better-Auth client instance
import { toast } from "react-toastify";
import DoctorCard from "@/components/DoctorCard";


const AllAppointments = () => {
  const router = useRouter();
  
  // Track user authentication status using Better-Auth hook
  const { data: session, isPending } = authClient.useSession();

  // State management for raw fetched core data from endpoint registry
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search bar

  // Core hook fetching integrated doctors dataset list on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const allDoctors = await res.json();
        
        // Base validations structured strictly around 'allDoctors' variable response
        if (allDoctors.success || Array.isArray(allDoctors)) {
          // Fallback parsing extracting 'allDoctors.data' object array dynamically
          setDoctors(Array.isArray(allDoctors) ? allDoctors : allDoctors.data || []);
        } else {
          toast.error("Failed to parse system doctor records properly.");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        toast.error("Network connection error to core backend infrastructure server");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter logic based on search term
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle conditional navigation based on user session status
  const handleViewDetails = (doctorId) => {
    if (isPending) return;

    if (session) {
      // Redirect authenticated users to the specific doctor's details page
      router.push(`/doctor-details/${doctorId}`);
    } else {
      // Force unauthenticated users to authenticate first
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Available Appointments
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find and book appointments with top-rated professional doctors.
          </p>

          {/* Search Bar Section */}
<div className="mt-8 flex justify-center">
  <div className="relative w-full max-w-lg">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search here with doctor's name" 
      className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl border-2 border-gray-300 shadow-md focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none transition-all placeholder:text-gray-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>
        </div>

        {/* Dynamic Empty Layout Validation Guard */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <p className="text-gray-500 font-medium">No doctors found matching "{searchTerm}"</p>
          </div>
        ) : (
          /* Responsive Grid Layout for Appointment Cards */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor._id || doctor.id}
                doctor={doctor}
                onViewDetails={() => handleViewDetails(doctor._id || doctor.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;