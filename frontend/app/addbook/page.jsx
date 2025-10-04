"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to add a book");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/books/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, description, genre, publishedYear: parseInt(publishedYear) }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Book added successfully!");
        setTitle("");
        setAuthor("");
        setDescription("");
        setGenre("");
        setPublishedYear("");
        setTimeout(() => {
          router.push("/books");
        }, 1500);
      } else {
        setError(data.message || "Failed to add book");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans min-h-screen relative pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-cyan-950" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Back Button */}
      <div className="relative mx-auto max-w-3xl px-6 pt-8">
        <button
          onClick={() => router.push("/books")}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Library
        </button>
      </div>

      {/* Header Section */}
      <section className="relative mx-auto max-w-3xl px-6 pt-8 pb-4">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 mb-6 ring-1 ring-cyan-500/20">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Add New Book
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Expand your library by adding a new book to your collection
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-8 ring-1 ring-purple-500/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Book Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the book title"
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-base text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Author Field */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Author <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="author"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author's name"
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-base text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Genre Field */}
            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Genre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="genre"
                required
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Fiction, Non-Fiction, Mystery, Romance"
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-base text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Published Year Field */}
            <div>
              <label
                htmlFor="publishedYear"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Published Year <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="publishedYear"
                required
                min="1000"
                max="2100"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                placeholder="e.g., 2020"
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-base text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description of the book (optional)"
                className="w-full rounded-xl border border-purple-500/20 bg-zinc-950/60 px-4 py-3 text-base text-zinc-200 placeholder-zinc-500 outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              />
              <p className="mt-2 text-xs text-zinc-500">
                {description.length} characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-emerald-400">{success}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/books")}
                className="flex-1 rounded-xl border border-purple-500/30 bg-zinc-800/50 px-6 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-purple-500/50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Book...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Book
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            All fields marked with <span className="text-red-400">*</span> are
            required
          </p>
        </div>
      </section>
    </main>
  );
};

export default AddBook