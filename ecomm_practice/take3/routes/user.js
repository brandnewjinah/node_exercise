const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { user_signup, user_login } = require("../controller/user");

//user sign up
router.post("/signup", user_signup);

//user log in
router.post("/login", user_login);

module.exports = router;
