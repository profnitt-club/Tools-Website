import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoMdCall } from "react-icons/io";

const Footer = () => {
  const navigate = useNavigate();
  const handleLogoClick=() =>{
    navigate(`/`);
  }
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-contents">
          <span className="copyright">©2025 <strong>PROFNITT Tools</strong></span>
          <span className="copyright"><i><SiGmail/></i><strong>profnitt.club@gmail.com</strong></span>
          <span className="copyright"><i><IoMdCall/></i><strong>+91 87664 38933</strong></span>
        </div>
        <div className="logo">
          <span className="pizza-icon"><img src={logo} onClick={handleLogoClick}></img></span>
          <span className="love-text">The Finanace & Investment Club of Nit Trichy</span>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/profnitt/"><i className="fab fa-facebook-f"><FaFacebook/></i></a>
          <a href="https://www.instagram.com/profnitt?igsh=bTd0ZW1oMGQyeHA3"><i className="fab fa-instagram"><FaInstagram/></i></a>
          <a href="https://github.com/profnitt-club"><i className="fab fa-behance"><FaGithub/></i></a>
          <a href="https://www.linkedin.com/company/profnitt/"><i className="fab fa-soundcloud"><FaLinkedinIn/></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
