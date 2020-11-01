const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

//user sign up
router.post("/signup", (req, res) => {
  userModel
    .findOne({ email: req.body.email }) //look for existing email
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "email already being used",
        });
      } else {
        //pw to hash
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            //save user
            const user = new userModel({
              email: req.body.email,
              title: req.body.title,
              name: req.body.name,
              country: req.body.country,
              consent: req.body.consent,
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

//user login
router.post("/login", (req, res) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Not a registered user",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          console.log(result);
          if (err || result === false) {
            // because result comes in boolean
            return res.status(400).json({
              message: "Password incorrect",
            });
          } else {
            const token = jwt.sign(
              { userId: user._id, email: user.email, name: user.name },
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
