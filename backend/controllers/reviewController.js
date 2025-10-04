const Book = require("../models/Book");

// Add a review to a book
const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews.push({
      user: req.user._id,
      rating,
      comment,
    });

    await book.save();
    const newReview = book.reviews[book.reviews.length - 1];
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reviews for all books
const getReviewsOfAllBooks = async (req, res) => {
  try {
    const reviews = await Book.find({ reviews: { $exists: true } })
    if (!reviews) return res.status(404).json({ message: "No reviews found" });
    
    res.status(200).json(reviews);
    console.log(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


// Get all reviews for a book
const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate(
      "reviews.user",
      "username email"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book.reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = book.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // check if the review belongs to logged-in user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await book.save();
    res.status(200).json({ message: "Review updated", review });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      console.log("Book not found for ID:", bookId);
      return res.status(404).json({ message: "Book not found" });
    }

    const review = book.reviews.id(reviewId);
    if (!review) {
      console.log("Review not found for ID:", reviewId);
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    book.reviews.pull(review._id);
    await book.save();
    
    console.log("Review deleted for ID:", reviewId);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.log("Error deleting review:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addReview, getReviewsOfAllBooks, getReviewsByBook, updateReview, deleteReview };
