// Build a Book Review Platform where users can sign up, log in, add books, and review books. The goal is to test your skills in MongoDB, Express, React, Node.js (MERN) along with authentication, CRUD operations, and frontend integration.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");

require("dotenv").config();
// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/review", reviewRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use((req, res, next) => {
  console.log("User route triggered:", req.method, req.originalUrl);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
