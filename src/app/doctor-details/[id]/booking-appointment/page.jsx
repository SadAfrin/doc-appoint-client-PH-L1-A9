"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

// dammy data
const mockDoctors = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/doctor-demo.jpg",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description: "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800
  }
];

const BookingAppointmentPage = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "user@gmail.com"; 

  // Dynamic fallback to the documentation demo data structure
  const doctor = mockDoctors.find((doc) => doc.id === id) || mockDoctors[0];

  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  
  // Custom states for error messages and success views
  const [timeError, setTimeError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper utility function to parse time strings into comparable 24-hour minutes
  const convertToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Main logic checking if input time falls into any of the doctor's availability ranges
  const validateTimeSlot = (inputTimeStr) => {
    try {
      const inputMinutes = convertToMinutes(inputTimeStr);
      
      // Iterate through doctor's defined availability intervals
      const isValid = doctor.availability.some((range) => {
        const [startStr, endStr] = range.split(" - ");
        const startMinutes = convertToMinutes(startStr);
        const endMinutes = convertToMinutes(endStr);
        return inputMinutes >= startMinutes && inputMinutes <= endMinutes;
      });

      return isValid;
    } catch (e) {
      return false; // Returns false if the user enters garbage values or invalid formats
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeError(""); // Clear any prior runtime validation tracking

    // Enforcing doctor schedule policy
    const isAvailable = validateTimeSlot(appointmentTime);

    if (!isAvailable) {
      setTimeError(`Doctor is not available at this time. Please choose a slot within: ${doctor.availability.join(" or ")}`);
      return; // Stop form execution and prevent network dispatch
    }

    const bookingPayload = {
      userEmail,
      doctorName: doctor.name, 
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime, // Follows required string specification format (e.g., "10:30 AM")
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Server validation error or database mismatch.");
      }
    } catch (error) {
      console.error("Transmission error across fetch operation:", error);
      alert("Failed to reach Express server instance.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-gray-900">Appointment Booked!</h2>
            <p className="text-sm text-gray-500 font-normal">Your schedule has been saved successfully.</p>
          </div>
          <button 
            onClick={() => router.push(`/doctor-details/${id}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-sm transition duration-200"
          >
            Back to Doctor Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl w-full overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h1 className="text-2xl font-extrabold">Fill Appointment Form</h1>
          <p className="text-sm text-blue-100 mt-1">
            Booking an appointment with <span className="font-semibold underline text-white">{doctor.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Account Email Meta Area */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Account Email (Read-Only)
              </label>
              <input 
                type="text" 
                disabled
                value={userEmail} 
                className="w-full p-3.5 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 font-medium outline-none cursor-not-allowed"
              />
            </div>

            {/* Patient Full Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rahim Uddin" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setPatientName(e.target.value)} 
              />
            </div>

            {/* Gender Selection Interface Menu */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Phone Input Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                placeholder="e.g. 01712345678" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>

            {/* Calendar Booking Date Target */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Date</label>
              <input 
                type="date" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setAppointmentDate(e.target.value)} 
              />
            </div>

            {/* Dynamic Appointment Time Slot String Evaluation Target */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preferred Time (e.g., 10:30 AM)
              </label>
              <input 
                type="text" 
                placeholder="e.g. 10:30 AM" 
                required 
                className={`w-full p-3.5 border rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 outline-none transition ${
                  timeError ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
                }`} 
                onChange={(e) => setAppointmentTime(e.target.value)} 
              />
              {/* Contextual Alert Messaging Interface Block */}
              {timeError && (
                <p className="text-red-500 text-xs font-medium mt-1.5 leading-normal animate-shake">
                  ⚠️ {timeError}
                </p>
              )}
              <p className="text-gray-400 text-xs mt-1">
                Doctor availability schedules: {doctor.availability.join(" | ")}
              </p>
            </div>

          </div>

          {/* Pricing Row Deck */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold">Consultation Fee</span>
            <span className="font-extrabold text-gray-900 text-lg">{doctor.fee} BDT</span>
          </div>

          {/* Action Trigger Components Row */}
          <div className="flex gap-4 pt-2">
             <button 
               type="button" 
               onClick={() => router.back()} 
               className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition text-center"
             >
               Cancel
             </button>
             <button 
               type="submit" 
               className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-extrabold hover:bg-blue-700 shadow-sm transition text-center"
             >
               Confirm Booking
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingAppointmentPage;