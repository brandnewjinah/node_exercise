const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const {
  products_get_all,
  product_get_product,
  product_post_product,
  product_update_proudct,
  product_delete_product,
  product_delete_all,
} = require("../controller/product");

router.get("/", products_get_all);

//detail get product
router.get("/:productId", checkAuth, product_get_product);

router.post("/", checkAuth, product_post_product);

//update
router.put("/:productId", checkAuth, product_update_proudct);

//delete certain product

router.delete("/:productId", checkAuth, product_delete_product);

//delete all product

router.delete("/", checkAuth, product_delete_all);

module.exports = router;
