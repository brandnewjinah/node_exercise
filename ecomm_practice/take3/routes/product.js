const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

router.get("/", (req, res) => {
  res.json({
    message: "data retrieved",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "data created",
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
