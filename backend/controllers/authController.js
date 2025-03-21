import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserCredentials } from "../models/User.js";

// Hardcoded users (placeholder)
const users = [
  { email: "admin@gmail.com", password: bcrypt.hashSync("password123", 10) },
  {
    email: "volunteer@gmail.com",
    password: bcrypt.hashSync("volunteerpassword", 10),
  },
];

// Register user (placeholder)
export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if email is valid
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check password length
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await UserCredentials.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const user = new UserCredentials({
      email,
      password,
      role: role || "volunteer",
    });
    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration form", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login user (placeholder)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserCredentials.findOne({ email });
    if (!user) {
      return res.return(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
      process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ messasge: "Login successful", token });
  } catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
