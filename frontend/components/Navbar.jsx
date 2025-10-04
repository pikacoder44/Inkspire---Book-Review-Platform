const Navbar = () => {
  // For now, we'll assume user is not logged in
  // Later this can be connected to auth state
  const isLoggedIn = false;

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
              Books
            </a>
            <a
              href="/reviews"
              className="text-sm font-medium text-zinc-300 hover:text-white transition"
            >
              Reviews
            </a>

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <a
                href="/profile"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
              >
                Profile
              </a>
            ) : (
              <a
                href="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
              >
                Signup
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
