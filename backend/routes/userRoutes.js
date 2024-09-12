const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const roleMiddleware = require("../middlewares/roleMiddleware");

//Route for get all users
router.get("/getAll", roleMiddleware, userController.getAllUsers);

// Route for updating a user
router.patch("/:userId", roleMiddleware, userController.updateUser);

// Route for getting a user by ID
router.get("/:userId", userController.getUserById);

module.exports = router;
