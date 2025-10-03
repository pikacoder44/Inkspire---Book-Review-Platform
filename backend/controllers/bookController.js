// Book Controller
const Book = require("../models/Book");
const { nanoid } = require("nanoid");

// Add a new book
const addBook = async (req, res) => {
  const { title, author, description } = req.body;
  try {
    //generate unique bookId using nanoid
    const bookId = nanoid(5);

    // Check if book with same title already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book with this title already exists" });
    }

    // Create and save the new book
    const newBook = new Book({ bookId, title, author, description });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId).populate("reviews");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, getBooks, getBookById };
