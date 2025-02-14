import UserProfileManagementForm from "../components/UserProfileManagementForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./UserProfileManagementStyle.css";

function UserProfileManagement() {
  return (
    <div className="user-profile-form">
        <Header />
        <UserProfileManagementForm />
        <Footer />
      </div>
  );
}

export default UserProfileManagement;
