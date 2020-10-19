const express = require("express");
const router = express.Router();

//CRUD - Create, Read, Update, Delete or Get, Post, Put, Delete

router.get("/", (req, res) => {
  res.json({
    message: "get data",
  });
});

router.post("/", (req, res) => {
  const productData = {
    name: req.body.productname,
    price: req.body.productprice,
  };
  res.json({
    message: "data created",
    productInfo: productData,
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
