import React from 'react'
import { useNavigate } from 'react-router-dom'
import down from "../assets/down.svg"
import right from "../assets/rightarrow.svg"

const Explore = () => {
  const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/strategies`);
    };
  return (
    <div id="tools" className="text-white py-8 px-4 font-sans">
      {/* Header Section */}
      <div className="relative bg-[radial-gradient(circle,#3e3c63,#262230)] bg-no-repeat bg-cover bg-bottom border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] text-center mx-auto mb-8 md:mb-[4.5rem] w-[95%] md:w-[90%] py-[15px] px-[10px] md:pt-[25px] md:pb-[35px] rounded-[50px] md:rounded-[150px]">
        <div className="font-clash [word-spacing:6px] text-[1.8rem] md:text-[2.2rem] font-bold">Empowering innovation in quantitative finance</div>
        <h2 className="font-poppins font-thin text-[1.2rem] md:text-[1.5rem] tracking-[2.5px] [word-spacing:2px] mt-2">BY ProfNITT</h2>
        <div className="absolute -bottom-[40px] left-1/2 -translate-x-1/2 bg-[#C0B7E8] border-[8px] md:border-[10px] border-[#000000d7] w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full flex justify-center items-center p-1 md:p-[5px]">
          <span className="flex items-center justify-center w-[30px] md:w-[58px] md:mr-0 -mr-[15px]">
            <img src={down} alt="down" className="w-full" />
          </span>
        </div>
      </div>

      {/* How to Trade Section */}
      <div className="text-center w-full mx-auto flex flex-col items-center gap-[20px]">
        <div className='flex flex-col md:flex-row p-5 md:px-[83px] md:py-[20px] justify-between items-center md:items-start w-full'>
          <div className="w-full md:w-1/2 text-center md:text-left mb-5 md:mb-0">
            <div className="font-clash relative text-center md:text-left text-[2rem] md:text-[2.5rem] font-bold uppercase [word-spacing:10px]">HOW TO TRADE</div>
            <h2 className="font-poppins relative text-center md:text-left tracking-[4.2px] [word-spacing:1px] text-[1.5rem] md:text-[1.8rem] text-white mt-1.5 font-thin">WITH ProfNITT Tools?</h2>
            <div className="flex items-center justify-center md:justify-start mt-5 hover:translate-x-[5px] transition-transform duration-300">
                <button 
                  className="bg-gradient-to-r from-pn-purple to-pn-lavender px-5 py-3 rounded-[25px] text-[1rem] font-bold text-[#2a2734] transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90" 
                  onClick={handleClick}
                >
                  Explore Strategies
                </button>
                <span className="text-[2rem] ml-[15px] opacity-70 animate-goright scale-110">→</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 leading-relaxed text-center md:text-left font-poppins text-[1rem] md:text-[1.2rem]">
            Using ProfNITT tools is simple and intuitive. Start by exploring or uploading your quant
            strategies, then customize parameters for testing. Run your strategies in live markets
            and analyze detailed performance reports. Refine and optimize based on insights to
            enhance your trading outcomes.
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-[40px] md:gap-[130px] p-5 md:p-[40px] relative bg-[#343045] md:bg-[url('../assets/vector.png')] md:bg-[length:100%] bg-cover md:bg-no-repeat bg-center">
          <div className="text-center relative">
            <div className="bg-gradient-to-r from-[#5F5C8E] to-[#A6A1C6] text-[#2a2734] text-[2rem] md:text-[64px] font-bold w-[100px] h-[100px] md:w-[159px] md:h-[159px] rounded-full flex justify-center items-center border-[10px] md:border-[15px] border-[#0D0D0D] shadow-[0_0_10px_rgba(0,0,0,0.634)] relative z-10 mx-auto">01</div>
            <p className="font-poppins text-[1rem] md:text-[1.3rem] font-bold text-gray-100 mt-[10px]">Explore Strategies</p>
          </div>
          <div className="text-center relative">
            <div className="bg-gradient-to-r from-[#5F5C8E] to-[#A6A1C6] text-[#2a2734] text-[2rem] md:text-[64px] font-bold w-[100px] h-[100px] md:w-[159px] md:h-[159px] rounded-full flex justify-center items-center border-[10px] md:border-[15px] border-[#0D0D0D] shadow-[0_0_10px_rgba(0,0,0,0.634)] relative z-10 mx-auto">02</div>
            <p className="font-poppins text-[1rem] md:text-[1.3rem] font-bold text-gray-100 mt-[10px]">Set Parameters</p>
          </div>
          <div className="text-center relative">
            <div className="bg-gradient-to-r from-[#5F5C8E] to-[#A6A1C6] text-[#2a2734] text-[2rem] md:text-[64px] font-bold w-[100px] h-[100px] md:w-[159px] md:h-[159px] rounded-full flex justify-center items-center border-[10px] md:border-[15px] border-[#0D0D0D] shadow-[0_0_10px_rgba(0,0,0,0.634)] relative z-10 mx-auto">03</div>
            <p className="font-poppins text-[1rem] md:text-[1.3rem] font-bold text-gray-100 mt-[10px]">Test on Live Markets</p>
          </div>
          <div className="text-center relative">
            <div className="bg-gradient-to-r from-[#5F5C8E] to-[#A6A1C6] text-[#2a2734] text-[2rem] md:text-[64px] font-bold w-[100px] h-[100px] md:w-[159px] md:h-[159px] rounded-full flex justify-center items-center border-[10px] md:border-[15px] border-[#0D0D0D] shadow-[0_0_10px_rgba(0,0,0,0.634)] relative z-10 mx-auto">04</div>
            <p className="font-poppins text-[1rem] md:text-[1.3rem] font-bold text-gray-100 mt-[10px]">Analyze Results</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore