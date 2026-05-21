"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const BookingAppointmentPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email || "Not logged in";

  // State management for doctor data, form fields, and UI feedback
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/${id}`);
        const data = await res.json();
        if (data.success) {
          setDoctor(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  // Utility to convert time string (e.g., "10:30 AM") to total minutes from midnight
  const convertToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Validate if the chosen time falls within the doctor's availability slots
  const validateTimeSlot = (inputTimeStr) => {
    try {
      const inputMinutes = convertToMinutes(inputTimeStr);
      return doctor?.availability.some((range) => {
        const [startStr, endStr] = range.split(" - ");
        const startMinutes = convertToMinutes(startStr);
        const endMinutes = convertToMinutes(endStr);
        return inputMinutes >= startMinutes && inputMinutes <= endMinutes;
      });
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeError("");

    if (!validateTimeSlot(appointmentTime)) {
      setTimeError(`Doctor is not available at this time. Available: ${doctor.availability.join(" or ")}`);
      return;
    }

    const bookingPayload = {
      userEmail,
      doctorName: doctor.name,
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
        alert("Server validation error.");
      }
    } catch (error) {
      console.error("Transmission error:", error);
      alert("Failed to submit booking.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!doctor) return <div className="text-center p-10">Doctor not found.</div>;

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl">✓</div>
          <h2 className="text-2xl font-extrabold text-gray-900">Appointment Booked!</h2>
          <button 
            onClick={() => router.push(`/doctor-details/${id}`)}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold"
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
          <p className="text-sm text-blue-100 mt-1">Booking with <span className="font-semibold text-white">{doctor.name}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Account Email</label>
              <input disabled value={userEmail} className="w-full p-3.5 border rounded-xl bg-gray-50 text-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name</label>
              <input type="text" required className="w-full p-3.5 border rounded-xl" onChange={(e) => setPatientName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select required className="w-full p-3.5 border rounded-xl" onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input type="tel" required className="w-full p-3.5 border rounded-xl" onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input type="date" required className="w-full p-3.5 border rounded-xl" onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Time (e.g., 10:30 AM)</label>
              <input type="text" required className={`w-full p-3.5 border rounded-xl ${timeError ? "border-red-500" : ""}`} onChange={(e) => setAppointmentTime(e.target.value)} />
              {timeError && <p className="text-red-500 text-xs mt-1.5">⚠️ {timeError}</p>}
              <p className="text-gray-400 text-xs mt-1">Available: {doctor.availability.join(" | ")}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center text-sm font-bold">
            <span>Consultation Fee</span>
            <span className="text-lg">{doctor.fee} BDT</span>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-100 py-3.5 rounded-xl font-bold">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingAppointmentPage;