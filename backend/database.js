// *temporary* for env file : MONGO_URI=mongodb+srv://admin:password123!@cluster0.wrtt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;