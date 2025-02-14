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
    const validEmails = ["admin@gmail.com", "volunteer@gmail.com"];
    return validEmails.includes(email);
  };

  // Validate password length
  const validatePassword = (password) => {
    return password.length > 7; // Password must be longer than 7 characters
  };

  const handleSubmit = (event) => {
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

    // Simulate the signup process (placeholder)
    console.log("Sign Up Successful!", { email, password });

    // Redirect to UserProfileManagement page upon successful signup
    navigate("/user-profile");
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
