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
    bedroom: req.body.bedroom,
    bathroom: req.body.bathroom,
    status: req.body.status,
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

// router.get("/:_id", (req, res, next) => {
//   Property.find({ _id: req.params._id })
//     .then((result) => {
//       res.status(200).json({
//         message: "Property Find",
//         result: result,
//       });
//     })
//     .catch((err) => {
//       console.log("error");
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.get("/beds", (req, res, next) => {
  const firstBedString = req.body;
  // const MyBedString = req.body;
  var query = {
    bedroom: {
      $gte: firstBedString,
      // $lte: MyBedString,
    },
  };
  console.log(query);

  Property.find(query)
    .then((result) => {
      res.status(200).json({
        PropertybyBed: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:_id", (req, res, next) => {
  console.log({ _id: req.params._id });
  Property.find({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        MyProp: result,
      });
    })
    .catch((err) => {
      console.log(err);
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
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        status: req.body.status,
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
  } else if (req.body.status) {
    console.log("status", req.body);
    Property.find({ status: req.body.status })
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
  } else if (req.body.bedroom) {
    console.log("bedrooms", req.body);
    Property.find({ bedroom: req.body.bedroom })
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
  } else if (req.body.bathroom) {
    console.log("bathroom", req.body);
    Property.find({ bedroom: req.body.bathroom })
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
  } else if (req.body.price) {
    console.log("price", req.body);
    Property.find({ price: req.body.bathpriceroom })
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
