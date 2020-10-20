const express = require("express");
const router = express.Router();

//CRUD

router.get("/", (req, res) => {
  res.json({
    message: "read data",
  });
});

router.post("/", (req, res) => {
  //save req received as productData
  const productData = {
    name: req.body.productname,
    price: req.body.productprice,
  };

  //give productData as res
  res.json({
    messaage: "create data",
    productInfo: productData,
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
