"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { username } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/users/profile/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/books/getbooks",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const books = await response.json();
          // Filter books that have reviews by this user
          const booksWithUserReviews = books.filter((book) =>
            book.reviews?.some((review) => review.user?.username === username)
          );
          setUserBooks(booksWithUserReviews);
        }
      } catch (err) {
        console.error("Error fetching user books:", err);
      }
    };

    if (username) {
      fetchUserProfile();
      fetchUserBooks();
    }
  }, [username]);

  // Calculate total reviews
  const totalReviews = userBooks.reduce((total, book) => {
    const userReviewsCount = book.reviews?.filter(
      (review) => review.user?.username === username
    ).length;
    return total + userReviewsCount;
  }, 0);

  // Calculate average rating given by user
  const userReviews = userBooks.flatMap((book) =>
    book.reviews?.filter((review) => review.user?.username === username)
  );
  const avgRating =
    userReviews.length > 0
      ? userReviews.reduce((sum, review) => sum + review.rating, 0) /
        userReviews.length
      : 0;

  if (loading) {
    return (
      <main className="font-sans min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-cyan-950" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="font-sans min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-zinc-950 to-cyan-950" />
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-pink-500/10 mb-6 ring-1 ring-pink-500/20">
            <svg
              className="w-10 h-10 text-pink-400"
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
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            User not found
          </h2>
          <p className="text-zinc-400 mb-6">
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/books")}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
          >
            Back to Library
          </button>
        </div>
      </main>
    );
  }

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
      <div className="relative mx-auto max-w-6xl px-6 pt-8">
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

      {/* Profile Header Section */}
      <section className="relative mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-8 ring-1 ring-purple-500/10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg shadow-purple-500/30">
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">
                {user.username}
              </h1>
              <p className="text-lg text-zinc-400 mb-6">{user.email}</p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-purple-500/20 bg-zinc-900/20 p-4 ring-1 ring-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-zinc-200">
                        {totalReviews}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {totalReviews === 1 ? "Review" : "Reviews"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-zinc-900/20 p-4 ring-1 ring-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-zinc-200">
                        {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
                      </p>
                      <p className="text-sm text-zinc-500">Avg Rating</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-zinc-900/20 p-4 ring-1 ring-purple-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-zinc-200">
                        {userBooks.length}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {userBooks.length === 1
                          ? "Book Reviewed"
                          : "Books Reviewed"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative mx-auto max-w-6xl px-6 py-4">
        <h2 className="text-2xl font-bold text-white mb-6">
          Reviews by {user.username}
        </h2>

        {userBooks.length > 0 ? (
          <div className="space-y-4">
            {userBooks.map((book) => {
              const userBookReviews = book.reviews?.filter(
                (review) => review.user?.username === username
              );

              return userBookReviews?.map((review, index) => (
                <div
                  key={`${book._id}-${index}`}
                  className="rounded-xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-6 hover:border-purple-500/40 transition-all ring-1 ring-purple-500/10"
                >
                  {/* Book Info Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4 flex-1">
                      {/* Book Icon */}
                      <div className="flex-shrink-0 w-12 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
                        <svg
                          className="w-6 h-6 text-purple-400"
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

                      {/* Book Details */}
                      <div className="flex-1">
                        <h3
                          className="text-xl font-semibold text-white mb-1 hover:text-purple-400 transition-colors cursor-pointer"
                          onClick={() => router.push(`/books/${book._id}`)}
                        >
                          {book.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-2">
                          by {book.author}
                        </p>

                        {/* Rating */}
                        <div className="flex gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
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

                        {/* Review Comment */}
                        <p className="text-zinc-400 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>

                    {/* View Book Button */}
                    <button
                      onClick={() => router.push(`/books/${book._id}`)}
                      className="ml-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
                    >
                      View Book
                    </button>
                  </div>
                </div>
              ));
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-12 text-center ring-1 ring-purple-500/10">
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
            <p className="text-zinc-500">
              {user.username} hasn't written any reviews yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
