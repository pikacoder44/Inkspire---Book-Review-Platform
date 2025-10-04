// Authentication routes
const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

// Get user profile
router.get("/profile/:username", authMiddleware, getProfile);

module.exports = router;
