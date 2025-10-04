

export default function Home() {
  return (
    <main className="font-sans min-h-screen relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
      </div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Logiksutra Book Reviews
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-zinc-300 sm:text-lg">
              Discover, review, and curate your favorite reads. Secure auth,
              effortless book management, and insightful reviews — all in one
              place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <a
                href="#features"
                className="rounded-md bg-zinc-900/40 ring-1 ring-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 transition"
              >
                Explore Features
              </a>
              <a
                href="#get-started"
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            What you can do
          </h2>
          <p className="mt-3 text-zinc-400">
            Powered by a secure Node/Express API and MongoDB.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition flex flex-col ">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-300">
              🔐
            </div>
            <h3 className="text-lg font-medium">Authentication</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Sign up and log in with JWT-based sessions. Access your profile
              securely.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-300">
              📚
            </div>
            <h3 className="text-lg font-medium">Books</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Add and browse books with protected routes. Reviews are populated
              for context.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600/20 text-sky-300">
              ⭐
            </div>
            <h3 className="text-lg font-medium">Reviews</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Create, update, and manage reviews for any book. Auth required
              where needed.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-zinc-300">
                1. Authenticate
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Create an account or log in to receive a token for protected
                actions.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-300">
                2. Add & browse books
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Create new books, then fetch lists or details with reviews
                populated.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-300">
                3. Review & refine
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                Share ratings and comments. Update or delete your own reviews
                anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="get-started"
        className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28"
      >
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:flex-row">
          <div>
            <h3 className="text-xl font-semibold">Ready to start reviewing?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Jump in with authentication and begin building your library.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-md bg-zinc-900/40 ring-1 ring-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 transition"
            >
              Create account
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/60">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-zinc-500">
          <span>
            &copy;2025 | Syed Muhammad Hashir Ali | All rights reserved
          </span>
        </div>
      </footer>
    </main>
  );
}
