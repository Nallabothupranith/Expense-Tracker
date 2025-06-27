"use client";

import { useEffect, useState } from "react";

export default function GroupsPage() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      {/* Page content */}
      <div className="flex-1 w-full max-w-5xl mx-auto p-2 sm:p-6">
        <div className="mt-8 sm:mt-12 text-center">
          <h1
            className={`text-2xl sm:text-4xl font-extrabold text-[#2d2e82] transition-all duration-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Your Groups
          </h1>
          <p
            className={`mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 transition-all duration-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Here you can manage your groups, view expenses, and invite new
            members.
          </p>
        </div>
        {/* Placeholder for groups list */}
        <div
          className={`mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          {/* Example Group Card */}
          <div className="bg-white/50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center backdrop-blur-md border border-white/40">
            <h2 className="text-lg sm:text-2xl font-bold text-[#2d2e82]">
              Trip to Bali
            </h2>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              3 members
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-green-500 mt-2 sm:mt-4">
              $1,250
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">Total Expenses</p>
            <button className="mt-4 sm:mt-6 w-full px-4 sm:px-5 py-2 rounded-full bg-[#7b8cff] font-semibold text-white hover:bg-[#2d2e82] transition-all shadow-md text-base">
              View Details
            </button>
          </div>
          <div className="bg-white/50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center backdrop-blur-md border border-white/40">
            <h2 className="text-lg sm:text-2xl font-bold text-[#2d2e82]">
              Monthly Bills
            </h2>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              2 members
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-red-500 mt-2 sm:mt-4">
              $800
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">You Owe</p>
            <button className="mt-4 sm:mt-6 w-full px-4 sm:px-5 py-2 rounded-full bg-[#7b8cff] font-semibold text-white hover:bg-[#2d2e82] transition-all shadow-md text-base">
              View Details
            </button>
          </div>
          <div className="bg-white/50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center backdrop-blur-md border border-white/40">
            <h2 className="text-lg sm:text-2xl font-bold text-[#2d2e82]">
              Work Lunch
            </h2>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              5 members
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-700 mt-2 sm:mt-4">
              $150
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">Total Expenses</p>
            <button className="mt-4 sm:mt-6 w-full px-4 sm:px-5 py-2 rounded-full bg-[#7b8cff] font-semibold text-white hover:bg-[#2d2e82] transition-all shadow-md text-base">
              View Details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
