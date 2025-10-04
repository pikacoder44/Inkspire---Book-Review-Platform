// Book Controller
const Book = require("../models/Book");

// Add a new book
const addBook = async (req, res) => {
  const { title, author, description } = req.body;
  try {

    // Check if book with same title already exists
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      console.log("Book with this title already exists");
      return res
        .status(400)
        .json({ message: "Book with this title already exists" });
    }

    // Create and save the new book
    const newBook = new Book({ title, author, description });
    await newBook.save();
    console.log("Book added successfully");
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" , error: err });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews.user", "username email");
    res.status(200).json(books);
    console.log("Books retrieved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId).populate("reviews.user", "username email");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(book);
    res.status(200).json(book);
    console.log("Book retrieved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, getBooks, getBookById };
