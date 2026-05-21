"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const UserProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "" });

  if (!user) return null;

  const openModal = () => {
    setFormData({ name: user.name || "", image: user.image || "" });
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);

      // if (!tokenData?.token) {
      //     console.error("Token missing, request aborted");
      //     return; 
      // }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        // credentials: "include",
        body: JSON.stringify({
          email: user.email,
          name: formData.name,
          image: formData.image
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await authClient.updateUser({
          name: formData.name,
          image: formData.image
        });

        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="text-left">
        <h2 className="text-xl font-black text-slate-800">My Profile</h2>
      </div>

      <div className="bg-white border border-blue-50/60 p-8 rounded-3xl shadow-sm flex flex-col items-center justify-center space-y-4">
        <div className="w-24 h-24 rounded-full p-1 bg-white border border-blue-100 shadow-sm overflow-hidden flex items-center justify-center">
          <img 
            src={user.image || "https://i.ibb.co/mR79Y6B/user-placeholder.png"} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover" 
          />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900">{user.name}</h3>

        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium justify-center">
          <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>{user.email}</span>
        </div>

        <button 
          onClick={openModal} 
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-extrabold text-sm hover:bg-blue-700 transition-colors shadow-sm"
        >
          Update Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-blue-50 text-left">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-lg font-extrabold">Update Profile</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Photo (URL)</label>
                <input 
                  type="url" 
                  required 
                  value={formData.image} 
                  className="w-full p-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving} 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-extrabold text-sm hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isSaving ? "Updating..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;