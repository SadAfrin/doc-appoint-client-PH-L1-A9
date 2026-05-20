"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Better-Auth client instance

// Mock data representing available medical appointments
const dummyAppointments = [
  {
    id: "1",
    doctorName: "Dr. Ariful Islam",
    specialty: "Cardiologist",
    hospital: "Dhaka Medical College Hospital",
    availableTime: "Sat - Mon (5:00 PM - 8:00 PM)",
    fee: "1000 BDT",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    doctorName: "Dr. Nusrat Jahan",
    specialty: "Gynecologist",
    hospital: "Square Hospital",
    availableTime: "Sun - Wed (3:00 PM - 6:00 PM)",
    fee: "1200 BDT",
    image: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    doctorName: "Dr. Tanvir Rahman",
    specialty: "Pediatrician",
    hospital: "Evercare Hospital",
    availableTime: "Tue - Thu (6:00 PM - 9:00 PM)",
    fee: "800 BDT",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  },
];

const AllAppointments = () => {
  const router = useRouter();
  
  // Track user authentication status using Better-Auth hook
  const { data: session, isPending } = authClient.useSession();

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

        {/* Responsive Grid Layout for Appointment Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Cover Image Container */}
              <div className="relative h-48 w-full bg-gray-200">
                <img
                  src={appointment.image}
                  alt={appointment.doctorName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Details Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                    {appointment.specialty}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">
                    {appointment.doctorName}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 font-medium">
                    {appointment.hospital}
                  </p>

                  {/* Schedule and Pricing Info */}
                  <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="font-semibold text-gray-800 mr-1">Time:</span>{" "}
                      {appointment.availableTime}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="font-semibold text-gray-800 mr-1">Fee:</span>{" "}
                      {appointment.fee}
                    </p>
                  </div>
                </div>

                {/* Call To Action Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleViewDetails(appointment.id)}
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;