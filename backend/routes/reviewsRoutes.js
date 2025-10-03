// review routes
const express = require("express");
const {
  addReview,
  getReviewsByBook,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();

// Add a new review for a book
router.post("/api/reviews", addReview);

// Get all reviews for a specific book
router.get("/api/reviews/:bookId", getReviewsByBook);

// Update a review
router.put("/api/reviews/:reviewId", updateReview);

// Delete a review
router.delete("/api/reviews/:reviewId", deleteReview);

module.exports = router;
