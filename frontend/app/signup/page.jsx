const Signup = () => {
  return (
    <main className="font-sans min-h-screen relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
      </div>
      <section className="relative mx-auto max-w-md px-6 py-24 sm:py-28">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Create your account
              </span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Join to start adding books and writing reviews.
            </p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">
                Username
              </label>
              <input
                type="text"
                placeholder="yourname"
                className="w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              Sign up
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:text-indigo-300">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
