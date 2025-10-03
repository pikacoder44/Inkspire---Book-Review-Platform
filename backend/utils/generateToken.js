// utils/generateToken.js
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, secret, { expiresIn });
};

module.exports = generateToken;
