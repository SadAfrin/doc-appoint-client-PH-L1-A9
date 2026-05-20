"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

// Mock data array simulating database documents
const mockDoctors = [
  {
    id: "1",
    doctorName: "Dr. Ariful Islam",
    specialty: "Cardiologist",
    hospital: "Dhaka Medical College Hospital",
    availableTime: "Sat - Mon (5:00 PM - 8:00 PM)",
    fee: "1000 BDT",
    experience: "12+ Years",
    degrees: "MBBS, FCPS (Cardiology), MD",
    about: "Dr. Ariful Islam is a highly accomplished cardiologist dedicated to delivering comprehensive cardiovascular care. With over a decade of clinical experience, he specializes in interventional cardiology and preventive heart care treatments.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    doctorName: "Dr. Nusrat Jahan",
    specialty: "Gynecologist",
    hospital: "Square Hospital",
    availableTime: "Sun - Wed (3:00 PM - 6:00 PM)",
    fee: "1200 BDT",
    experience: "10 Years",
    degrees: "MBBS, MS (OBGYN), DGO",
    about: "Dr. Nusrat Jahan is an experienced specialist in women's reproductive health, prenatal care, and complex maternal-fetal medicine. She is widely recognized for her compassionate approach to patient care.",
    image: "https://images.unsplash.com/photo-1594824813573-246434e3b96f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    doctorName: "Dr. Tanvir Rahman",
    specialty: "Pediatrician",
    hospital: "Evercare Hospital",
    availableTime: "Tue - Thu (6:00 PM - 9:00 PM)",
    fee: "800 BDT",
    experience: "8 Years",
    degrees: "MBBS, MD (Pediatrics)",
    about: "Dr. Tanvir Rahman specializes in newborn care, childhood development assessment, and managing pediatric chronic health syndromes. He provides a welcoming environment for children and parents alike.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
  },
];

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  // Find the specific doctor document corresponding to the URL dynamic segment ID
  const doctor = mockDoctors.find((doc) => doc.id === id);

  // Navigate to the separate dedicated dynamic booking page route
  const handleBookingRedirect = () => {
    router.push(`/doctor-details/${id}/book`);
  };

  // Safeguard view structure if the targeted doctor is not found
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Doctor Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Main Content Responsive Layout Split */}
        <div className="flex flex-col md:flex-row">
          
          {/* Doctor Image Block */}
          <div className="md:w-2/5 h-80 md:h-auto relative bg-gray-100">
            <img
              src={doctor.image}
              alt={doctor.doctorName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detailed Specifications Container */}
          <div className="p-8 md:w-3/5 flex flex-col justify-between">
            <div>
              {/* Specialty Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800">
                {doctor.specialty}
              </span>
              
              {/* Doctor Header Info */}
              <h1 className="text-3xl font-bold text-gray-900 mt-3">
                {doctor.doctorName}
              </h1>
              <p className="text-sm font-medium text-blue-600 mt-1">{doctor.degrees}</p>
              
              {/* Core Information Metrics */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><span className="font-semibold text-gray-800">Hospital:</span> {doctor.hospital}</p>
                <p><span className="font-semibold text-gray-800">Experience:</span> {doctor.experience}</p>
                <p><span className="font-semibold text-gray-800">Visiting Hours:</span> {doctor.availableTime}</p>
                <p>
                  <span className="font-semibold text-gray-800">Consultation Fee:</span>{" "}
                  <span className="text-gray-900 font-bold text-base">{doctor.fee}</span>
                </p>
              </div>

              {/* Professional Background About Section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-md font-bold text-gray-900 mb-2">About Doctor</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {doctor.about}
                </p>
              </div>
            </div>

            {/* Book Appointment Interactive Redirect Area */}
            <div className="mt-8">
              <button
                onClick={handleBookingRedirect}
                className="w-full md:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors duration-200"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;