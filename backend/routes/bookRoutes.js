// Book routes
const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");
const router = express.Router();

// Add a new book
router.post("/api/books", addBook);

// Get all books
router.get("/api/books", getBooks);

// Get a book by ID
router.get("/api/books/:id", getBookById);

module.exports = router;
