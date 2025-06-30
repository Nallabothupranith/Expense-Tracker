import MembersList from "@/components/members-list";
import Link from "next/link";

interface GroupDetailsPageProps {
  params: {
    id: string;
  };
}

export default function GroupDetailsPage({ params }: GroupDetailsPageProps) {
  const { id: groupId } = params;

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      <div className="flex-1 w-full max-w-6xl mx-auto p-2 sm:p-6">
        <div className="mt-8 sm:mt-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2d2e82] mb-6">
            Group Details
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 mb-8">
            Manage your group members and track expenses.
          </p>
        </div>

        <div className="space-y-8">
          {/* Members Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-[#2d2e82]">
                Group Members
              </h2>
              <Link
                href={`/groups/${groupId}/expenses`}
                className="px-6 py-2 rounded-lg bg-[#7b8cff] text-white hover:bg-[#2d2e82] transition-all font-semibold text-base shadow-md text-center"
              >
                View Expenses
              </Link>
            </div>
            <MembersList groupId={groupId} />
          </div>

          {/* Expenses Section */}
        </div>
      </div>
    </main>
  );
}
