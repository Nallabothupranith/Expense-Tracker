"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const glassItemStyle =
    "px-4 py-2 rounded-full bg-white/30 backdrop-blur-lg border border-white/50 shadow-md text-gray-800 font-semibold hover:bg-gradient-to-r from-[#6366f1] via-[#2d2e82] to-[#ec4899] hover:text-white hover:border-transparent hover:shadow-lg transition-all text-sm sm:text-base";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full p-2 sm:p-4">
      <div className="w-full max-w-5xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#2d2e82] to-[#ec4899] drop-shadow-lg font-extrabold text-lg sm:text-2xl"
            style={{ letterSpacing: "0.02em" }}
          >
            Expense Tracker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link href="/" className={glassItemStyle}>
            Home
          </Link>
          <Link href="/groups" className={glassItemStyle}>
            Groups
          </Link>
          {!isLoading &&
            (!isAuthenticated ? (
              <Link href="/auth/login" className={glassItemStyle}>
                Sign In
              </Link>
            ) : (
              <form action="/auth/logout" method="post">
                <button className={glassItemStyle}>Logout</button>
              </form>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 rounded-lg bg-white/30 backdrop-blur-lg border border-white/50 shadow-md hover:bg-white/50 transition-all"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-800" />
          ) : (
            <Menu className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden mt-2 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 max-h-96 translate-y-0"
            : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-4 space-y-3">
          <Link
            href="/"
            className={`${glassItemStyle} w-full text-center block`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/groups"
            className={`${glassItemStyle} w-full text-center block`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Groups
          </Link>
          {!isLoading &&
            (!isAuthenticated ? (
              <Link
                href="/auth/login"
                className={`${glassItemStyle} w-full text-center block`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            ) : (
              <form action="/auth/logout" method="post" className="w-full">
                <button
                  className={`${glassItemStyle} w-full text-center block`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Logout
                </button>
              </form>
            ))}
        </div>
      </div>
    </nav>
  );
}
