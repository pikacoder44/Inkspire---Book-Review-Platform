"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddReview from "../../components/AddReview";
import EditBook from "../../components/EditBook";
const Books = () => {
  const [books, setBooks] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const fetchBooks = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/books/getbooks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    }
  };

  const handleAddReview = (bookId) => {
    setSelectedBookId(bookId);
    setShowModal(true);
  };

  const handleReviewAdded = () => {
    setShowModal(false);
    fetchBooks(); // Refresh books to show updated reviews
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setSelectedBookId(book._id);
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleBookUpdated = () => {
    setShowEditModal(false);
    fetchBooks(); // Refresh books to show updated data
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      setSignedIn(true);
    } else {
      setToken(null);
      setSignedIn(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [token]);

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete book: ${response.status}`);
      }
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="font-sans min-h-screen relative pb-16">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80rem_60rem_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60rem_40rem_at_85%_10%,rgba(16,185,129,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.6)]" />
      </div>

      {/* Header Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Your Library
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Discover, organize, and share your favorite books with the
            community.
          </p>
        </div>

        {/* Add Book Button */}
        {signedIn && (
          <div className="mt-8 flex justify-center">
            <a
              href="/addbook"
              className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-90"
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
              Add New Book
            </a>
          </div>
        )}
      </section>

      {/* Books Grid Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-8">
        {!signedIn ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 backdrop-blur-sm text-center max-w-md">
              <svg
                className="w-16 h-16 mx-auto text-zinc-600 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-zinc-200 mb-2">
                Authentication Required
              </h2>
              <p className="text-zinc-400 mb-6">
                Please sign in to view and manage your book collection.
              </p>
              <a
                href="/login"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
              >
                Sign In
              </a>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-zinc-300 mb-2">
                No books yet
              </h2>
              <p className="text-zinc-500">
                Start building your library by adding your first book!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {books.map((book) => {
              // Calculate average rating (placeholder for now - will be 0 until reviews are added)
              const avgRating =
                book.reviews && book.reviews.length > 0
                  ? book.reviews.reduce(
                      (sum, review) => sum + review.rating,
                      0
                    ) / book.reviews.length
                  : 0;
              const reviewCount = book.reviews ? book.reviews.length : 0;

              return (
                <div
                  key={book._id}
                  className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 transition-all hover:border-zinc-700 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  {/* Book Icon & Title Section */}
                  <div className="flex gap-4 mb-4">
                    {/* Compact Book Icon */}
                    <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 flex items-center justify-center border border-zinc-800">
                      <svg
                        className="w-8 h-8 text-zinc-600"
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
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-zinc-100 line-clamp-2 mb-1 group-hover:text-indigo-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-1">
                        by {book.author}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {book.description && (
                    <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                      {book.description}
                    </p>
                  )}

                  {/* Star Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(avgRating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-zinc-700 fill-zinc-700"
                          } transition-colors`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">
                      {reviewCount > 0
                        ? `${avgRating.toFixed(1)} (${reviewCount} reviews)`
                        : "No reviews yet"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/books/${book._id}`)}
                      className="flex-1 rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all"
                    >
                      View Details
                    </button>
                    <div className="relative inline-block">
                      <button
                        className="rounded-lg bg-zinc-800 px-3 py-2.5 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all"
                        onClick={() =>
                          setShowDropdown(
                            showDropdown === book._id ? null : book._id
                          )
                        }
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
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                      {showDropdown === book._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg border border-zinc-700 z-10">
                          <div className="py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition"
                              onClick={() => handleEditBook(book)}
                            >
                              Edit Book
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition"
                              onClick={() => {
                                setShowDropdown(null);
                                handleAddReview(book._id);
                              }}
                            >
                              Rate Book
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition"
                              onClick={() => handleDelete(book._id)}
                            >
                              Delete Book
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* Add Review Modal */}
      <AddReview
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bookId={selectedBookId}
        onReviewAdded={handleReviewAdded}
      />

      {/* Edit Book Modal */}
      <EditBook
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        bookId={selectedBookId}
        bookData={selectedBook}
        onBookUpdated={handleBookUpdated}
      />
    </main>
  );
};

export default Books;
