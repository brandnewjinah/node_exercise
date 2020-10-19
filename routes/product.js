const express = require("express");
const router = express.Router();

//CRUD - Create, Read, Update, Delete or Get, Post, Put, Delete

router.get("/", (req, res) => {
  res.json({
    message: "get data",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "create data",
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
