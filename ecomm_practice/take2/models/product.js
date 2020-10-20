const mongoose = require("mongoose");

//blueprint of the product object inside the db
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model("product", productSchema);
