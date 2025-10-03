// Review Controller
const Review = require("../models/Review");
const nanoid = require("nanoid");
const Book = require("../models/Book");

// Logic for adding, fetching, updating, and deleting reviews.

// Add a review to a book
const addReview = async (req, res) => {
  const { bookId } = req.params;
  const { username, rating, comment } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    //generate unique reviewId
    const reviewId = nanoid.nanoid();

    const newReview = new Review({
      reviewId,
      username,
      book: bookId,
      rating,
      comment,
    });
    await newReview.save();

    // Add review reference to the book
    book.reviews.push(newReview._id);
    await book.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for a book
const getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.find({ book: bookId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.remove();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addReview, getReviewsByBook, updateReview, deleteReview };
