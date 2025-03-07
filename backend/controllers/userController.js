const users = [
    {
      id: 1,
      email: "admin@gmail.com",
      password: "password123",
      role: "admin",
      profile: {
        fullName: "Admin User",
        address: "123 Admin Street",
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
  exports.getUserProfile = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
    res.json({ success: true, profile: user.profile });
  };
  
  // Update User Profile
  exports.updateUserProfile = (req, res) => {
    const { id, fullName, address, city, state, zipCode, skills, availability } = req.body;
    const user = users.find((u) => u.id === id);
  
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  
    // Update profile
    user.profile = { fullName, address, city, state, zipCode, skills, availability };
    
    res.json({ success: true, message: "Profile updated successfully!" });
  };
