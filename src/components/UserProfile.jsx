import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  // Replace with actual user data from database
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    address1: "123 Bellaire",
    city: "Houston",
    state: "TX",
    zipCode: "77001",
    skills: ["Teamwork", "Problem-Solving"],
    availability: ["2025-03-15", "2025-03-20"],
    profileComplete: true, 
  });

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      {/* Profile summary */}
      <div className="profile-section">
        <p><strong>Name:</strong> {userData.fullName}</p>
        <p><strong>Address:</strong> {userData.address1}, {userData.city}, {userData.state} {userData.zipCode}</p>
        <p><strong>Skills:</strong> {userData.skills.join(", ")}</p>
        <p><strong>Availability:</strong> {userData.availability.join(", ")}</p>
      </div>

      {/* Profile completion notice */}
      {!userData.profileComplete && (
        <p className="warning-text">⚠️ Your profile is incomplete. Please update it.</p>
      )}

      {/* Navigation buttons */}
      <div className="button-group">
        <button onClick={() => navigate("/user-profile/edit")}>Edit Profile</button>
        <button onClick={() => navigate("/user-profile/volunteer-history")}>View Volunteer History</button>
        <button className="logout-btn" onClick={() => navigate("/")}>Log Out</button>
      </div>
    </div>
  );
}

export default UserProfile;
