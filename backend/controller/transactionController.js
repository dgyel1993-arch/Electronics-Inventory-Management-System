const Transaction = require("./../model/TransactionModel");
const Items = require("./../model/ItemsModel");
const Product = require("./../model/ProductModel");
const mongoose = require("mongoose");

exports.createTransaction = async (req, res) => {
  try {
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one transaction item is required" });
    }

    for (const item of req.body.items) {
      if (!mongoose.isValidObjectId(item.product)) {
        return res.status(400).json({ message: "Valid product is required" });
      }

      if (
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
      ) {
        return res
          .status(400)
          .json({ message: "Quantity must be a positive whole number" });
      }
    }

    const transactionItemsIds = await Promise.all(
      req.body.items.map(async (item) => {
        // find product
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error("Product not found");
        }
        // validate stock
        if (product.countInStock < item.quantity) {
          throw new Error(`${product.name} has insufficient stock`);
        }
        // reduce stock
        product.countInStock -= item.quantity;
        await product.save();

        let newItem = new Items({
          quantity: Number(item.quantity),
          product: item.product,
        });

        newItem = await newItem.save();

        return newItem._id;
      }),
    );

    let transaction = new Transaction({
      items: transactionItemsIds,
      reason: req.body.reason,
      reference: req.body.reference,
      user: req.body.user || req.auth?.userid,
    });

    transaction = await transaction.save();

    res.status(201).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllTransaction = async (req, res) => {
  try {
    const transactionList = await Transaction.find()
      .populate("user", "name")
      .populate({
        path: "items",
        populate: { path: "product", populate: "category" },
      });
    res.status(200).json({
      status: "success",
      data: {
        transactionList,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
