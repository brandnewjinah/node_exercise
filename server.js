const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// routes
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log("server connected"));
