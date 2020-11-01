const express = require("express");
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");

router.get("/", (req, res) => {
  orderModel
    .find()
    .populate("product", ["name", "price"])
    .then((orders) => {
      res.json({
        message: "all orders",
        count: orders.length,
        orders: orders.map((order) => {
          return {
            id: order.id,
            product: order.product,
            quantity: order.quantity,
            request: {
              type: "GET",
              url: "http://localhost:5000/order/" + order._id,
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

//order detail
router.get("/:orderId", (req, res) => {
  const id = req.params.orderId;
  orderModel
    .findById(id)
    .populate("product", ["name", "price"])
    .then((order) => {
      console.log("from database", order);
      if (order) {
        res.status(200).json({
          message: "get order",
          orderInfo: {
            id: order._id,
            product: order.product,
            quantity: order.quantity,
          },
          request: {
            type: "GET",
            url: "http://localhost:5000/order",
          },
        });
      } else {
        res.status(404).json({
          message: "order not found",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  productModel
    .findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "product not found",
        });
      }
      const order = new orderModel({
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "order stored",
        createdOrder: {
          id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/order/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

//order delete
router.delete("/:orderId", (req, res) => {
  const id = req.params.orderId;
  orderModel
    .findByIdAndDelete(id)
    .then((result) => {
      console.log("delete", result);
      res.json({
        message: "deleted order",
        request: {
          type: "GET",
          url: "http:/localhost:5000/order",
        },
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
