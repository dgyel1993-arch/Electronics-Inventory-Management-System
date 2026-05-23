const User = require("./../model/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      if (!token) {
        return res.status(401).json({ message: "Admin token is required" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    user = await user.save();
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userList = await User.find().select("-password");
    res.status(200).json({
      status: "success",
      data: {
        userList,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const user = await User.findById(req.params.userId).select("-password");
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // check if user exist
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { userid: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      res.status(200).send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: token,
      });
    } else {
      res.status(400).send({ message: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    if (!userCount) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({
      status: "success",
      count: {
        userCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      res.status(400).json({ message: "Invalid User Id" });
      return;
    }
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      status: "success",
      message: "User Deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
