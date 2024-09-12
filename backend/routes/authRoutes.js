const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

//Route for Register new user
router.post("/register", authController.register);

//Route for Login
router.post("/login", authController.login);

//Route for Login with google auth
router.post("/google", authController.googleAuth);

module.exports = router;
