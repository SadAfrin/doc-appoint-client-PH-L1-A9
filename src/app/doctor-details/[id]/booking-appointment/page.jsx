"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Pull authenticated session email

// Complete Mock data array to retain doctor context dynamically
const mockDoctors = [
  { id: "1", doctorName: "Dr. Ariful Islam", specialty: "Cardiologist", fee: "1000 BDT" },
  { id: "2", doctorName: "Dr. Nusrat Jahan", specialty: "Gynecologist", fee: "1200 BDT" },
  { id: "3", doctorName: "Dr. Tanvir Rahman", specialty: "Pediatrician", fee: "800 BDT" },
];

const BookingAppointmentPage = () => {
  const { id } = useParams();
  const router = useRouter();
  
  // Safely grab user session using Better-Auth client configuration
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "user@gmail.com"; 

  // Locate targeted doctor data object matching URL id param
  const doctor = mockDoctors.find((doc) => doc.id === id);

  // Controlled component state hooks mapped to database object keys
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Doctor Profile Not Found</h2>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Structuring unified dynamic booking payload matching requirements
    const bookingPayload = {
      userEmail,
      doctorName: doctor.doctorName, // Safely mapped dynamically from active context
      patientName,
      gender,
      phone,
      appointmentDate,
      appointmentTime,
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
        alert("Server failed to complete database write operation.");
      }
    } catch (error) {
      console.error("Fetch pipeline operation error:", error);
      alert("Could not build a stable network bridge to the Express server.");
    }
  };

  // Modern success screen container layout
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-gray-900">Appointment Booked!</h2>
            <p className="text-sm text-gray-500 font-normal">Your scheduling payload was cleanly routed and stored in MongoDB.</p>
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
      {/* Horizontally expanded card container using max-w-3xl for optimal grid presentation */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl w-full overflow-hidden">
        
        {/* Top Decorative Card Title Wrapper */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h1 className="text-2xl font-extrabold">Fill Appointment Form</h1>
          <p className="text-sm text-blue-100 mt-1">
            Scheduling custom consultation session with <span className="font-semibold underline text-white">{doctor.doctorName}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* 2-Column Responsive Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Read-only Secured Session Email */}
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

            {/* Patient Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rahim Uddin" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setPatientName(e.target.value)} 
              />
            </div>

            {/* Gender Selection Interface (Fixed Handler Missing Bug) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setGender(e.target.value)} // FIXED: target.value binding injected correctly
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Phone Number Input */}
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

            {/* Calendar Appoint Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment Date</label>
              <input 
                type="date" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setAppointmentDate(e.target.value)} 
              />
            </div>

            {/* Appointment Time Input Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time Slot</label>
              <input 
                type="text" 
                placeholder="e.g. 10:30 AM" 
                required 
                className="w-full p-3.5 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                onChange={(e) => setAppointmentTime(e.target.value)} 
              />
            </div>

          </div>

          {/* Pricing Overview Row Section */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold">Total Consultation Fee Due</span>
            <span className="font-extrabold text-gray-900 text-lg">{doctor.fee}</span>
          </div>

          {/* Interactive Trigger Component Row */}
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