const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const requireAdmin = require("../helper/admin");

router.post("/register", userController.registerUser);
router.get("/", requireAdmin, userController.getAllUser);
router.get("/count", requireAdmin, userController.getUserCount);
router.get("/:userId", requireAdmin, userController.getUser);
router.post("/login", userController.login);
router.delete("/:userId", requireAdmin, userController.deleteUser);

module.exports = router;
