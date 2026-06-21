import React from "react";
import { useNavigate } from "react-router-dom";
import bullImage from "../assets/BullImage.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/strategies`);
  };
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-pn-bg text-white p-5 md:p-[30px] lg:p-[50px] relative h-auto lg:h-[50vh] text-center lg:text-left">
      <div className="w-full md:w-[80%] lg:w-1/2 mb-5 lg:mb-0">
        <div className="text-[2rem] md:text-[3rem] lg:text-[4.5rem] font-clash font-extrabold leading-tight">
          Prof<span className="text-pn-pink font-clash">NITT</span> Tools
        </div>
        <div className="font-supply text-lg md:text-xl lg:text-[1.5rem] font-light opacity-80 text-white mt-2">
          By Finance & Investment Club of NIT Trichy
        </div>

        <div className="flex items-center justify-center lg:justify-start mt-5 hover:translate-x-[5px] transition-transform duration-300">
          <button 
            className="bg-gradient-to-r from-pn-purple to-pn-lavender px-5 py-2.5 md:px-6 md:py-3.5 rounded-[25px] text-[0.9rem] lg:text-[1.1rem] font-bold text-[#2a2734] transition-all duration-300 ease-in-out mt-1.5 hover:scale-105 hover:opacity-90" 
            onClick={handleClick}
          >
            Explore Strategies
          </button>
          <span className="text-[2rem] ml-[15px] opacity-70 animate-goright scale-110">→</span>
        </div>
      </div>

      <div className="flex justify-center mt-8 lg:mt-0 lg:w-1/2 lg:justify-end">
        <img 
          src={bullImage} 
          alt="Bull Market" 
          className="max-w-[90%] md:max-w-[80%] lg:max-w-[500px] rounded-[30px] lg:rounded-[60px] border-4 border-pn-magenta shadow-pn-pink-glow" 
        />
      </div>
    </div>
  );
};

export default HeroSection;
