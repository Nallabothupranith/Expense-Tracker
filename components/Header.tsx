import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const glassItemStyle =
    "px-5 py-2 rounded-full bg-white/30 backdrop-blur-lg border border-white/50 shadow-md text-gray-800 font-semibold hover:bg-gradient-to-r from-[#6366f1] via-[#2d2e82] to-[#ec4899] hover:text-white hover:border-transparent hover:shadow-lg transition-all text-base";
  const isAuthenticated = !!user;

  return (
    <nav className="sticky top-0 z-50 w-full p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center py-2 px-2 sm:px-6 bg-white/30 backdrop-blur-xl rounded-2xl sm:rounded-full border border-white/40 shadow-lg">
        <Link href="/" className="flex items-center mb-2 sm:mb-0">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#2d2e82] to-[#ec4899] drop-shadow-lg font-extrabold text-xl sm:text-2xl"
            style={{ letterSpacing: "0.02em" }}
          >
            Expense Tracker
          </span>
        </Link>
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
          <Link
            href="/"
            className={glassItemStyle + " w-full sm:w-auto text-center"}
          >
            Home
          </Link>
          <Link
            href="/groups"
            className={glassItemStyle + " w-full sm:w-auto text-center"}
          >
            Groups
          </Link>
          {!isAuthenticated ? (
            <Link
              href="/auth/login"
              className={glassItemStyle + " w-full sm:w-auto text-center"}
            >
              Sign In
            </Link>
          ) : (
            <form
              action="/auth/logout"
              method="post"
              className="w-full sm:w-auto"
            >
              <button
                className={glassItemStyle + " w-full sm:w-auto text-center"}
              >
                Logout
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
