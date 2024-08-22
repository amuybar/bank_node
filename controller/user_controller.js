const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.registerUser = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

      const hashed = await bcrypt.hash(password, 6);
      
      const newUser = new User({
          
          email,
          password: hashed,
          name,
          phone
      });
    await newUser.save();

      res.status(201).json({
          message: "User registered successfully",
          user:newUser
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY,
      {
      expiresIn: "1h",
      });
    res.json({ message: "Logged in successfully", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while trying to login" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while trying to logout" });
  }
};

exports.getUser = async (req, res) => {};

exports.updateUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {};

exports.getAllUsers = async (req, res) => {};

exports.getUsersByRole = async (req, res) => {};
