const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Buyer = require("../model/buyerinfo");

router.post("/", (req, res, next) => {
  const buyer = new Buyer({
    _id: new mongoose.Types.ObjectId(),
    buyername: req.body.buyername,
    buyerphonenumber: req.body.buyerphonenumber,
    buyeremail: req.body.buyeremail,
    interestedIn: req.body.interestedIn,
  });
  buyer
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newBuyer: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  Buyer.find()
    .then((result) => {
      res.status(200).json({
        buyerData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:_id", (req, res, next) => {
  Buyer.remove({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        message: "Buyer Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
