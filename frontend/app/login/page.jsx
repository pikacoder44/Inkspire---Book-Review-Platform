"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert("User logged in successfully");
      localStorage.setItem("token", data.token);
      router.push("/books");
    } else {
      alert("User login failed");
    }
    setLoading(false);
  };
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
                Welcome back
              </span>
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Log in to manage books and share your reviews.
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700"
              />
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-zinc-500">
            New here?{" "}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
