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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentUsername, setCurrentUsername] = useState(null);
  const fetchBooks = async (page = 1) => {
    if (!token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/getbooks?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }
      const data = await response.json();
      setBooks(Array.isArray(data.books) ? data.books : []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
      setTotalBooks(data.totalBooks || 0);
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
    fetchBooks(currentPage); // Refresh books to show updated reviews
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setSelectedBookId(book._id);
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleBookUpdated = () => {
    setShowEditModal(false);
    fetchBooks(currentPage); // Refresh books to show updated data
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (t) {
      setToken(t);
      setSignedIn(true);
      setCurrentUsername(username);
    } else {
      setToken(null);
      setSignedIn(false);
      setCurrentUsername(null);
    }
  }, []);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [token, currentPage]);

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`,
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
      fetchBooks(currentPage);
    } catch (err) {
      console.error(err);
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

      {/* Header Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 ring-1 ring-purple-500/20 mb-6">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-sm font-medium text-purple-300">Your Personal Collection</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Your Library
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Discover, organize, and share your favorite books with the community.
          </p>
        </div>

        {/* Add Book Button */}
        {signedIn && (
          <div className="mt-10 flex justify-center">
            <a
              href="/addbook"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
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
            <div className="rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-12 text-center max-w-md ring-1 ring-purple-500/10">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-500/10 mb-6 ring-1 ring-purple-500/20">
                <svg
                  className="w-10 h-10 text-purple-400"
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
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">
                Authentication Required
              </h2>
              <p className="text-zinc-400 mb-6">
                Please sign in to view and manage your book collection.
              </p>
              <a
                href="/login"
                className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
              >
                Sign In
              </a>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-cyan-500/10 mb-6 ring-1 ring-cyan-500/20">
                <svg
                  className="w-12 h-12 text-cyan-400"
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
              <h2 className="text-2xl font-semibold text-white mb-3">
                No books yet
              </h2>
              <p className="text-zinc-400">
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
                  className={`group relative rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 ring-1 ring-purple-500/10 ${
                    showDropdown === book._id ? 'z-50' : 'z-0'
                  }`}
                >
                  {/* Book Icon & Title Section */}
                  <div className="flex gap-4 mb-4">
                    {/* Compact Book Icon */}
                    <div className="flex-shrink-0 w-16 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
                      <svg
                        className="w-8 h-8 text-purple-400"
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
                      <h3 className="text-xl font-semibold text-white line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-1">
                        by {book.author}
                      </p>
                    </div>
                  </div>

                  {/* Genre and Year */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300 ring-1 ring-purple-500/20">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {book.genre}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-500/20">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {book.publishedYear}
                    </span>
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
                    {book.createdBy?.username === currentUsername && (
                      <div className="relative inline-block z-50">
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
                          <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 z-[100]">
                            <div className="py-1">
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition"
                                onClick={() => handleEditBook(book)}
                              >
                                Edit Book
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
                    )}
                    <button
                      onClick={() => {
                        setShowDropdown(null);
                        handleAddReview(book._id);
                      }}
                      className="rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 px-3 py-2.5 text-sm font-medium text-purple-300 hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-500/50 transition-all"
                    >
                      Rate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {signedIn && books.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {signedIn && books.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              Showing {books.length} of {totalBooks} books (Page {currentPage} of {totalPages})
            </p>
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
