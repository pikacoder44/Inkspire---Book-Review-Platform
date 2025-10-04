export default function Home() {
  return (
    <main className="font-sans min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-cyan-950" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 ring-1 ring-purple-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-purple-300">Your Personal Book Library</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
              <span className="block text-white mb-2">Discover & Review</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Your Favorite Books
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
              Build your digital library, share thoughtful reviews, and connect with fellow readers. 
              Powered by secure authentication and modern technology.
            </p>

            <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/signup"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
              >
                <span>Start Reading</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Explore Features</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A complete platform for book lovers with powerful features and seamless experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent p-8 ring-1 ring-purple-500/20 hover:ring-purple-500/40 transition-all hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-3xl mb-5 ring-1 ring-purple-500/30">
                🔐
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
              <p className="text-zinc-400 leading-relaxed">
                JWT-based authentication keeps your account safe. Sign up and log in with confidence.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent p-8 ring-1 ring-cyan-500/20 hover:ring-cyan-500/40 transition-all hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-3xl mb-5 ring-1 ring-cyan-500/30">
                📚
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Library</h3>
              <p className="text-zinc-400 leading-relaxed">
                Organize and manage your book collection with ease. Add, edit, and browse seamlessly.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-pink-500/10 to-transparent p-8 ring-1 ring-pink-500/20 hover:ring-pink-500/40 transition-all hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/20 text-3xl mb-5 ring-1 ring-pink-500/30">
                ⭐
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rich Reviews</h3>
              <p className="text-zinc-400 leading-relaxed">
                Share your thoughts with ratings and detailed reviews. Help others discover great reads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl text-white mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-zinc-400">
            Simple steps to begin your reading journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg ring-4 ring-purple-500/20">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Create Account</h3>
                <p className="text-zinc-400">
                  Sign up with your email and get instant access to your personal library
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg ring-4 ring-cyan-500/20">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Add Books</h3>
                <p className="text-zinc-400">
                  Build your collection by adding books with titles, authors, and descriptions
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg ring-4 ring-pink-500/20">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Share Reviews</h3>
                <p className="text-zinc-400">
                  Rate and review books to help others discover their next favorite read
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="relative mx-auto max-w-5xl px-6 pb-32">
        <div className="relative rounded-3xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Ready to Build Your Library?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of readers who are already organizing and reviewing their favorite books
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
              >
                <span>Create Free Account</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <span>Sign In</span>
              </a>
            </div>
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
