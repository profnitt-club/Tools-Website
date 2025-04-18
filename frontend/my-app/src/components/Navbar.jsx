import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="ProfNIT Tools" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <a
            onClick={() => handleScrollTo("about")}
            style={{ cursor: "pointer" }}
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            onClick={() => handleScrollTo("services")}
            style={{ cursor: "pointer" }}
          >
            SERVICES
          </a>
        </li>
        <li>
          <a
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            TOOLS
          </a>
        </li>
        <li>
          <a
            onClick={() => handleScrollTo("explore")}
            style={{ cursor: "pointer" }}
          >
            EXPLORE
          </a>
        </li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <button className="login-btn">ProfNITT</button>
      </div>
    </nav>
  );
};

export default Navbar;
