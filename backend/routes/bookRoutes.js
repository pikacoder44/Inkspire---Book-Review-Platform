// Book routes
const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Add a new book
router.post("/addbook", authMiddleware, addBook);

// Get all books
router.get("/getbooks", getBooks);

// Get a book by ID
router.get("/:bookId", getBookById);

// Update a book
router.put("/:bookId", authMiddleware, updateBook);

// Delete a book
router.delete("/:bookId", authMiddleware, deleteBook);

module.exports = router;
