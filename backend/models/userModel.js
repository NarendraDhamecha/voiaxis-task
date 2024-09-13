const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNo: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firebaseUid: { type: String },
  permissions: { type: mongoose.Schema.Types.Mixed },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
