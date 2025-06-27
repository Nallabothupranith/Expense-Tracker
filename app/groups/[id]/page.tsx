"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Member {
  id: string;
  name: string;
  email?: string;
}

export default function GroupDetailsPage() {
  const params = useParams();
  const groupId = params?.id as string;
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupId) return;
    fetch(`/api/groups/${groupId}/members`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load group members");
        setLoading(false);
      });
  }, [groupId]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      <div className="flex-1 w-full max-w-2xl mx-auto p-2 sm:p-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2d2e82] mb-6">
          Group Members
        </h1>
        {loading && (
          <div className="text-center text-gray-500">Loading members...</div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && members.length === 0 && (
          <div className="text-center text-gray-500">No members found.</div>
        )}
        <ul className="mt-6 space-y-4">
          {members.map((member) => (
            <li
              key={member.id}
              className="bg-white/80 rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-white/40"
            >
              <span className="font-semibold text-[#2d2e82]">
                {member.name}
              </span>
              {member.email && (
                <span className="text-gray-500 text-sm">{member.email}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
