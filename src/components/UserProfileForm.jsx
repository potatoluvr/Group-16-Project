import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to get userId from token or localStorage
const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return decodedToken.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

useEffect(() => {
  const userId = getUserId();
  if (!userId) {
    setErrorMessage("User not found. Please log in again.");
    setLoading(false);
    return;
  }

  fetch(`http://localhost:5000/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setUserData(data.profile);
      } else {
        setErrorMessage("Failed to load profile data.");
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      setErrorMessage("Server error. Please try again.");
      setLoading(false);
    });
}, []);

  if (loading) return <p>Loading profile...</p>;
  if (errorMessage) return <p className="error-message">{errorMessage}</p>;

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
