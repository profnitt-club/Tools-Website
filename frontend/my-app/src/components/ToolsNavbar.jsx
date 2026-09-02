import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const ToolsNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleStrategiesClick = () => {
    closeMenu();
    navigate(`/strategies`);
  };

  const handleToolsClick = () => {
    closeMenu();
    navigate(`/tools`);
  };

  const handleNewsClick = () => {
    closeMenu();
    navigate(`/news`);
  };

  const handleLogoClick = () => {
    closeMenu();
    navigate(`/`);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" role="navigation" aria-label="Tools Navigation">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="ProfNIT Tools" onClick={handleLogoClick} />
        </div>

        {/* Three-Bar Hamburger Button */}
        <button
          className={`hamburger-btn ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Menu Container (Links & Actions) */}
        <div className={`nav-menu-container ${isOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <a
                onClick={handleStrategiesClick}
                role="button"
                tabIndex={0}
                className={location.pathname === "/strategies" ? "active-nav" : ""}
                onKeyDown={(e) => e.key === "Enter" && handleStrategiesClick()}
              >
                STRATEGIES
              </a>
            </li>
            <li>
              <a
                onClick={handleToolsClick}
                role="button"
                tabIndex={0}
                className={location.pathname === "/tools" ? "active-nav" : ""}
                onKeyDown={(e) => e.key === "Enter" && handleToolsClick()}
              >
                TOOLS
              </a>
            </li>
            <li>
              <a
                onClick={handleNewsClick}
                role="button"
                tabIndex={0}
                className={location.pathname === "/news" ? "active-nav" : ""}
                onKeyDown={(e) => e.key === "Enter" && handleNewsClick()}
              >
                NEWS
              </a>
            </li>
          </ul>


          {/* Buttons */}
          <div className="nav-buttons">
            <button
              className="login-btn"
              onClick={() => {
                closeMenu();
                window.open("https://www.profnitt.co.in", "_blank");
              }}
            >
              ProfNITT
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ToolsNavbar;