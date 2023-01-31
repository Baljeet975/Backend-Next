const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/user");

router.post("/signup", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    number: req.body.number,
    // name: req.body.name,
    // password: req.body.password,
    // mobilenumber: req.body.mobilenumber,
  });

  user
    .save()
    .then((result) => {
      console.log(result, "rrrrrrr");
      res.status(200).json({
        new_user: result,
      });
    })
    .catch((err) => {
      console.log(err, "eeeee");

      res.status(500).json({
        error: err,
      });
    });
});

// router.post("/login", (req, res, next) => {
//   User.find({ number: req.body.number })
//     .exec()
//     .then((user) => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           msg: "user not exist",
//         });
//       }
//       console.log("going forward");
//       if (req.body.password !== user[0].password) {
//         console.log("req.body.password", req.body.password);
//         console.log("user[0].password", user[0].password);

//         return res.status(401).json({
//           msg: "user password matching fail",
//         });
//       } else {
//         const token = jwt.sign(
//           {
//             _id: user[0]._id,

//             number: user[0].number,
//           },
//           "this is dummy text", // SECRET KEY
//           {
//             expiresIn: "24h",
//           }
//         );
//         res.status(200).json({
//           _id: user[0]._id,

//           phone: user[0].phone,

//           token: token,
//         });
//         console.log("Success Password Matching");
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         err: err,
//       });
//     });
// });

router.get("/", (req, res, next) => {
  console.log("fetching all data");
  User.find()
    .then((result) => {
      res.status(200).json({
        userData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
