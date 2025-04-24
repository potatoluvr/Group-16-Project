import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // to make sure we use same DB -> mongodb+srv://admin:password123!@cluster0.wrtt6.mongodb.net/volunteerDB?retryWrites=true&w=majority&appName=Cluster0
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
