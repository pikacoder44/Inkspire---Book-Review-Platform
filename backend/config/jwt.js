// JWT configuration
module.exports = {
  secret: process.env.JWT_SECRET || "your_jwt_secret_key",  // Use environment variable for security
  expiresIn: "1h",  // Token expiration time
};  