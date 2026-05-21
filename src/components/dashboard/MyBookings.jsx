"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; 

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!user?.email) return;

    try {
      setIsLoading(true);
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);

      const res = await fetch(`${process.env.SERVER_URL}/api/bookings?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
          "Content-Type": "application/json"
        },
        
      });
      const data = await res.json();
      
      if (data.success) {
        setBookings(data.result || []);
      }
    } catch (err) {
      toast.error("Failed to load your appointments.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const triggerCancelConfirmation = (id) => {
    setBookingIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookingIdToDelete) return;

    try {
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);

      const res = await fetch(`${process.env.SERVER_URL}/api/bookings/${bookingIdToDelete}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
          "Content-Type": "application/json"
        },
        
      });
      const data = await res.json();

      if (data.success) {
        setBookings((prev) => prev.filter((item) => item._id !== bookingIdToDelete));
        toast.success("Appointment canceled successfully.");
      }
    } catch (err) {
      toast.error("Failed to delete appointment.");
    } finally {
      setIsDeleteModalOpen(false);
      setBookingIdToDelete(null);
    }
  };

  const openEditModal = (booking) => {
    setSelectedBooking({ ...booking });
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);

      const { _id, ...updatedData } = selectedBooking;

      const res = await fetch(`${process.env.SERVER_URL}/api/bookings/${selectedBooking._id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}` 
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (data.success) {
        setBookings((prev) =>
          prev.map((item) => (item._id === selectedBooking._id ? selectedBooking : item))
        );
        setIsEditModalOpen(false);
        toast.success("Appointment updated successfully.");
      }
    } catch (err) {
      toast.error("Failed to update appointment.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-slate-800">Your Scheduled Appointments</h2>
        <span className="text-xs font-bold text-blue-600 bg-white px-4 py-2 rounded-xl border border-blue-100 shadow-sm">
          Total Bookings: {bookings.length}
        </span>
      </div>

      {isLoading ? (
        <div className="text-center p-12 bg-white rounded-3xl border border-blue-50/80 shadow-md flex justify-center items-center">
          <span className="loading loading-spinner text-blue-600 loading-md"></span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-3xl border border-blue-50/80 shadow-md">
          <p className="text-slate-500 font-medium">No scheduled appointments found on your account.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white border border-blue-50/60 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-md"
            >
              <div className="space-y-2 flex-1 w-full">
                <div className="flex justify-between md:justify-start items-center gap-3">
                  <h3 className="text-lg font-extrabold text-slate-800">{booking.doctorName}</h3>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg border border-emerald-100">
                    Confirmed
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-sm">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Patient</p>
                    <p className="text-slate-700 font-bold mt-0.5">{booking.patientName} ({booking.gender})</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone</p>
                    <p className="text-slate-700 font-bold mt-0.5">{booking.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Date</p>
                    <p className="text-slate-700 font-bold mt-0.5">{booking.appointmentDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Time Slot</p>
                    <p className="text-blue-600 font-black mt-0.5 bg-blue-50 border border-blue-100/50 inline-block px-2.5 py-0.5 rounded-md">
                      {booking.appointmentTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col lg:flex-row gap-2 w-full md:w-auto border-t border-slate-50 md:border-t-0 pt-4 md:pt-0">
                <button 
                  onClick={() => openEditModal(booking)}
                  className="flex-1 lg:flex-initial bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-blue-100 transition-all text-center"
                >
                  Update
                </button>
                <button 
                  onClick={() => triggerCancelConfirmation(booking._id)}
                  className="flex-1 lg:flex-initial bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm border border-rose-100 transition-all text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-blue-50 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600 text-xl font-black">
                !
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Cancel Appointment</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you to delete this appointment? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-700 text-sm text-center hover:bg-slate-200 transition-colors"
              >
                No, Keep it
              </button>
              <button 
                type="button" 
                onClick={handleConfirmDelete} 
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-extrabold text-sm text-center hover:bg-rose-700 transition-colors shadow-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Booking Modal */}
      {isEditModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-blue-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg font-extrabold">Update Appointment Details</h3>
                <p className="text-xs text-blue-100 mt-0.5">Modify the existing patient or schedule info</p>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Doctor Name (Disabled)</label>
                  <input type="text" disabled value={selectedBooking.doctorName} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Email (Disabled)</label>
                  <input type="text" disabled value={selectedBooking.userEmail} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Full Name</label>
                  <input type="text" required value={selectedBooking.patientName} className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={(e) => setSelectedBooking({...selectedBooking, patientName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                  <select required value={selectedBooking.gender} className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={(e) => setSelectedBooking({...selectedBooking, gender: e.target.value})}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number</label>
                  <input type="tel" required value={selectedBooking.phone} className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={(e) => setSelectedBooking({...selectedBooking, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Appointment Date</label>
                  <input type="date" required value={selectedBooking.appointmentDate} className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={(e) => setSelectedBooking({...selectedBooking, appointmentDate: e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Time Slot</label>
                  <input type="text" required value={selectedBooking.appointmentTime} className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={(e) => setSelectedBooking({...selectedBooking, appointmentTime: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-700 text-center hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-extrabold text-center hover:bg-blue-700 transition-colors shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;