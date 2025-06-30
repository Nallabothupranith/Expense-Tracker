"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

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

  useEffect(() => {
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
      className="w-full overflow-x-auto rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md shadow-md sm:shadow-xl border border-white/40 mt-6 sm:mt-12 transition-all duration-700"
      style={{ transitionDelay: "500ms" }}
    >
      <div className="min-w-[600px] sm:min-w-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                Group Name
              </TableHead>
              <TableHead className="min-w-[80px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                Members
              </TableHead>
              <TableHead className="min-w-[100px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm text-right">
                Total Expense
              </TableHead>
              <TableHead className="min-w-[120px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                Description
              </TableHead>
              <TableHead className="min-w-[100px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                >
                  Loading groups...
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-red-500 py-6 sm:py-8 text-xs sm:text-base"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && groups.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                >
                  No groups found.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-bold text-[#2d2e82] px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                    {group.name}
                  </TableCell>
                  <TableCell className="px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                    {group.members !== undefined ? group.members : "-"}
                  </TableCell>
                  <TableCell className="font-extrabold text-green-500 px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base text-right">
                    {group.total_expense !== undefined
                      ? `$${group.total_expense}`
                      : "-"}
                  </TableCell>
                  <TableCell className="px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                    {group.description || "-"}
                  </TableCell>
                  <TableCell className="flex gap-1 sm:gap-2 items-center px-1 sm:px-2 py-2 sm:py-3">
                    <Link
                      href={`/groups/${group.id}`}
                      className="px-2 py-1 rounded bg-[#7b8cff] text-white hover:bg-[#2d2e82] transition-all text-[11px] sm:text-sm"
                      title="View Details"
                    >
                      View
                    </Link>
                    <button
                      className="p-2 rounded hover:bg-blue-100"
                      title="Edit Group"
                    >
                      <Pencil className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100"
                      title="Delete Group"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableCaption className="text-center text-[11px] sm:text-xs">
            {!loading && !error && groups.length === 0 && "No groups found."}
          </TableCaption>
        </Table>
      </div>
      <div className="block sm:hidden text-center text-[10px] text-gray-400 pt-1 pb-2">
        Swipe &rarr; to see more
      </div>
    </div>
  );
}
