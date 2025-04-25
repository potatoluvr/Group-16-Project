import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        let decoded;
        try {
          decoded = jwtDecode(token);
        } catch (err) {
          throw new Error("Invalid token");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${decoded.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error("Profile load error:", err.message);
        setErrorMessage("Failed to load profile. Please try again.");
        setLoading(false);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <p>Loading profile...</p>;
  if (errorMessage) return <p className="error-message">{errorMessage}</p>;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <div className="profile-section">
        <p>
          <strong>Name:</strong> {userData.fullName}
        </p>
        <p>
          <strong>Address:</strong> {userData.address1}, {userData.city},{" "}
          {userData.state} {userData.zipCode}
        </p>
        <p>
          <strong>Skills:</strong>
          {userData.skills?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Availability:</strong>
          {userData.availability?.join(", ") || "N/A"}
        </p>
      </div>

      <div className="button-group">
        <button onClick={() => navigate("/user-profile/edit")}>
          Edit Profile
        </button>
        <button onClick={() => navigate("/user-profile/volunteer-history")}>
          View Volunteer History
        </button>
        <button className="logout-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
