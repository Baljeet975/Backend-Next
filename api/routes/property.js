const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Property = require("../model/property");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./api/public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else if (file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/add", upload.single("image"), function (req, res, next) {
  // console.log("Hello Image Here", req.file.originalname);
  const property = new Property({
    _id: new mongoose.Types.ObjectId(),
    // emp_id: req.body.emp_id,
    propertyname: req.body.propertyname,
    propertytype: req.body.propertytype,
    zipcode: req.body.zipcode,
    city: req.body.city,
    location: req.body.location,
    price: req.body.price,
    image: req.file.originalname,
  });
  property
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        propertyRecord: result,
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
  Property.find()
    .then((result) => {
      res.status(200).json({
        propertyData: result,
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
  Property.remove({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        message: "Property Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:_id", (req, res, next) => {
  console.log(req.params._id);
  console.log(req.body.city, "city");
  Property.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        propertyname: req.body.propertyname,
        propertytype: req.body.propertytype,
        city: req.body.city,
        location: req.body.location,
        zipcode: req.body.zipcode,
        file: req.body.file,
        price: req.body.price,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_property: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/filterdata", (req, res, next) => {
  const { propertytype } = req.body;
  console.log("prop", propertytype);

  if (req.body.city) {
    console.log("city", req.body.city);
    Property.find({ city: req.body.city })
      .then((result) => {
        res.status(200).json({
          propertyData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else if (req.body.propertytype) {
    console.log("prop req", req.body);

    Property.find({ propertytype: req.body.propertytype })
      .then((result) => {
        res.status(200).json({
          propertyData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    console.log("All");
    Property.find()
      .then((result) => {
        res.status(200).json({
          propertyData: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

// router.post("/Byprice", (req, res, next) => {
//   Property.find({ price: req.body.price })
//     .then((result) => {
//       res.status(200).json({
//         PropertyDataByPrice: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.post("/Bycity", (req, res, next) => {
//   Property.find({ city: req.body.city })
//     .then((result) => {
//       res.status(200).json({
//         PropertyDataByCity: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.post("/Bypropertytype", (req, res, next) => {
//   Property.find({ propertytype: req.body.propertytype })
//     .then((result) => {
//       res.status(200).json({
//         PropertyDataByPropertyType: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
