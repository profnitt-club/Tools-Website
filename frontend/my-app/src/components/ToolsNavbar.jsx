import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const ToolsNavbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/strategies`);
  };

  const handleScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick=() =>{
    navigate(`/`);
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="ProfNIT Tools" onClick={handleLogoClick} />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <a
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            TOOLS
          </a>
        </li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <button className="login-btn" onClick={() => window.open("https://profnitt.in", "_blank")}>ProfNITT</button>
      </div>
    </nav>
  );
}

export default ToolsNavbar