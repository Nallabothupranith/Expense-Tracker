"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroLanding() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl flex-1 px-2 sm:px-6 py-10 sm:py-16 gap-8 sm:gap-10">
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 items-center md:items-start text-center md:text-left">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2d2e82] leading-tight transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Save money,
          <br />
          without thinking about it.
        </h1>
        <p
          className={`text-base sm:text-lg text-gray-500 max-w-md transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          Jumeneng analyzes your spending and automatically saves the perfect
          amount every day, so you don&apos;t have to think about it.
        </p>
        <Link href="/auth/sign-up">
          <button
            className={`mt-4 sm:mt-6 px-6 sm:px-8 py-3 rounded-full bg-[#7b8cff] text-white font-semibold text-base sm:text-lg shadow-lg hover:bg-[#2d2e82] transition-all duration-200 scale-105 hover:scale-110 transition-all duration-700 ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            SIGN UP NOW
          </button>
        </Link>
      </div>
      {/* Illustration with animated coins */}
      <div
        className={`flex-1 flex items-center justify-center relative min-h-[220px] sm:min-h-[340px] transition-all duration-700 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        {/* Placeholder for illustration (replace with SVG/PNG as needed) */}
        <div className="w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] bg-white rounded-3xl shadow-xl flex items-center justify-center relative overflow-visible">
          {/* Animated coins */}
          <svg
            className={`absolute left-[-20px] sm:left-[-30px] top-[-20px] sm:top-[-30px] transition-all duration-700 ${
              animate ? "translate-y-4 opacity-100" : "translate-y-0 opacity-0"
            }`}
            width="36"
            height="36"
            viewBox="0 0 48 48"
          >
            <circle cx="24" cy="24" r="24" fill="#ffe066" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="20"
              fill="#2d2e82"
              fontWeight="bold"
            >
              $
            </text>
          </svg>
          <svg
            className={`absolute right-[-20px] sm:right-[-30px] top-[20px] sm:top-[40px] transition-all duration-700 ${
              animate ? "translate-y-2 opacity-100" : "translate-y-0 opacity-0"
            }`}
            width="28"
            height="28"
            viewBox="0 0 40 40"
          >
            <circle cx="20" cy="20" r="20" fill="#ffe066" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="16"
              fill="#2d2e82"
              fontWeight="bold"
            >
              £
            </text>
          </svg>
          <svg
            className={`absolute right-[0px] sm:right-[10px] bottom-[-20px] sm:bottom-[-30px] transition-all duration-700 ${
              animate ? "translate-y-2 opacity-100" : "translate-y-0 opacity-0"
            }`}
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="16" fill="#ffe066" />
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              fontSize="12"
              fill="#2d2e82"
              fontWeight="bold"
            >
              €
            </text>
          </svg>
          {/* Illustration person and chart (placeholder) */}
          <svg
            width="120"
            height="140"
            className="sm:w-[180px] sm:h-[220px]"
            viewBox="0 0 180 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="30"
              y="60"
              width="120"
              height="120"
              rx="16"
              fill="#f3f6fd"
            />
            <rect x="50" y="80" width="80" height="40" rx="8" fill="#7b8cff" />
            <rect x="50" y="130" width="80" height="30" rx="8" fill="#ffe066" />
            <circle cx="60" cy="180" r="18" fill="#2d2e82" />
            <rect
              x="110"
              y="170"
              width="24"
              height="24"
              rx="8"
              fill="#7b8cff"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
