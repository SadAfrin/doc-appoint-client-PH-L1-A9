"use client";

import Link from "next/link";
import { FaHeartbeat, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-100 text-slate-600 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Brand Section: Consistent Logo and Name Styling */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
              <FaHeartbeat className="text-blue-600 text-xl" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-slate-800">
              Doc<span className="text-blue-600">Appoint</span>
            </span>
          </Link>
          <p className="text-sm text-slate-500 font-medium">
            Your trusted digital manager for hassle-free doctor appointments.
          </p>
        </div>

        {/* Quick Links Section: Balanced and easily readable alignment */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold text-slate-800 tracking-wide text-sm uppercase">Quick Navigation</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium mt-1">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/appointments" className="hover:text-blue-600 transition-colors">
              All Appointment
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Social Icons Section: Using updated rebrands (X instead of Twitter bird) */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="font-bold text-slate-800 tracking-wide text-sm uppercase">Connect With Us</p>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl shadow-sm border border-slate-200/60 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl shadow-sm border border-slate-200/60 transition-all"
              aria-label="X (formerly Twitter)"
            >
              <FaXTwitter size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl shadow-sm border border-slate-200/60 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl shadow-sm border border-slate-200/60 transition-all"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-slate-200 bg-slate-200/50 py-4 text-center text-xs font-semibold text-slate-500 tracking-tight">
        &copy; {currentYear} DocAppoint. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;