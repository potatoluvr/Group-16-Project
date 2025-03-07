import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const states = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], 
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], 
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], 
  ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], 
  ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], 
  ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], 
  ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"], 
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"], 
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], 
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], 
  ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], 
  ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"], 
  ["WI", "Wisconsin"], ["WY", "Wyoming"]
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
    availability: [],
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
      const response = await fetch("http://localhost:5000/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 2, ...formData }), // Replace 2 with actual user ID
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Profile updated successfully!");
        navigate("/user-profile");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-profile-form">
      <h2>User Profile Management</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <label>Full Name (required)</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} maxLength={50} required />

      <label>Address 1 (required)</label>
      <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} maxLength={100} required />

      <label>Address 2 (optional)</label>
      <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} maxLength={100} />

      <label>City (required)</label>
      <input type="text" name="city" value={formData.city} onChange={handleInputChange} maxLength={100} required />

      <label>State (required)</label>
      <Select options={stateOptions} onChange={(selected) => setFormData({ ...formData, state: selected.value })} required />

      <label>Zip Code (required)</label>
      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} maxLength={9} required />

      <label>Skills (required)</label>
      <Select options={skillsOptions} isMulti onChange={handleSkillsChange} required />

      <label>Preferences (optional)</label>
      <textarea name="preferences" value={formData.preferences} onChange={handleInputChange} />

      <label>Availability (required)</label>
      <DatePicker selected={formData.availability} onChange={handleDateChange} multiple dateFormat="yyyy-MM-dd" required />

      <button type="submit">Update Profile</button>
    </form>
  );
}

export default UserProfileForm;

