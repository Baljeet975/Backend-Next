var express = require("express");
var app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://baljeet123:baljeet123@cluster0.8k1fhkg.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("error", (err) => {
  console.log("DB connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Connected with database ");
});

const userRoute = require("./api/routes/user");
const propertyRoute = require("./api/routes/property");
const handlePropRoute = require("./api/routes/handleprop");

var publicDir = require("path").join(__dirname, "api/public");
app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/property", propertyRoute);
app.use("/handleprop", handlePropRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad Request",
  });
});

module.exports = app;
