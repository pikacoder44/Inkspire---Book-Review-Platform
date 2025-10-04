"use client";
import { useState } from "react";

const AddReview = ({ isOpen, onClose, bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to add a review");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/review/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: Number(rating), comment }),
      });

      const data = await response.json();

      if (response.ok) {
        setRating(0);
        setComment("");
        onReviewAdded(); // Refresh book data
        onClose(); // Close modal
      } else {
        setError(data.message || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 p-6">
            <h2 className="text-2xl font-bold text-zinc-100">Write a Review</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-3">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <svg
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-zinc-700 fill-zinc-700"
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-sm text-zinc-400">
                  You rated this book {rating} out of 5 stars
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="comment"
                rows={5}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this book..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
              <p className="mt-2 text-xs text-zinc-500">
                {comment.length} characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0}
                className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddReview;
