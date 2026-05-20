"use client";

import Link from "next/link";
import {
  FaHeartbeat,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-600 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-10 items-start text-center md:text-left">

        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-50 p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
              <FaHeartbeat className="text-blue-600 text-xl" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-slate-800">
              Doc<span className="text-blue-600">Appoint</span>
            </span>
          </Link>

          <p className="text-sm text-slate-500 font-medium max-w-sm">
            Your trusted digital manager for hassle-free doctor appointments.
          </p>

          {/* Extra info added */}
          <div className="text-sm text-slate-500 space-y-1">
            <p>Email: support@docappoint.com</p>
            <p>Emergency: +880 1234-567890</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-bold text-slate-800 text-sm uppercase tracking-wide">
            Quick Navigation
          </p>

          <div className="flex flex-col gap-2 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              href="/appointments"
              className="hover:text-blue-600 transition-colors"
            >
              All Appointment
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="font-bold text-slate-800 text-sm uppercase tracking-wide">
            Connect With Us
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 hover:scale-105 hover:shadow-md text-slate-600 hover:text-blue-600 rounded-xl border border-slate-200/60 transition-all"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 hover:scale-105 hover:shadow-md text-slate-600 hover:text-blue-600 rounded-xl border border-slate-200/60 transition-all"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-blue-50 hover:scale-105 hover:shadow-md text-slate-600 hover:text-blue-600 rounded-xl border border-slate-200/60 transition-all"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-slate-200/40 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <p>© {currentYear} DocAppoint. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;