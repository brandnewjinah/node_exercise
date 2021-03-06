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
        products: products.map((product) => {
          return {
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            request: {
              type: "GET",
              url: "http://localhost:5000/product/" + product._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

//detail get product
router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  productModel
    .findById(id)
    .then((doc) => {
      console.log("from database", doc);
      if (doc) {
        res.status(200).json({
          message: "get data",
          productInfo: {
            id: doc._id,
            name: doc.name,
            price: doc.price,
            category: doc.category,
          },
          request: {
            type: "GET",
            url: "http://localhost:5000/product",
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID",
        });
      }
    })
    .catch((err) => {
      res.json(err);
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
        productInfo: {
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          request: {
            type: "GET",
            url: "http://localhost:5000/product/" + product._id,
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
});

//update
router.put("/:productId", (req, res) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  productModel
    .findByIdAndUpdate(id, { $set: updateOps })
    .then((result) => {
      res.json({
        message: "product updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/product/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//delete certain product

router.delete("/:productId", (req, res) => {
  const id = req.params.productId;
  productModel
    .findByIdAndDelete(id)
    .then((result) => {
      console.log("delete", result);
      res.json({
        message: "deleted product",
        request: {
          type: "GET",
          url: "http://localhost:5000/product",
          body: {
            name: "String",
            price: "Number",
            category: "String",
          },
        },
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//delete all product

router.delete("/", (req, res) => {
  productModel
    .remove()
    .then((result) => {
      console.log("delete", result);
      res.json({
        message: "deleted all products",
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
