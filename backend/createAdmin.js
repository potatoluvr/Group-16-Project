import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserCredentials } from "./models/User.js"; 

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("AdminPassword123", 10);

    const admin = new UserCredentials({
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      profileCompleted: true,
    });

    await admin.save();
    console.log("Admin user created successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    process.exit(1);
  }
}

createAdmin();
