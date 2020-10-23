const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//require middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//require router
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

//require db
const mongoose = require("mongoose");

//connect to db
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_ADDRESS, dbOptions)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err.message));

//use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use router
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log("server connected"));
