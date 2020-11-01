const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const {
  order_get_all,
  order_get_detail,
  order_post,
} = require("../controller/order");

router.get("/", checkAuth, order_get_all);

//order detail
router.get("/:orderId", checkAuth, order_get_detail);

router.post("/", checkAuth, order_post);

module.exports = router;
