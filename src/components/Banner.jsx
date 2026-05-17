"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarCheck, FaUserMd } from "react-icons/fa";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      title: "Your Health, Our Closest Priority",
      subtitle: "Connect with verified specialist doctors instantly and schedule hassle-free appointments today.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      title: "Advanced Care & Professional Doctors",
      subtitle: "Skip long waiting lines. Take charge of your physical wellbeing with personalized treatment plans.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
      title: "Secure Digital Medical Management",
      subtitle: "Access private health records, dynamic schedules, and smart appointment tools in one interface.",
    },
  ];

  // Auto-playing logic loop to handle slide shifting safely
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [bannerSlides.length]);

  return (
    <section className="w-full relative h-[500px] md:h-[600px] bg-slate-900 overflow-hidden">
      {bannerSlides.map((slide, index) => {
        const isSelected = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isSelected ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Dynamic zooming background image wrapper layer */}
            <div
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] ease-out ${
                isSelected ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* High-contrast dark backing tint overlay */}
            <div className="absolute inset-0 bg-slate-950/70" />

            {/* Foreground Content Interface Grid */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold tracking-wide uppercase">
                  <FaUserMd /> Smart Care System
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none max-w-3xl">
                  {slide.title}
                </h1>

                <p className="text-base md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <Link
                    href="/appointments"
                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl px-6 font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all"
                  >
                    <FaCalendarCheck /> Book Appointment
                  </Link>
                  <Link
                    href="#top-doctors"
                    className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-6 font-semibold backdrop-blur-sm transition-all"
                  >
                    Explore Doctors
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Slide Navigation Bar Dots indicator panel */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-blue-600" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;