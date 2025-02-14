import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./webpages/Login";
import SignUp from "./webpages/SignUp";
import UserProfileManagement from "./webpages/UserProfileManagement";
import NotFound from "./components/404";
import "./components/FooterStyle.css";
import "./components/HeaderStyle.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-profile" element={<UserProfileManagement />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
