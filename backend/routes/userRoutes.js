// Authentication routes
const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const router = express.Router();

// Register a new user
router.post("/api/register", registerUser);

// Login an existing user
router.post("/api/login", loginUser);

// Get user profile
router.get("/api/profile/:username", getProfile);

module.exports = router;
