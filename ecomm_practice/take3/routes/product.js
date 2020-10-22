const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

router.get("/", (req, res) => {
  //show data from the db
  productModel
    .find()
    .then((products) => {
      res.json({
        message: "all products",
        count: products.length,
        products: products,
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

router.post("/", (req, res) => {
  //from the post req create a new product matching to the model
  const newProduct = new productModel({
    name: req.body.productname,
    category: req.body.productcategory,
    price: req.body.productprice,
  });

  //with the new product, save to db, then display the product saved with a msg. catch error if any
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

router.put("/", (req, res) => {
  res.json({
    message: "data updated",
  });
});

router.delete("/", (req, res) => {
  res.json({
    message: "data deleted",
  });
});

module.exports = router;
