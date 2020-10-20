const express = require("express");
const router = express.Router();

//CRUD

router.get("/", (req, res) => {
  res.json({
    message: "read data",
  });
});

router.post("/", (req, res) => {
  res.json({
    messaage: "create data",
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
