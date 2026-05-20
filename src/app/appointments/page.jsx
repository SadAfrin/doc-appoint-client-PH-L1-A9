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
        </div>

        {/* Dynamic Empty Layout Validation Guard */}
        {doctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <p className="text-gray-500 font-medium">No doctors are registered yet!</p>
          </div>
        ) : (
          /* Responsive Grid Layout for Appointment Cards */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id || doctor.id}
                doctor={doctor}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;