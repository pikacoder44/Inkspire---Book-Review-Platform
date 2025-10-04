"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("User logged in successfully");
      if(typeof window !== "undefined"){
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        // Dispatch custom event to update Navbar
        window.dispatchEvent(new Event("authChange"));
      }
      router.push("/books");
    } else {
      alert("User login failed");
    }
    setLoading(false);
  };
  return (
    <main className="font-sans min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-cyan-950" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <section className="relative mx-auto max-w-md px-6 py-24 sm:py-28">
        <div className="rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-8 ring-1 ring-purple-500/10">
          <div className="mb-8 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 mb-6 ring-1 ring-purple-500/20">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-sm text-zinc-400">
              Log in to manage books and share your reviews
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition"
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            New here?{" "}
            <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition">
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
