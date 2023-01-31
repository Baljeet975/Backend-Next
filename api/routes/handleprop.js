const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const handleProp = require("../model/handleprop");

//add prop  for only admin
router.post("/addproperty", (req, res, next) => {
  const handleprop = new handleProp({
    _id: new mongoose.Types.ObjectId(),
    propertyList: req.body.propertyList,
  });
  handleprop
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        AdditionalProp: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//put api for update propertylist

router.put("/update/:_id", (req, res, next) => {
  handleProp
    .findOneAndUpdate(
      { _id: req.params._id },
      {
        propertyList: req.body.propertyList,
      }
    )
    .then((result) => {
      res.status(200).json({
        updated_prop: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// get list of propertylist provided by admin
router.get("/newaddprop", (req, res, next) => {
  handleProp
    .find()
    .then((result) => {
      res.status(200).json({
        PropListData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//propertylist delete by admin
router.delete("/:id", (req, res, next) => {
  handleProp
    .remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Prop List Deleted ",
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
