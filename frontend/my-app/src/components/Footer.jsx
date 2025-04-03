import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6"
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="copyright">©2025 <strong>PROFNITT Tools</strong></span>
        <div className="logo">
          <span className="pizza-icon"><img src={logo}></img></span>
          <span className="love-text"></span>
        </div>
        <div className="social-icons">
          <i className="fab fa-facebook-f"><FaFacebook/></i>
          <i className="fab fa-instagram"><FaInstagram/></i>
          <i className="fab fa-behance"><FaTwitter/></i>
          <i className="fab fa-soundcloud"><FaLinkedinIn/></i>
        </div>
      </div>
      <div className="sentiments">
        Designed and Deployed by Divyansh Agrawal
      </div>
    </footer>
  );
};

export default Footer;
