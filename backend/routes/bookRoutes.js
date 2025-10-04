// Book routes
const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Add a new book
router.post("/addbook", authMiddleware, addBook);

// Get all books
router.get("/getbooks", getBooks);

// Get a book by ID
router.get("/:bookId", getBookById);

module.exports = router;
