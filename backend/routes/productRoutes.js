const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const requireAdmin = require("../helper/admin");

router.post("/", requireAdmin, productController.createProduct);
router.get("/count", productController.getProductCount);
router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getProduct);
router.put("/:productId", requireAdmin, productController.updateProduct);
router.delete("/:productId", requireAdmin, productController.deleteProduct);
module.exports = router;
