require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const app = express();
const authRoutes = require("./routes/authRoutes");
const advertisementRoutes = require("./routes/advertisementRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

// Use environment variables from the .env file
const PORT = process.env.PORT || 3001; // Default to port 3000 if not specified

// Middleware to enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

//Authentication Routes
app.use("/auth", authRoutes);

//Advertisement Routes
app.use("/advertisement", authMiddleware, advertisementRoutes);

//User Routes
app.use("/user", authMiddleware, userRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } else {
    console.error(
      "Server could not start because of database connection failure"
    );
    process.exit(1); // Exit process with failure
  }
};

startServer();
