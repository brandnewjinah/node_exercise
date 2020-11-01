const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
  },
});

module.exports = mongoose.model("user", userSchema);
