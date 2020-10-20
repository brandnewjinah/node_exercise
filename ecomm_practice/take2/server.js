const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//require middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//require db
const mongoose = require("mongoose");

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log("server connected"));
