"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Group {
  id: string;
  name: string;
  members?: number;
  total_expense?: number;
  description?: string;
}

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load groups");
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={`mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 transition-all duration-700 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      {loading && (
        <div className="col-span-full text-center text-gray-500">
          Loading groups...
        </div>
      )}
      {error && (
        <div className="col-span-full text-center text-red-500">{error}</div>
      )}
      {!loading && !error && groups.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No groups found.
        </div>
      )}
      {groups.map((group) => (
        <div
          key={group.id}
          className="bg-white/50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center backdrop-blur-md border border-white/40"
        >
          <h2 className="text-lg sm:text-2xl font-bold text-[#2d2e82]">
            {group.name}
          </h2>
          {group.members !== undefined && (
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              {group.members} members
            </p>
          )}
          {group.total_expense !== undefined && (
            <p className="text-2xl sm:text-3xl font-extrabold text-green-500 mt-2 sm:mt-4">
              ${group.total_expense}
            </p>
          )}
          {group.description && (
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              {group.description}
            </p>
          )}
          <Link
            href={`/groups/${group.id}`}
            className="mt-4 sm:mt-6 w-full px-4 sm:px-5 py-2 rounded-full bg-[#7b8cff] font-semibold text-white hover:bg-[#2d2e82] transition-all shadow-md text-base text-center"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
