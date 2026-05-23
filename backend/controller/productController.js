const Product = require("./../model/ProductModel");
const Category = require("../model/CategoryModel");
const mongoose = require("mongoose");

function validateProductInput(body) {
  const { name, description, price, category, countInStock } = body;

  if (!name || !description || !category) {
    return "Name, description and category are required";
  }

  if (!mongoose.isValidObjectId(category)) {
    return "Valid category is required";
  }

  if (price === undefined || Number.isNaN(Number(price)) || Number(price) < 0) {
    return "Price must be a valid positive number";
  }

  if (
    countInStock === undefined ||
    !Number.isInteger(Number(countInStock)) ||
    Number(countInStock) < 0
  ) {
    return "Stock count must be a valid positive whole number";
  }

  return null;
}

exports.createProduct = async (req, res) => {
  try {
    const validationError = validateProductInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid Category" });
    }
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      price: Number(req.body.price),
      category: req.body.category,
      countInStock: Number(req.body.countInStock),
    });
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter).populate("category");
    res.status(200).json({
      status: "success",
      data: productList,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) {
      return res.status(400).json({ message: "Invalid Product Id" });
    }

    const product = await Product.findById(req.params.productId).populate(
      "category",
    );
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) {
      return res.status(400).json({ message: "Invalid Product Id" });
    }

    const validationError = validateProductInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
      return res
        .status(400)
        .json({ status: "Error", message: "Invalid Category" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        brand: req.body.brand,
        price: Number(req.body.price),
        category: req.body.category,
        countInStock: Number(req.body.countInStock),
      },
      { new: true },
    );
    res.status(200).json({
      status: "success",
      data: {
        updatedProduct,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) {
      return res.status(400).json({ message: "Invalid Product Id" });
    }
    const product = await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({
      status: "success",
      message: "Product Deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    if (!productCount) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({
      status: "success",
      count: {
        productCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
