"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { FaHeartbeat } from "react-icons/fa";
import { authClient } from "@/lib/auth-client"; 

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Safely grab callback URL dynamically or default to root home directory
  const redirectTo = searchParams ? searchParams.get("callbackUrl") || "/" : "/";

  // Email login handler implementation
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo, //above
      });

      if (error) {
        toast.error(`Login Failed: ${error.message || "Invalid credentials"}`);
      } else {
        toast.success("Welcome back! Login Successful.");
        form.reset();
        router.push(redirectTo); 
      }
    } catch (err) {
      toast.error("Database connection error");
    } finally {
      setLoading(false);
    }
  };

  // Google login handler implementation using Better-Auth social infrastructure
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo, 
      });
    } catch (err) {
      toast.error("Google Authentication Failed");
    }
  };

  return (
    <div className="max-w-md w-full bg-blue-50/50 p-8 rounded-3xl shadow-xl border border-blue-100/60 animate__animated animate__fadeInDown">
      
      {/* Header Section */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-md shadow-blue-600/10 mb-3">
          <FaHeartbeat size={26} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Login to DocAppoint</h2>
        <p className="text-slate-400 text-sm mt-1 font-medium">Access your digital healthcare portal</p>
      </div>
      
      {/* Credentials Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        
        {/* Email Field Block */}
        <div className="form-control w-full">
          <label className="label py-1">
            <span className="label-text font-bold text-slate-700 text-xs">Email Address</span>
          </label>
          <div className="relative">
            <HiMail className="absolute left-3 top-3.5 text-slate-400 size-5" />
            <input 
              name="email" 
              type="email" 
              placeholder="doctor@example.com" 
              className="input input-bordered w-full pl-10 border-slate-200 focus:border-blue-500 rounded-xl bg-white text-slate-800" 
              required 
            />
          </div>
        </div>

        {/* Password Field Block */}
        <div className="form-control w-full">
          <div className="flex justify-between items-center label py-1">
            <span className="label-text font-bold text-slate-700 text-xs">Password</span>
            <Link href="/forgot-password" className="text-xs text-blue-600 font-bold hover:underline">
              Forgot Password?
            </Link>
          </div>
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

        {/* Form Submission */}
        <button 
          type="submit"
          disabled={loading} 
          className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full rounded-xl mt-6 font-bold shadow-md shadow-blue-600/10 transition-all"
        >
          {loading ? "Verifying Session..." : "Login"}
        </button>
      </form>

      <div className="divider text-slate-400/80 my-6 text-[10px] font-bold uppercase tracking-widest">Or Continue With</div>

      {/* Social Provider Button Bridge */}
      <button 
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-800 w-full rounded-xl flex items-center justify-center gap-3 normal-case font-bold transition-all shadow-sm"
      >
        <FcGoogle size={22} /> Google Account
      </button>

      {/* Bottom Route Router Link */}
      <p className="text-center mt-8 text-slate-500 text-sm font-medium">
        Don’t have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline ml-1">Register Now</Link>
      </p>
    </div>
  );
};

// Main Export Component for Login Page
const LoginPage = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <Suspense fallback={
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-md text-blue-600"></span>
          <p className="text-sm font-bold text-slate-500">Loading Secure Portal...</p>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
};

export default LoginPage;