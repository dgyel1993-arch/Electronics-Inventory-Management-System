// Defines API routes for category operations
const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const requireAdmin = require("../helper/admin");

router.post("/", requireAdmin, categoryController.createCategory);
router.delete("/:categoryId", requireAdmin, categoryController.deleteCategory);
router.get("/", categoryController.getAllCategory);
router.get("/:categoryId", categoryController.getCategory);
router.put("/:categoryId", requireAdmin, categoryController.updateCategory);
module.exports = router;
