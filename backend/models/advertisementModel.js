const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the User model
    ref: "User",
    required: true,
  },
  isReviewed: { type: Boolean, default: false },
  status: { type: String, default: "pending" },
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);
module.exports = Advertisement;
