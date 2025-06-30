import ExpensesPageClient from "@/components/expenses-page-client";
import Link from "next/link";

interface GroupExpensesPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupExpensesPage({
  params,
}: GroupExpensesPageProps) {
  const { id: groupId } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      <div className="flex-1 w-full max-w-4xl mx-auto p-2 sm:p-6">
        <div className="mt-8 sm:mt-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2d2e82] mb-6">
            Group Expenses
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600 mb-8">
            View and manage all expenses for this group.
          </p>
        </div>
        <div className="mb-6">
          <Link
            href={`/groups/${groupId}`}
            className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-[#2d2e82] hover:bg-gray-300 transition-all font-semibold text-sm shadow"
          >
            ← Back to Group
          </Link>
        </div>
        <ExpensesPageClient groupId={groupId} />
      </div>
    </main>
  );
}
