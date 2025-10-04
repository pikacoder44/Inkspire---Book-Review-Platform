"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const checkAuthStatus = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      if (token && storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    }
  };

  useEffect(() => {
    // Check auth status on mount
    checkAuthStatus();

    // Check auth status when window gains focus
    const handleFocus = () => {
      checkAuthStatus();
    };

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "username") {
        checkAuthStatus();
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto px-9">
        <div className="flex w-full h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-semibold">
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Logiksutra
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a
              href="/"
              className="text-sm font-medium text-zinc-300 hover:text-white transition"
            >
              Home
            </a>
            <a
              href="/books"
              className="text-sm font-medium text-zinc-300 hover:text-white transition"
            >
              Library
            </a>

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span>{username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-purple-500/20 bg-zinc-900 shadow-lg ring-1 ring-purple-500/10">
                    <div className="py-1">
                      <a
                        href={`/profile/${username}`}
                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-purple-500/10 hover:text-purple-300 transition"
                        onClick={() => setShowDropdown(false)}
                      >
                        View Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-purple-500/10 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/20"
              >
                Sign Up
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
