const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

//CRUD - Create, Read, Update, Delete or Get, Post, Put, Delete

router.get("/", (req, res) => {
  productModel
    .find()
    .then((docs) => {
      res.json({
        msg: "get total product",
        count: docs.length,
        products: docs,
      });
    })
    .catch((err) => {
      res.json({
        msg: err.message,
      });
    });
});

router.post("/", (req, res) => {
  const newProduct = new productModel({
    name: req.body.productname,
    price: req.body.productprice,
  });

  newProduct
    .save()
    .then((product) => {
      res.json({
        msg: "saved product",
        productInfo: product,
      });
    })
    .catch((err) => {
      res.json({
        msg: err.message,
      });
    });
});

router.put("/", (req, res) => {
  res.json({
    message: "update data",
  });
});

router.delete("/", (req, res) => {
  res.json({
    message: "delete data",
  });
});

module.exports = router;
