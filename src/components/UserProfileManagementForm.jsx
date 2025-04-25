import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";

const states = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
];

const stateOptions = states.map(([value, label]) => ({ value, label }));

const skillsOptions = [
  { value: "leadership", label: "Leadership" },
  { value: "teamwork", label: "Teamwork" },
  { value: "flexibility", label: "Flexible Schedule" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "other", label: "Other" },
];

function UserProfileForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [],
    preferences: "",
    availability: new Date(),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData({ ...formData, skills: selectedOptions });
  };

  const handleDateChange = (dates) => {
    setFormData({ ...formData, availability: dates });
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
  
        const sanitizedFormData = {
          ...formData,
          skills: formData.skills.map((s) => s.value),
        };
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId, ...sanitizedFormData }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Profile updated successfully!");
          navigate("/user-profile");
        } else {
          setErrorMessage(data.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Server error. Please try again.");
      }
    };
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found in localStorage.");
            return;
          }
          
          let decoded;
          try {
            decoded = jwtDecode(token);
          } catch (err) {
            console.error("Invalid JWT token:", err.message);
            return;
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

        const formattedSkills = data.skills.map((s) => ({
          value: s,
          label: s.charAt(0).toUpperCase() + s.slice(1),
        }));

        setFormData({
          fullName: data.fullName || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          skills: formattedSkills,
          preferences: data.preferences || "",
          availability: data.availability
            ? new Date(data.availability)
            : new Date(),
        });
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const getStateLabel = (value) => {
    const state = stateOptions.find((option) => option.value === value);
    return state;
  };

  return (
    <form onSubmit={handleSubmit} className="user-profile-form">
      <h2>User Profile Management</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label>Full Name (required)</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        maxLength={50}
        required
      />

      <label>Address 1 (required)</label>
      <input
        type="text"
        name="address1"
        value={formData.address1}
        onChange={handleInputChange}
        maxLength={100}
        required
      />

      <label>Address 2 (optional)</label>
      <input
        type="text"
        name="address2"
        value={formData.address2}
        onChange={handleInputChange}
        maxLength={100}
      />

      <label>City (required)</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        maxLength={100}
        required
      />

      <label>State (required)</label>
      <Select
        options={stateOptions}
        onChange={(selected) =>
          setFormData({ ...formData, state: selected.value })
        }
        required
        value={getStateLabel(formData.state)}
      />

      <label>Zip Code (required)</label>
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleInputChange}
        maxLength={9}
        required
      />

      <label>Skills (required)</label>
      <Select
        options={skillsOptions}
        isMulti
        onChange={handleSkillsChange}
        required
        value={formData.skills}
      />

      <label>Preferences (optional)</label>
      <textarea
        name="preferences"
        value={formData.preferences}
        onChange={handleInputChange}
      />

      <label>Availability (required)</label>
      <DatePicker
        selected={formData.availability}
        onChange={handleDateChange}
        multiple
        dateFormat="yyyy-MM-dd"
        required
      />

      <button type="submit">Update Profile</button>
    </form>
  );
}

export default UserProfileForm;
