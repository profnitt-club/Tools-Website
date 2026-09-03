import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
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

  const handleScrollTo = (sectionId) => {
    closeMenu();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    navigate(`/`);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
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
                onClick={() => handleScrollTo("about")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleScrollTo("about")}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                onClick={() => handleScrollTo("services")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleScrollTo("services")}
              >
                SERVICES
              </a>
            </li>
            <li>
              <a
                onClick={handleStrategiesClick}
                role="button"
                tabIndex={0}
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
                onKeyDown={(e) => e.key === "Enter" && handleToolsClick()}
              >
                TOOLS
              </a>
            </li>

            <li>
              <a
                onClick={() => handleScrollTo("explore")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleScrollTo("explore")}
              >
                EXPLORE
              </a>
            </li>
            <li>
              <a
                onClick={handleNewsClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNewsClick()}
              >
                NEWS
              </a>
            </li>
          </ul>

          {/* Action Buttons */}
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

export default Navbar;

