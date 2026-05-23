const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getAllTransaction);

module.exports = router;
