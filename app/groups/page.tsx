import GroupsList from "@/components/groups-list";

export default function GroupsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#f7faff] relative px-2 sm:px-0">
      <div className="flex-1 w-full max-w-5xl mx-auto p-2 sm:p-6">
        <div className="mt-8 sm:mt-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2d2e82]">
            Your Groups
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600">
            Here you can manage your groups, view expenses, and invite new
            members.
          </p>
        </div>
        <GroupsList />
      </div>
    </main>
  );
}
