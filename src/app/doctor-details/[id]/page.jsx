"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  // State management for a single doctor
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Core hook fetching specific doctor document corresponding to the URL parameter ID
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/${id}`);
        const result = await res.json();

        if (result.success && result.data) {
          setDoctor(result.data);
        } else {
          toast.error("Doctor profile records not found.");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        toast.error("Failed to connect with core profile registry database server");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  // Navigate to the separate dedicated dynamic booking page route
  const handleBookingRedirect = () => {
    router.push(`/doctor-details/${id}/booking-appointment`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }


  // if the targeted doctor is not found 
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
          //alert icon
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Doctor Profile Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            The doctor profile registry record you are trying to access is unavailable or the link contains an invalid security ID segment.
          </p>

          {/* Action Button to Return */}
          <button
            onClick={() => router.push("/appointments")}
            className="w-full inline-flex justify-center items-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors duration-200"
          >
            Return to Doctors
          </button>
        </div>
      </div>
    );
  }
  // ----------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Responsive Layout Split */}
        <div className="flex flex-col md:flex-row">
          
          {/* Doctor Image Block */}
          <div className="md:w-2/5 h-80 md:h-auto relative bg-gray-100">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Specifications Container */}
          <div className="p-8 md:w-3/5 flex flex-col justify-between">
            <div>
              {/* Specialty Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800">
                {doctor.specialty}
              </span>
              
              {/* Doctor Header Info */}
              <h1 className="text-3xl font-bold text-gray-900 mt-3">
                {doctor.name}
              </h1>
              <p className="text-sm font-medium text-blue-600 mt-1">
                {doctor.degrees}
              </p>
              
              {/* Core Information */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Hospital:</span> {doctor.hospital}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Experience:</span>{" "}
                  {doctor.experience?.toString().includes("year") ? doctor.experience : `${doctor.experience} Years`}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Visiting Hours:</span>{" "}
                  {Array.isArray(doctor.availability) ? doctor.availability.join(", ") : doctor.availability}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Consultation Fee:</span>{" "}
                  <span className="text-gray-900 font-bold text-base">{doctor.fee} BDT</span>
                </p>
              </div>

              {/* Professional Background About Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-md font-bold text-gray-900 mb-2">About Doctor</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {doctor.description || "No specific background description has been added yet."}
                </p>
              </div>
            </div>

            {/* Book Appointment Interactive Redirect Area */}
            <div className="mt-8">
              <button
                onClick={handleBookingRedirect}
                className="w-full md:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors duration-200"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;