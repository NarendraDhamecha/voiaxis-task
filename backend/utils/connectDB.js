require("dotenv").config(); // Load environment variables from .env
const mongoose = require("mongoose");

//Function for connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
};

module.exports = connectDB;
