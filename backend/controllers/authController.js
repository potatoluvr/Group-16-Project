import jwt from "jsonwebtoken";

// Hardcoded users (placeholder)
const users = [
  { email: "admin@gmail.com", password: "password123" },
  { email: "volunteer@gmail.com", password: "volunteerpassword" },
];

// Helper function for validation
const validateEmail = (email) => {
  return email === "admin@gmail.com" || email === "volunteer@gmail.com";
};

const validatePassword = (password) => {
  return password.length >= 8;
};

// Register user (placeholder)
export const registerUser = (req, res) => {
  const { email, password } = req.body;

  // Check if email is valid
  if (email !== "admin@gmail.com" && email !== "volunteer@gmail.com") {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Check password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  // Simulate a successful registration (no database)
  return res.status(201).json({ message: "User registered successfully" });
};

// Login user (placeholder)
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if email is valid
  if (email !== "admin@gmail.com" && email !== "volunteer@gmail.com") {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Check password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  // Simulate login and return a token
  const token = "fake-jwt-token";
  return res.status(200).json({ token });
};
