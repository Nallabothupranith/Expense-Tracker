"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email?: string;
}

interface MembersListProps {
  groupId: string;
}

export default function MembersList({ groupId }: MembersListProps) {
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
    <>
      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-xl bg-white/80 shadow p-3 flex flex-col gap-1 border border-white/40"
          >
            <div className="font-bold text-[#2d2e82]">{member.name}</div>
            <div className="text-xs text-gray-500">{member.email || "-"}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="p-2 rounded hover:bg-blue-100"
                title="Edit Member"
              >
                <Pencil className="w-4 h-4 text-blue-600" />
              </button>
              <button
                className="p-2 rounded hover:bg-red-100"
                title="Delete Member"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500 py-6 text-xs">
            Loading members...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-6 text-xs">{error}</div>
        )}
        {!loading && !error && members.length === 0 && (
          <div className="text-center text-gray-500 py-6 text-xs">
            No members found.
          </div>
        )}
      </div>
      {/* Desktop Table Layout */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md shadow-md sm:shadow-xl border border-white/40 mt-6 sm:mt-12 transition-all duration-700">
        <div className="min-w-[400px] sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-white/80 sticky top-0 z-10">
                <TableHead className="min-w-[100px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Member Name
                </TableHead>
                <TableHead className="min-w-[120px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Email
                </TableHead>
                <TableHead className="min-w-[80px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    Loading members...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-red-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              )}
              {!loading && !error && members.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    No members found.
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                !error &&
                members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-semibold text-[#2d2e82] px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-gray-500 px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                      {member.email || "-"}
                    </TableCell>
                    <TableCell className="flex gap-1 sm:gap-2 items-center px-1 sm:px-2 py-2 sm:py-3">
                      <button
                        className="p-2 rounded hover:bg-blue-100"
                        title="Edit Member"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-red-100"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableCaption className="text-center text-[11px] sm:text-xs">
              {!loading &&
                !error &&
                members.length === 0 &&
                "No members found."}
            </TableCaption>
          </Table>
        </div>
        <div className="block sm:hidden text-center text-[10px] text-gray-400 pt-1 pb-2">
          Swipe &rarr; to see more
        </div>
      </div>
    </>
  );
}
