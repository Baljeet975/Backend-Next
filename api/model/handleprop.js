const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const handleProp = require("../model/handleprop");

handlepropSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  propertyList: String,
});

module.exports = mongoose.model(" Handle Property", handlepropSchema);
