import mongoose from "mongoose";
import { Types } from "mongoose";
import { UserCredentials, UserProfile } from "../models/User.js";

const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "password123",
    role: "admin",
    profile: {
      fullName: "Admin User",
      address1: "123 Admin Street",
      address2: "",
      city: "Houston",
      state: "TX",
      zipCode: "77001",
      skills: ["Leadership"],
      availability: ["2025-03-15"],
    },
  },
  {
    id: 2,
    email: "volunteer@gmail.com",
    password: "password123",
    role: "volunteer",
    profile: {
      fullName: "Volunteer User",
      address: "456 Volunteer Ave",
      city: "Houston",
      state: "TX",
      zipCode: "90001",
      skills: ["Teamwork", "Organization"],
      availability: ["2025-04-10"],
    },
  },
];

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching profile for:", userId);

    // Find the user's profile info
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile); 
  } catch (err) {
    console.error("Error in getUserProfile:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



// Update User Profile
export async function createUserProfile(req, res) {
  try {
    const userId = req.user.userId;

    let profile = await UserProfile.findOne({ userId });
    if (profile) {
      return res.status(400).json({ message: "Profile already exists." });
    }

    profile = new UserProfile({
      userId,
      fullName: req.body.fullName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      skills: req.body.skills,
      preferences: req.body.preferences,
      availability: req.body.availability,
    });
    await profile.save();

    await UserCredentials.findByIdAndUpdate(userId, {
      profileCompleted: true,
    });

    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const userId = req.user.userId;

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        fullName: req.body.fullName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        skills: req.body.skills,
        preferences: req.body.preferences,
        availability: req.body.availability,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    await UserCredentials.findByIdAndUpdate(userId, {
      profileCompleted: true,
    });

    return res
      .status(200)
      .json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getVolunteers = async (req, res) => {
  try {
    const profiles = await UserProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
