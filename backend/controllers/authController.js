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

  // Simulate a valid user login (hardcoded)
  const user = users.find((user) => user.email === email);

  // If no user is found, return an error
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Add real password validation here
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT token (use user's email as payload for now)
  const token = jwt.sign({ email: user.email }, "your_jwt_secret_key", {
    expiresIn: "1h",
  });

  // Return the generated token in the response
  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
};
