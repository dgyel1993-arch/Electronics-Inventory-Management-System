const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});
const Items = mongoose.model("Items", ItemsSchema);
module.exports = Items;
