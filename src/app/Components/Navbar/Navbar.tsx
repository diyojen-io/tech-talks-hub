import BaseButton from "../BaseButton/BaseButton";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <span className="logo-text">TechTalksHub</span>
      </a>
      <div className="navbar-nav">
        <BaseButton variant="teritary-outline" size="large" label="Login" />
        <BaseButton variant="secondary-outline" size="large" label="Sign Up" />
      </div>
    </nav>
  );
};

export default Navbar;
