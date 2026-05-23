const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
      required: true,
    },
  ],
  reason: {
    type: String,
    default: "",
  },
  reference: {
    type: String, // invoice no, order id, etc.
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
