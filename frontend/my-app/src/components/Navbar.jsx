import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  /*useEffect(() => {
    // Check authentication status after redirect
    fetch("http://localhost:3000/profile", {
      credentials: "include", // Send cookies with the request
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUserName(data.displayName);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsAuthenticated(false);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to Google login
  };

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    })
      .then(() => {
        setIsAuthenticated(false);
        setUserName("");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  const navigate = useNavigate();*/

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
        {isAuthenticated ? (
          <>
            <span className="user-name">Welcome, {userName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            ProfNITT
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
