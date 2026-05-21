"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { fetchProtected } from "@/lib/api"; //for jwt

const AddDoctor = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Form input states alignment based on doctor data fields
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("General Physician");
  const [image, setImage] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");

  // Handling multi-slot arrays for doctor clinical availability
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState("");

  const [loading, setLoading] = useState(false);

  // Quick list for specialty dropdown selection
  const specialties = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
  ];

  // Helper function to dynamically add time slots into state array
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!currentSlot.trim()) return;
    
    if (slots.includes(currentSlot.trim())) {
      toast.warn("This time slot is already added!");
      return;
    }

    setSlots([...slots, currentSlot.trim()]);
    setCurrentSlot("");
  };

  // Helper function to remove a time slot from state array
  const handleRemoveSlot = (indexToRemove) => {
    setSlots(slots.filter((_, index) => index !== indexToRemove));
  };

  // Handle ultimate form submit payload to express server backend node
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !experience || !hospital || !location || !fee || slots.length === 0) {
      toast.error("Please fill in all required fields and add at least one time slot.");
      return;
    }

    try {
      setLoading(false);
      setLoading(true);

      const payload = {
        adminEmail: user?.email || process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        doctorData: {
          name,
          specialty,
          image: image || "https://i.ibb.co/mR79Y6B/user-placeholder.png", // safe fallback layout logic
          experience: `${experience} years`,
          availability: slots,
          description,
          hospital,
          location,
          fee: Number(fee),
        },
      };

      const res = await fetchProtected("http://localhost:5000/api/doctors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Doctor added to the panel successfully!");
        // Clear all form records smoothly
        setName("");
        setSpecialty("General Physician");
        setImage("");
        setExperience("");
        setHospital("");
        setLocation("");
        setFee("");
        setDescription("");
        setSlots([]);
      } else {
        toast.error(data.message || "Failed to append doctor data registry.");
      }
    } catch (err) {
      console.error("AddDoctor fetch client error:", err);
      toast.error("Network communication failure with core server setup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/[0.02] w-full">
      <div className="mb-6 text-left">
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Register New Doctor</h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">Input authorized clinical expert specifications below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        
        {/* Row 1: Name and Specialty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Doctor Full Name *</span></label>
            <input 
              type="text" 
              placeholder="e.g. Dr. Ayesha Rahman" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Medical Specialty *</span></label>
            <select 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
              className="select select-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500"
            >
              {specialties.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Image URL and Years of Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Doctor Profile Image URL</span></label>
            <input 
              type="url" 
              placeholder="e.g. https://i.ibb.co/image-path.jpg" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Experience (In Years) *</span></label>
            <input 
              type="number" 
              placeholder="e.g. 10" 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
          </div>
        </div>

        {/* Row 3: Hospital Name and Consultation Fee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Affiliated Hospital *</span></label>
            <input 
              type="text" 
              placeholder="e.g. Labaid Cardiac Hospital" 
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
          </div>

          <div className="form-control w-full">
            <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Consultation Fee (BDT) *</span></label>
            <input 
              type="number" 
              placeholder="e.g. 800" 
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
          </div>
        </div>

        {/* Row 4: Location Mapping */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Chamber Location *</span></label>
          <input 
            type="text" 
            placeholder="e.g. Dhanmondi, Dhaka" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input input-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
          />
        </div>

        {/* Row 5: Time Slots Generator Array Widget */}
        <div className="form-control w-full bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-4 space-y-3">
          <label className="block text-xs font-bold text-slate-600">Manage Availability Time Slots *</label>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="e.g. 09:00 AM - 12:00 PM" 
              value={currentSlot}
              onChange={(e) => setCurrentSlot(e.target.value)}
              className="input input-bordered rounded-xl text-xs flex-1 bg-white text-slate-800 border-slate-200 focus:outline-blue-500" 
            />
            <button 
              onClick={handleAddSlot}
              className="btn bg-blue-600 border-none text-white font-extrabold text-xs uppercase px-4 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Add Slot
            </button>
          </div>

          {/* Time Slot BADGES list rendering */}
          <div className="flex flex-wrap gap-2 pt-1">
            {slots.length === 0 ? (
              <span className="text-[11px] text-slate-400 font-medium italic">No active schedules assigned yet.</span>
            ) : (
              slots.map((slot, index) => (
                <div key={index} className="badge bg-blue-50 border border-blue-200 text-blue-600 font-bold px-3 py-3 rounded-lg flex items-center gap-2 text-xs">
                  {slot}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSlot(index)} 
                    className="text-rose-500 font-extrabold hover:text-rose-700 text-[10px] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Row 6: Description */}
        <div className="form-control w-full">
          <label className="label py-1"><span className="label-text text-xs font-bold text-slate-600">Doctor Professional Profile Summary</span></label>
          <textarea 
            rows="3"
            placeholder="Write a short summary about the doctor's expert operations..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered rounded-xl text-sm w-full bg-white text-slate-800 border-slate-200 focus:outline-blue-500 resize-none"
          />
        </div>

        {/* Submit Controller Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn bg-blue-600 border-none text-white font-black text-xs uppercase tracking-wider rounded-xl py-3 mt-2 hover:bg-blue-700 disabled:bg-slate-300 transition-all cursor-pointer shadow-md"
        >
          {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save Doctor to System"}
        </button>

      </form>
    </div>
  );
};

export default AddDoctor;