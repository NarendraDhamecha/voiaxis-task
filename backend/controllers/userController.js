const User = require("../models/userModel");

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users except the logged-in user
    const users = await User.find({ _id: { $ne: req.user._id } });

    return res
      .status(200)
      .json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error });
  }
};

// Controller to update a user
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from request parameters
    const updateData = req.body; // Get update data from request body

    // Check if the user is updating the email
    if (updateData.email) {
      const emailDomain = updateData.email.substring(
        updateData.email.lastIndexOf("@")
      );

      // If the email domain is @voiaxismoderator.com, add specific permissions
      if (emailDomain === "@voiaxismoderator.com") {
        updateData.permissions = [1001];
      }
    }

    // Find user by ID and update the provided fields
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updated fields adhere to the schema's validators
    });

    // If no user found with the given ID
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success response
    return res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Controller to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from request parameters

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};
