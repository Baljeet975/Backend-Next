const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // googleId: String,
  // name: String,
  // password: String,
  number: String,
});

module.exports = mongoose.model("user", userSchema);
