const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

// Route to fetch user profile
router.get("/:id", getUserProfile);

// Route to update user profile
router.post("/update", updateUserProfile);

module.exports = router;
