const express = require("express");
const {
  addReview,
  getReviewsByBook,
  getReviewsOfAllBooks,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add a review to a book
router.post("/:bookId", authMiddleware, addReview);

// Get reviews for all books
router.get("/all", getReviewsOfAllBooks);


// Get all reviews for a book
router.get("/:bookId", getReviewsByBook);

// Update a review
router.put("/:bookId/:reviewId", authMiddleware, updateReview);

// Delete a review
router.delete("/:bookId/:reviewId", authMiddleware, deleteReview);

module.exports = router;
