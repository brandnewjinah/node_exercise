const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

//user sign up
router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((user) => {
          console.log(user);
          res.status(200).json({
            message: "user created",
            userInfo: user,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

//user log in
router.post("/login", (req, res) => {});

module.exports = router;
