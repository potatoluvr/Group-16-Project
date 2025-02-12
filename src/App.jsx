import "./webpages/LoginSyle.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./webpages/Login";
import SignUp from "./webpages/SignUp";
import UserProfileManagement from "./webpages/UserProfileManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-profile" element={<UserProfileManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
