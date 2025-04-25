import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  // Validate email
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  // Validate password length
  const validatePassword = (password) => {
    return password.length > 7; // Password must be longer than 7 characters
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email is valid
    if (!validateEmail(email)) {
      setErrorMessage(
        "Please enter a valid email (admin@gmail.com or volunteer@gmail.com)."
      );
      return;
    }

    // Check if the password is valid
    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(""); // Clear error message if everything is valid

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    
      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("API result:", result);
    
      if (response.status === 201) {
        navigate("/user-profile/edit");
      } else {
        setErrorMessage(result.message || "Signup failed, please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Signup error:", error);
    }

  };

  return (
    <form className="sign-up-form-container" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password field */}
      <div className="form-field">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* Only show the error message if it exists */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
