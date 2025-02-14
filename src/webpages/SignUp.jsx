import Header from "../components/Header.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import Footer from "../components/Footer.jsx";
import "./SignUpStyle.css";

function SignUp() {
  return (
    <div className="signup-page">
      <Header />
      <SignUpForm />
      <Footer />
    </div>
  );
}

export default SignUp;
