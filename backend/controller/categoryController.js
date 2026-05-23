// import Category model to be used by the controller
const Category = require("./../model/CategoryModel");
const mongoose = require("mongoose");

//create createCategory API
exports.createCategory = async (req, res) => {
  try {
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create({
      name: req.body.name.trim(),
      icon: req.body.icon,
    });
    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//create deleteCategory API
exports.deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({ message: "Invalid Category Id" });
    }

    const category = await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//API for getting all categories
exports.getAllCategory = async (req, res, next) => {
  try {
    const categoryList = await Category.find();
    res.status(200).json({
      status: "success",
      data: categoryList,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API for getting particular API
exports.getCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({ message: "Invalid Category Id" });
    }

    const category = await Category.findById(req.params.categoryId);
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API for updating a category
exports.updateCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.categoryId)) {
      return res.status(400).json({ message: "Invalid Category Id" });
    }

    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { name: req.body.name.trim(), icon: req.body.icon },
      { new: true },
    );
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
