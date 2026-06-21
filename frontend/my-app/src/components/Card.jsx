import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, createdTime, description, tags, trades, drawdown, minCapital, winRate, returns, monthlyFee, contributors, params, video, gitlink }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id) {
      navigate(`/projects/${id}`);
    } else {
      // Fallback for hardcoded data without DB id
      navigate(`/card-details`, {
        state: { title, createdTime, description, tags, trades, drawdown, minCapital, winRate, contributors, params, video, gitlink }
      });
    }
  };
  return (
    <div className="bg-pn-card rounded-[25px] md:rounded-[40px] p-[25px_20px] md:p-[40px] mb-[30px] md:mb-[20px] border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] text-white transition-all duration-300 ease-in-out">
      <div className="mb-2.5">
        <div className="flex flex-col md:flex-row justify-between md:items-start text-[14px] md:text-[16px] text-[#b3b3b3] flex-wrap mb-2.5 md:mb-0">
          created: {createdTime}
          <div className="flex justify-center mt-5 md:mt-0 w-full md:w-auto">
            <button className="bg-gradient-to-r from-pn-purple to-pn-lavender text-black border-none rounded-[30px] px-4 py-3 md:px-[24px] md:py-[14px] text-[0.9rem] sm:text-[0.95rem] md:text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out w-full md:max-w-[220px] text-center mt-0 md:-mt-[30%] hover:scale-105 hover:opacity-90" onClick={handleClick}>Explore</button>
          </div>
        </div>
        
        <h2 className="font-sans text-[22px] sm:text-[24px] md:text-[30px] font-bold text-white my-2.5">{title}</h2>
      </div>
      <p className="font-sans text-[15px] sm:text-[16px] md:text-[18px] my-2.5 mb-5 leading-relaxed">{description} </p>
      <p className="text-[13px] md:text-[14px] mb-2.5">by: <a href="" className="text-[#3abdfe] no-underline">ProfNITT</a></p>
      <div className="flex flex-wrap gap-[6px] md:gap-2 justify-start mb-5">
        {(tags || []).map((tag, index) => (
          <span key={index} className="bg-pn-tag px-[10px] py-[5px] md:px-[12px] md:py-[6px] rounded-[20px] text-[11px] md:text-[12px]">{tag}</span>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between flex-wrap gap-2.5 md:gap-5 mb-[15px] pt-2.5 md:pt-0">
        <div>
          <p className="font-poppins font-bold text-[15px] md:text-[19px] text-[#b3b3b3]">Winrate</p>
          <p className="font-poppins font-bold text-[15px] md:text-[18px] text-white">{winRate}</p>
        </div>
        <div>
          <p className="font-poppins font-bold text-[15px] md:text-[19px] text-[#b3b3b3]">Drawdown</p>
          <p className="font-poppins font-bold text-[15px] md:text-[18px] text-white">{drawdown}</p>
        </div>
        <div>
          <p className="font-poppins font-bold text-[15px] md:text-[19px] text-[#b3b3b3]">Min Capital</p>
          <p className="font-poppins font-bold text-[15px] md:text-[18px] text-white">{minCapital}</p>
        </div>

        <div>
          <p className="font-poppins font-bold text-[15px] md:text-[19px] text-[#b3b3b3]">Returns</p>
          <p className="font-poppins font-bold text-[15px] md:text-[18px] text-white">{returns}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
