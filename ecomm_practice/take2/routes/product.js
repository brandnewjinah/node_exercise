const express = require("express");
const { count } = require("../models/product");
const router = express.Router();
const productModel = require("../models/product");

//CRUD

router.get("/", (req, res) => {
  //get items in the productModel form
  productModel
    .find()
    .then((items) => {
      res.json({
        message: "total products",
        count: items.length,
        products: items,
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

router.post("/", (req, res) => {
  //create a new product object in the productModel form
  const newProduct = new productModel({
    name: req.body.productname,
    price: req.body.productprice,
  });

  //save to the db
  newProduct
    .save()
    .then((product) => {
      res.json({
        message: "product saved",
        productInfo: product,
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

router.put("/", (req, res) => [
  res.json({
    message: "update data",
  }),
]);

router.delete("/", (req, res) => {
  res.json({
    message: "delete data",
  });
});

module.exports = router;
