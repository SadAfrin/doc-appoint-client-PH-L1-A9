"use client";

import React from "react";

const DoctorCard = ({ doctor, onViewDetails }) => {
  return (
    <div
      className="bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-indigo-200 flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative h-48 w-full bg-gray-200">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Details Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {doctor.specialty}
          </span>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {doctor.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 font-medium">
            {doctor.hospital}
          </p>

          {/* Schedule and Pricing Info */}
          <div className="mt-4 space-y-2 border-t border-indigo-100 pt-4">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-semibold text-gray-800 mr-1">Time:</span>{" "}
              {Array.isArray(doctor.availability)
                ? doctor.availability.join(", ")
                : doctor.availability}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-semibold text-gray-800 mr-1">Fee:</span>{" "}
              {doctor.fee} BDT
            </p>
          </div>
        </div>

        {/* Call To Action Button */}
        <div className="mt-6">
          <button
            onClick={() => onViewDetails(doctor._id || doctor.id)}
            className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;