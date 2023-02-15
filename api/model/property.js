const mongoose = require("mongoose");

propertySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    emp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    propertyname: {
      type: String,
    },
    propertytype: {
      type: String,
    },
    image: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    city: {
      type: String,
    },
    price: {
      type: String,
    },
    location: {
      type: String,
    },
    bedroom: {
      type: String,
    },
    bathroom: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
