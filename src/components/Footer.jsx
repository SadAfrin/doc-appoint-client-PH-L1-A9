"use client";

import Link from "next/link";
import { FaHeartbeat, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Professional dark slate background
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 items-start text-center md:text-left">

        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600/20 p-2 rounded-xl">
              <FaHeartbeat className="text-blue-400 text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Doc<span className="text-blue-400">Appoint</span>
            </span>
          </Link>

          <p className="text-sm text-slate-400 font-medium max-w-sm">
            Your trusted digital manager for hassle-free doctor appointments.
          </p>

          <div className="text-sm text-slate-400 space-y-1">
            <p>Email: support@docappoint.com</p>
            <p>Emergency: +880 1234-567890</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <p className="font-bold text-white text-sm uppercase tracking-widest">
            Quick Navigation
          </p>
          <div className="flex flex-col gap-3 text-sm font-medium">
            {["Home", "Appointments", "Dashboard", "Privacy Policy", "Terms & Conditions"].map((item) => (
              <Link 
                key={item} 
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="font-bold text-white text-sm uppercase tracking-widest">
            Connect With Us
          </p>
          <div className="flex gap-4">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 bg-slate-800 hover:bg-blue-600 hover:scale-110 text-white rounded-xl transition-all duration-300 border border-slate-700"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {currentYear} DocAppoint. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-blue-400">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;