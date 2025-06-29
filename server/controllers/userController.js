import User from "../model/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      message: "User registered",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error with registerUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateAccessToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error with loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logged out successfully");
  } catch (error) {
    console.error("Error with logoutUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
