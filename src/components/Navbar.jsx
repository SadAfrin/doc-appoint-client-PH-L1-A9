"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHeartbeat } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client"; 

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Fetch real-time session and loading state from Better-Auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Handle secure user sign-out session destruction
  const handleLogout = async () => {
    try {
      console.log("Logging out server session...");
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully.");
            router.push("/login");
          }
        }
      });
    } catch (err) {
      toast.error("Failed to logout securely.");
    }
  };

  // Helper function to handle active navigation link states
  const isActive = (path) =>
    pathname === path
      ? "bg-blue-50 text-blue-600 font-bold"
      : "text-slate-600 font-medium hover:text-blue-600 hover:bg-blue-50";

  // Reusable component for core navigation links
  const NavLinks = () => (
    <>
      <li>
        <Link href="/" className={`${isActive("/")} px-6 py-2 rounded-xl transition-all`}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/appointments" className={`${isActive("/appointments")} px-6 py-2 rounded-xl transition-all`}>
          All Appointment
        </Link>
      </li>
      {/* Dashboard link conditionally rendered only for authenticated users */}
      {user && (
        <li>
          <Link href="/dashboard" className={`${isActive("/dashboard")} px-6 py-2 rounded-xl transition-all`}>
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto navbar px-4 md:px-8 min-h-[72px]">
        
        {/* Left Side Section: Mobile Menu and Main Logo */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-blue-600">
              <HiMenuAlt3 size={28} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 gap-2 border border-slate-100">
              <NavLinks />
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 group ml-2 lg:ml-0">
            <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
              <FaHeartbeat className="text-blue-600 text-xl" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-slate-800">
              Doc<span className="text-blue-600">Appoint</span>
            </span>
          </Link>
        </div>

        {/* Center Section: Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <NavLinks />
          </ul>
        </div>

        {/* Right Side Section */}
        <div className="navbar-end gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-blue-600"></span>
          ) : user ? (
            /* Authenticated Profile and Logout Interface View */
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
              </div>
              <div className="avatar border-2 border-blue-600 rounded-full p-0.5">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden">
                  <img alt={user.name} src={user.image || "https://i.ibb.co/mR79Y6B/user-placeholder.png"} />
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-xs md:btn-md bg-rose-50 text-rose-600 border-none hover:bg-rose-600 hover:text-white rounded-xl font-bold transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Unauthenticated Guest Interface View */
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-sm md:btn-md text-blue-600 font-bold bg-slate-100 border-none rounded-xl px-4 md:px-6 hover:bg-slate-200 transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn btn-sm md:btn-md text-white font-bold bg-blue-600 border-none rounded-xl px-4 md:px-6 hover:bg-blue-700 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;