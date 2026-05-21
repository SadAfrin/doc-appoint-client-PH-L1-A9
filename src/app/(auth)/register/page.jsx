"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiUser, HiMail, HiLockClosed, HiLink } from "react-icons/hi";
import { FaHeartbeat } from "react-icons/fa";
// Importing the exact authClient according to your file export setup
import { authClient } from "@/lib/auth-client"; 


export const metadata = {
  title: "Register | Doctor Appointment",
  description: "Book your doctor appointment easily.",
};

const RegisterContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    // Password Validation Rules Enforcement 
    const password = userData.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (!hasUpperCase) {
      toast.error("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!hasLowerCase) {
      toast.error("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }

    // Direct Better-Auth code
    const { data, error } = await authClient.signUp.email({
      name: userData.name, 
      email: userData.email, 
      password: userData.password, 
      image: userData.photoUrl, 
      callbackURL: "/login", 
    });
    await authClient.signOut();

    if (error) {
      toast.error(`Registration Failed: ${error.message}`);
    } else {
      toast.success("Registration Successful! Please login.");
      event.target.reset();
      router.push("/login"); 
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      toast.error("Google Authentication Failed");
    }
  };

  return (
    <div className="max-w-md w-full bg-blue-50/50 p-8 rounded-3xl shadow-xl border border-blue-100/60 animate__animated animate__fadeInDown">
      
      {/* Header Section */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md shadow-blue-600/10 mb-3">
          <FaHeartbeat size={26} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Register to DocAppoint</h2>
        <p className="text-slate-400 text-sm mt-1 font-medium">Create an account and Join DocAppoint medical management portal</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        
        {/* Full Name Input Box */}
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text font-bold text-slate-700 text-xs">Full Name</span>
          </label>
          <div className="relative">
            <HiUser className="absolute left-3 top-3.5 text-slate-400 size-5" />
            <input
              name="name"
              type="text"
              placeholder="Sadia Rahman"
              className="input input-bordered w-full pl-10 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-slate-800"
              required
            />
          </div>
        </div>

        {/* Email Input Box */}
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text font-bold text-slate-700 text-xs">Email Address</span>
          </label>
          <div className="relative">
            <HiMail className="absolute left-3 top-3.5 text-slate-400 size-5" />
            <input
              name="email"
              type="email"
              placeholder="sadia@example.com"
              className="input input-bordered w-full pl-10 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-slate-800"
              required
            />
          </div>
        </div>

        {/* Photo URL Input Box */}
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text font-bold text-slate-700 text-xs">Photo URL</span>
          </label>
          <div className="relative">
            <HiLink className="absolute left-3 top-3.5 text-slate-400 size-5" />
            <input
              name="photoUrl"
              type="url"
              placeholder="https://example.com/profile.jpg"
              className="input input-bordered w-full pl-10 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-slate-800"
              required
            />
          </div>
        </div>

        {/* Password Input Box */}
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text font-bold text-slate-700 text-xs">Password</span>
          </label>
          <div className="relative">
            <HiLockClosed className="absolute left-3 top-3.5 text-slate-400 size-5" />
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full pl-10 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-slate-800"
              required
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full rounded-xl mt-4 font-bold shadow-md shadow-blue-600/10 transition-all"
        >
          {loading ? "Creating Credentials..." : "Register"}
        </button>
      </form>

      <div className="divider text-slate-400/80 my-5 text-[10px] font-bold uppercase tracking-widest">Or Register With</div>

      {/* Google Login Handler*/}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 w-full rounded-xl flex items-center justify-center gap-3 normal-case font-bold transition-all shadow-sm"
      >
        <FcGoogle size={22} /> Google Account
      </button>

      <p className="text-center mt-6 text-slate-500 text-sm font-medium">
        Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline ml-1">Login</Link>
      </p>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Suspense fallback={
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-blue-600"></span>
          <p className="text-sm font-bold text-slate-500">Loading Configuration System...</p>
        </div>
      }>
        <RegisterContent />
      </Suspense>
    </div>
  );
};

export default RegisterPage;