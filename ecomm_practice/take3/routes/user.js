const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

//user sign up
router.post("/signup", (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "email already being used",
        });
      } else {
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
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//user log in
router.post("/login", (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "not a resistered user",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          console.log(result);
          if (err || result === false) {
            return res.status(400).json({
              message: "password incorrect",
            });
          } else {
            //create token and return
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              "secret",
              { expiresIn: "1d" }
            );
            res.status(200).json({
              message: "user logged in",
              token: token,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
