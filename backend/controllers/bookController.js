// Book Controller
const Book = require("../models/Book");

// Add a new book
const addBook = async (req, res) => {
  const { title, author, description, genre, publishedYear } = req.body;
  try {
    // Validate required fields
    if (!title || !author || !genre || !publishedYear) {
      return res.status(400).json({ message: "Title, author, genre, and published year are required" });
    }

    // Create and save the new book with creator
    const newBook = new Book({ 
      title, 
      author, 
      description, 
      genre, 
      publishedYear,
      createdBy: req.user._id 
    });
    await newBook.save();
    console.log("Book added successfully");
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all books with pagination
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // 5 books per page as per requirement
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const books = await Book.find()
      .populate("reviews.user", "username email")
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks
    });
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
    const book = await Book.findById(bookId).populate(
      "reviews.user",
      "username email"
    );
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

// Update a book
const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, author, description, genre, publishedYear } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if user is the creator
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the book creator can edit this book" });
    }

    // Update the book
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description !== undefined ? description : book.description;
    book.genre = genre || book.genre;
    book.publishedYear = publishedYear || book.publishedYear;
    
    await book.save();
    console.log("Book updated successfully");
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if user is the creator
    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the book creator can delete this book" });
    }

    await Book.findByIdAndDelete(bookId);
    console.log("Book deleted successfully");
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, getBooks, getBookById, updateBook, deleteBook };
