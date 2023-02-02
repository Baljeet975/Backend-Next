const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // googleId: String,
  name: String,
  // password: String,
  number: String,
  profilepicture: String,

  role: {
    type: String,
    uppercase: false,
    lowercase: true,
    enum: ["admin", "buyer", "seller"],
  },

  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  adhaarcard: {
    type: String,
  },
  alternatenumber: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },

  panNumber: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
