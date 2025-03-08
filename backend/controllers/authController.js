import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Hardcoded users (placeholder)
const users = [
  { email: "admin@gmail.com", password: bcrypt.hashSync("password123", 10) },
  {
    email: "volunteer@gmail.com",
    password: bcrypt.hashSync("volunteerpassword", 10),
  },
];

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
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Simulate user role
  const userRole = email === "admin@gmail.com" ? "admin" : "volunteer";
  const userId = user.email === "admin@gmail.com" ? 1 : 2; // Simulate userId based on email

  // Generate JWT token (use user's email, role, and userId in the payload)
  const token = jwt.sign(
    { email: user.email, role: userRole, userId: userId },
    process.env.JWT_SECRET_KEY || "your_jwt_secret_key", // Use environment variable for the secret key
    { expiresIn: "1h" }
  );

  // Return the generated token in the response
  return res.status(200).json({
    message: "Login successful",
    token: token,
    role: userRole,
    userId: userId,
  });
};
