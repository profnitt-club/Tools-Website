import React from "react";
import { useNavigate } from "react-router-dom";
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
    <footer className="bg-pn-dark text-white p-5 font-sans min-h-[150px] w-full box-border">
      <div className="flex flex-col md:flex-row justify-around items-center flex-wrap w-full mx-auto text-center gap-[30px] md:gap-5">
        <div className="flex flex-col gap-3 text-[16px] items-center">
          <span className="flex items-center gap-3 text-[#e0e0e0] font-medium text-[14px] sm:text-[18px]">©2025 <strong>PROFNITT Tools</strong></span>
          <span className="flex items-center gap-3 text-[#e0e0e0] font-medium text-[14px] md:text-[16px]"><i className="text-[24px] text-pn-pink flex items-center justify-center"><SiGmail/></i><strong>profnitt.club@gmail.com</strong></span>
          <span className="flex items-center gap-3 text-[#e0e0e0] font-medium text-[14px] md:text-[16px]"><i className="text-[24px] text-pn-pink flex items-center justify-center"><IoMdCall/></i><strong>+91 87664 38933</strong></span>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <span><img src={logo} onClick={handleLogoClick} className="cursor-pointer"></img></span>
          <span className="text-[14px] md:text-[16px] font-bold text-pn-pink text-center max-w-[220px]">The Finanace & Investment Club of Nit Trichy</span>
        </div>
        <div className="flex justify-center flex-wrap gap-[10px] sm:gap-0">
          <a href="https://www.facebook.com/profnitt/"><i className="text-[26px] md:text-[30px] mx-[6px] md:mx-[8px] text-gray-100 flex items-center"><FaFacebook/></i></a>
          <a href="https://www.instagram.com/profnitt?igsh=bTd0ZW1oMGQyeHA3"><i className="text-[26px] md:text-[30px] mx-[6px] md:mx-[8px] text-gray-100 flex items-center"><FaInstagram/></i></a>
          <a href="https://github.com/profnitt-club"><i className="text-[26px] md:text-[30px] mx-[6px] md:mx-[8px] text-gray-100 flex items-center"><FaGithub/></i></a>
          <a href="https://www.linkedin.com/company/profnitt/"><i className="text-[26px] md:text-[30px] mx-[6px] md:mx-[8px] text-gray-100 flex items-center"><FaLinkedinIn/></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
