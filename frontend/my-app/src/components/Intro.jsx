import React from 'react'
import { useNavigate } from "react-router-dom";
import introImage from "../assets/img_iphones.svg";

const Intro = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/strategies`);
    };
    return (
        <div id="about" className="bg-pn-bg text-white min-h-screen flex items-center justify-center p-4">
          <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-no-repeat bg-[url('../assets/vector2.png'),url('../assets/vector3.png')] bg-[length:contain] bg-[position:top,center]">
            {/* Left Section */}
            <div className="text-center lg:text-left">
              <div className="font-clash text-[2rem] md:text-[2.5rem] font-bold">INTRODUCTION</div>
              <h2 className="font-poppins font-thin tracking-[4.2px] break-words text-[1.5rem] md:text-[1.8rem] text-white mt-2">TO ProfNITT Tools</h2>
              <div className="flex items-center justify-center lg:justify-start mt-5 hover:translate-x-[5px] transition-transform duration-300">
                <button 
                  className="bg-gradient-to-r from-pn-purple to-pn-lavender px-5 py-3 rounded-[25px] text-[1rem] font-bold text-[#2a2734] transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90" 
                  onClick={handleClick}
                >
                  Explore Strategies
                </button>
                <span className="text-[2rem] ml-[15px] opacity-70 animate-goright scale-110">→</span>
              </div>
            </div>

            <p className="font-poppins text-[1rem] md:text-[1.2rem] mt-4 text-center lg:text-left">
                Explore the world of quantitative finance with ease! Test cutting-edge
                trading strategies on live markets and get detailed insights,
                including capital requirements for each approach. Empower your
                investment decisions with our user-friendly platform. Start your
                journey toward smarter trading today!
              </p>

            {/* Phones */}
            <div className="relative flex justify-center -order-1 lg:order-none">
              <img
                src={introImage}
                alt="ProfNITT Tools preview"
                className="w-full max-w-[350px] sm:max-w-[450px]"
              />
            </div>

            {/* Right Section */}
            <div className="bg-pn-card rounded-[10px] p-5 mb-5 border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] text-white text-center">
              <div className="flex flex-col items-center">
                <h2 className="font-clash text-[30px] font-extrabold text-white my-1.5">ABOUT US</h2>
                <h3 className="font-poppins text-[20px] font-extrabold text-white my-1.5">ProfNITT Club of NIT Trichy</h3>
                <p className="font-poppins text-[18px] mt-[18px]">
                  "ProfNITT Club, NIT Trichy, is a hub for innovation in quantitative
                  finance and technology. Our mission is to bridge the gap between
                  theory and real-world application by developing impactful projects
                  that empower users to explore live market strategies. Through
                  hands-on learning and cutting-edge tools, we aim to make a lasting
                  impact in the financial technology space while nurturing the next
                  generation of finance and tech leaders."
                </p>
                <br></br>
                <button 
                  className="bg-gradient-to-r from-pn-purple to-pn-lavender px-6 py-3.5 rounded-[25px] text-[1rem] font-bold text-[#2a2734] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 mt-2" 
                  onClick={() => window.open("https://profnitt.in", "_blank")}
                >
                  LET’S GET IN TOUCH
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Intro