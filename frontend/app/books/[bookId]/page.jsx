"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddReview from "../../../components/AddReview";
import EditBook from "../../../components/EditBook";
import EditReview from "../../../components/EditReview";

const BookDetails = () => {
  const { bookId } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReviewDropdown, setShowReviewDropdown] = useState(null);
  const [showEditReviewModal, setShowEditReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`,
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

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showReviewDropdown && !event.target.closest('.review-dropdown')) {
        setShowReviewDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showReviewDropdown]);

  const handleAddReview = () => {
    setShowModal(true);
  };

  const handleReviewAdded = () => {
    setShowModal(false);
    fetchBook();
  };

  const handleEditBook = () => {
    setShowEditModal(true);
  };

  const handleBookUpdated = () => {
    setShowEditModal(false);
    fetchBook();
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setShowEditReviewModal(true);
    setShowReviewDropdown(null);
  };

  const handleReviewUpdated = () => {
    setShowEditReviewModal(false);
    setSelectedReview(null);
    fetchBook();
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review/${bookId}/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchBook();
        setShowReviewDropdown(null);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete review");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  // Calculate average rating
  const avgRating =
    book?.reviews && book.reviews.length > 0
      ? book.reviews.reduce((sum, review) => sum + review.rating, 0) /
        book.reviews.length
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
          <p className="text-zinc-400">Loading book details...</p>
        </div>
      </main>
    );
  }

  if (!book) {
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
            Book not found
          </h2>
          <p className="text-zinc-400 mb-6">
            The book you're looking for doesn't exist.
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
      <div className="relative mx-auto max-w-5xl px-6 pt-8">
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

      {/* Book Details Section */}
      <section className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-purple-500/20 bg-zinc-900/30 backdrop-blur-sm p-8 ring-1 ring-purple-500/10">
          {/* Book Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Book Icon */}
            <div className="flex-shrink-0 w-32 h-40 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
              <svg
                className="w-16 h-16 text-purple-400"
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
              <h1 className="text-4xl font-bold text-white mb-3">
                {book.title}
              </h1>
              <p className="text-xl text-zinc-400 mb-4">by {book.author}</p>
              
              {/* Genre and Year */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-300 ring-1 ring-purple-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {book.genre}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {book.publishedYear}
                </span>
              </div>

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
                <button
                  onClick={handleAddReview}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
                >
                  Add Review
                </button>
                <button
                  onClick={handleEditBook}
                  className="rounded-xl border border-purple-500/30 bg-zinc-800/50 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  Edit Book
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-purple-500/20 my-8"></div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Reviews ({book.reviews ? book.reviews.length : 0})
            </h2>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4">
                {book.reviews.map((review, index) => {
                  const currentUsername = typeof window !== "undefined" ? localStorage.getItem("username") : null;
                  const isOwnReview = review.user?.username === currentUsername;

                  return (
                    <div
                      key={review._id || index}
                      className="rounded-xl border border-purple-500/20 bg-zinc-900/20 p-5 ring-1 ring-purple-500/10"
                    >
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* User Avatar Placeholder */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                            {review.user?.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-white">
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
                        {isOwnReview && (
                          <div className="relative review-dropdown">
                            <button
                              onClick={() =>
                                setShowReviewDropdown(
                                  showReviewDropdown === review._id ? null : review._id
                                )
                              }
                              className="text-zinc-500 hover:text-zinc-300 transition-colors"
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

                            {/* Dropdown Menu */}
                            {showReviewDropdown === review._id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-purple-500/20 bg-zinc-900 shadow-lg ring-1 ring-purple-500/10 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleEditReview(review)}
                                    className="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-purple-500/10 hover:text-purple-300 transition"
                                  >
                                    Edit Review
                                  </button>
                                  <button
                                    onClick={() => handleDeleteReview(review._id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-purple-500/10 transition"
                                  >
                                    Delete Review
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Review Comment */}
                      <p className="text-zinc-400 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  );
                })}
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
                <button
                  onClick={handleAddReview}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
                >
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Review Modal */}
      <AddReview
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bookId={bookId}
        onReviewAdded={handleReviewAdded}
      />

      {/* Edit Book Modal */}
      <EditBook
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        bookId={bookId}
        bookData={book}
        onBookUpdated={handleBookUpdated}
      />

      {/* Edit Review Modal */}
      <EditReview
        isOpen={showEditReviewModal}
        onClose={() => setShowEditReviewModal(false)}
        bookId={bookId}
        reviewData={selectedReview}
        onReviewUpdated={handleReviewUpdated}
      />
    </main>
  );
};

export default BookDetails;
