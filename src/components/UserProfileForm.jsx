import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to get userId from token or localStorage

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        const response = await fetch(
          `http://localhost:5000/api/users/${decoded.userId}`,
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

      {/* Profile summary */}
      <div className="profile-section">
        <p>
          <strong>Name:</strong> {userData.fullName}
        </p>
        <p>
          <strong>Address:</strong> {userData.address1}, {userData.city},{" "}
          {userData.state} {userData.zipCode}
        </p>
        <p>
          <strong>Skills:</strong> {userData.skills.join(", ")}
        </p>
        <p>
          <strong>Availability:</strong> {userData.availability.join(", ")}
        </p>
      </div>

      {/* Navigation buttons */}
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
