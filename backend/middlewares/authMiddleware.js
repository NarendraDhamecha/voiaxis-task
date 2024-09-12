require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header("Authorization");

  // Check if Authorization header is provided
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No Authorization header provided" });
  }

  // Check if the Authorization header starts with 'Bearer '
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token provided" });
  }

  // Remove 'Bearer' and extract only the token
  const token = authHeader.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.userId);

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist, authorization denied" });
    }

    // Attach user to the request object (can access user info in the next middleware/controller)
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
