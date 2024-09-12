require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const admin = require("../config/firebaseAdmin");

// Register controller
exports.register = async (req, res) => {
  const { fullName, mobileNo, email, password } = req.body;

  try {
    // Check if the email belongs to restricted domains
    const restrictedDomains = ["@voiaxisadmin.com", "@voiaxismoderator.com"];
    const emailDomain = email.substring(email.lastIndexOf("@"));

    if (restrictedDomains.includes(emailDomain)) {
      return res.status(400).json({
        message: "Registration with this email domain is not allowed",
      });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      fullName,
      mobileNo,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Send response
    res
      .status(201)
      .json({ message: "User successfully registered", data: user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, fullName: user.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // Send response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Google Auth controller
exports.googleAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken; // Extract name from token

    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });
    if (!user) {
      // If user does not exist, create new user
      user = new User({
        fullName: name, // Store user's name in fullName
        email,
        firebaseUid: uid, // Store Firebase UID
      });
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, fullName: user.fullName },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // Send response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
