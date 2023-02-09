const mongoose = require("mongoose");

buyerInfoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  buyername: String,
  // SupervisorName: {
  //   type: String,
  //   required: true,
  // },

  buyerphonenumber: {
    type: String,
    // required: true,
  },

  buyeremail: {
    type: String,
  },

  interestedIn: {
    type: String,
  },
});

module.exports = mongoose.model("Buyer", buyerInfoSchema);
