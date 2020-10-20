const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//import routes
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

//require middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//require db
const mongoose = require("mongoose");

//use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use routes
app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log("server connected"));
