import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/strategies`);
  };

  const handleNewsClick = () =>{
    navigate(`/news`);
  }

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
    <nav className="relative flex flex-col md:flex-row justify-between items-center bg-pn-dark px-[clamp(20px,5vw,50px)] py-[15px] min-h-[75px] w-full">
      {/* Logo */}
      <div className="flex justify-center md:justify-start w-full md:w-auto">
        <img src={logo} alt="ProfNIT Tools" onClick={handleLogoClick} className="h-[75px] scale-[1.4] cursor-pointer" />
      </div>

      {/* Navigation Links */}
      <ul className="list-none flex flex-col md:flex-row items-center gap-[15px] md:gap-[120px] w-full md:w-auto mt-6 md:mt-0 p-0">
        <li className="inline">
          <a
            onClick={() => handleScrollTo("about")}
            className="font-poppins no-underline text-white font-bold text-[16px] cursor-pointer hover:text-[#c2c2c2]"
          >
            ABOUT
          </a>
        </li>
        <li className="inline">
          <a
            onClick={() => handleScrollTo("services")}
            className="font-poppins no-underline text-white font-bold text-[16px] cursor-pointer hover:text-[#c2c2c2]"
          >
            SERVICES
          </a>
        </li>
        <li className="inline">
          <a
            onClick={handleClick}
            className="font-poppins no-underline text-white font-bold text-[16px] cursor-pointer hover:text-[#c2c2c2]"
          >
            TOOLS
          </a>
        </li>
        <li className="inline">
          <a
            onClick={() => handleScrollTo("explore")}
            className="font-poppins no-underline text-white font-bold text-[16px] cursor-pointer hover:text-[#c2c2c2]"
          >
            EXPLORE
          </a>
        </li>
        <li className="inline">
          <a
            onClick={handleNewsClick}
            className="font-poppins no-underline text-white font-bold text-[16px] cursor-pointer hover:text-[#c2c2c2]"
          >
            NEWS
          </a>
        </li>
      </ul>

      {/* Buttons */}
      <div className="relative flex flex-col md:flex-row gap-[10px] md:gap-0 md:mr-[50px] w-full md:w-auto items-center mt-6 md:mt-0">
        <button 
          className="bg-gradient-to-r from-[#5F5C8E] to-[#A6A1C6] text-white border-none px-[25px] py-[10px] rounded-[20px] cursor-pointer font-bold text-[1.1rem] hover:opacity-80" 
          onClick={() => window.open("https://profnitt.in", "_blank")}
        >
          ProfNITT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
