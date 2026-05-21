"use client";

import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TopRatedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctors`);
        const result = await res.json(); 

        const doctorsArray = result.data; 

        const topDoctors = doctorsArray
          .sort((a, b) => parseInt(b.experience) - parseInt(a.experience))
          .slice(0, 3);

        setDoctors(topDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleViewDetails = async (id) => {
    const { data: session } = await authClient.getSession();
    if (!session) {
      toast.error("Please login to view details!");
      router.push("/login");
    } else {
      router.push(`/doctor-details/${id}`);
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center text-blue-600 font-bold">Loading...</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Top Rated Doctors</h2>
          <p className="text-gray-600 mt-2">Discover our most experienced specialists</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor._id} 
              doctor={doctor} 
              onViewDetails={() => handleViewDetails(doctor._id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;