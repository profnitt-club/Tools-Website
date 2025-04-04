import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/strategies`);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="ProfNIT Tools" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><a href="#about">ABOUT</a></li>
        <li><a href="#services">SERVICES</a></li>
        <li><a onClick={handleClick} style={{ cursor: "pointer" }}>TOOLS</a></li>
        <li><a href="#explore">EXPLORE</a></li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <button className="login-btn">ProfNITT</button>
      </div>
    </nav>
  );
};

export default Navbar;
