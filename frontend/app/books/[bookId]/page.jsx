"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const { bookId } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/books/${bookId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  // Calculate average rating
  const avgRating =
    book?.reviews && book.reviews.length > 0
      ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
        book.reviews.length
      : 0;

  if (loading) {
    return (
      <main className="font-sans min-h-screen relative flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
        </div>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading book details...</p>
        </div>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="font-sans min-h-screen relative flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
        </div>
        <div className="text-center">
          <svg
            className="w-20 h-20 mx-auto text-zinc-700 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-zinc-300 mb-2">
            Book not found
          </h2>
          <p className="text-zinc-500 mb-6">
            The book you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/books")}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
          >
            Back to Library
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans min-h-screen relative pb-16">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
      </div>

      {/* Back Button */}
      <div className="relative mx-auto max-w-5xl px-6 pt-8">
        <button
          onClick={() => router.push("/books")}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
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

      {/* Book Details Section */}
      <section className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8">
          {/* Book Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Book Icon */}
            <div className="flex-shrink-0 w-32 h-40 rounded-xl bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 flex items-center justify-center border border-zinc-800">
              <svg
                className="w-16 h-16 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-zinc-100 mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-zinc-400 mb-4">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(avgRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-zinc-700 fill-zinc-700"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-zinc-400">
                  {book.reviews && book.reviews.length > 0 ? (
                    <>
                      <span className="text-lg font-semibold text-zinc-200">
                        {avgRating.toFixed(1)}
                      </span>{" "}
                      ({book.reviews.length}{" "}
                      {book.reviews.length === 1 ? "review" : "reviews"})
                    </>
                  ) : (
                    "No reviews yet"
                  )}
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-zinc-300 mb-2">
                    Description
                  </h2>
                  <p className="text-zinc-400 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105">
                  Add Review
                </button>
                <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all">
                  Edit Book
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-800 my-8"></div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-200 mb-6">
              Reviews ({book.reviews ? book.reviews.length : 0})
            </h2>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4">
                {book.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* User Avatar Placeholder */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-semibold">
                          {review.user?.username?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200">
                            {review.user?.username || "Anonymous"}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-zinc-700 fill-zinc-700"
                                }`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Options Menu */}
                      <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
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
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Review Comment */}
                    <p className="text-zinc-400 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-zinc-700 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <p className="text-zinc-500 mb-4">
                  No reviews yet. Be the first to review this book!
                </p>
                <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookDetails;
