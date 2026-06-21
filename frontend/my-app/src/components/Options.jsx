import React from 'react'
import { useNavigate } from 'react-router-dom'
import liveMarket from "../assets/liveMarket.png"
import metrics from "../assets/metrics.png"
import capital from "../assets/capital.png"
import userFriendly from "../assets/user-friendly.png"

const Options = () => {
    const features = [
        {
          title: "Live Market Testing",
          description:
            "Experiment with advanced quant strategies directly on live markets to see real-time results.",
          image: liveMarket,
        },
        {
          title: "Capital Insights",
          description:
            "Understand the capital needed for each strategy, tailored for smarter financial planning.",
          image: capital,
        },
        {
          title: "Performance Metrics",
          description:
            "Access comprehensive reports to evaluate strategy performance and optimize outcomes.",
          image: metrics,
        },
        {
          title: "User-Friendly Interface",
          description:
            "Enjoy a seamless, intuitive platform designed for both beginners and experts in finance.",
          image: userFriendly,
        },
      ];

      const navigate = useNavigate();

      const handleClick = () => {
        navigate(`/strategies`);
      };
    
      return (
        <div id="services" className="bg-[#343045] text-white py-10 px-5 font-sans text-center bg-[url('../assets/vector4.png')] bg-bottom bg-no-repeat bg-[length:2500px_800px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-10">
              <h1 className="font-clash text-[2.7rem] font-bold m-0">What You Get With</h1>
              <h2 className="font-poppins font-thin text-[2rem] text-white my-2.5">ProfNITT Tools?</h2>
              <p className="font-poppins text-[1.1rem] leading-relaxed text-gray-100 max-w-[800px] my-5 mx-auto">
                With ProfNITT tools, you gain access to powerful quantitative finance strategies that
                you can test on live markets. Our platform provides detailed insights, including
                performance metrics and capital requirements, helping you make informed decisions.
                Whether you're an aspiring quant or a seasoned investor, ProfNITT tools empower you to
                explore, analyze, and optimize trading strategies with ease.
              </p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-5">
              {features.map((feature, index) => (
                <div key={index} className="bg-[radial-gradient(circle,#3e3c63,#262230)] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] p-5 text-center transition-all duration-300 h-auto hover:-translate-y-2.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex flex-col items-center">
                  <div className="mb-5">
                    <img src={feature.image} alt={feature.title} className="w-[150px] h-[150px] object-contain rounded-full bg-[#2c2b4a] p-2.5" />
                  </div>
                  <h3 className="font-poppins text-[1.3rem] font-bold my-4">{feature.title}</h3>
                  <p className="font-poppins text-[1rem] leading-relaxed text-gray-100 mb-5">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="mt-[3%] bg-gradient-to-r from-pn-purple to-pn-lavender w-[80%] md:w-[200px] text-black border-none rounded-[30px] px-4 py-3 md:px-[18px] md:py-[14px] text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105" 
            onClick={handleClick}
          >
            TRY IT NOW
          </button>
        </div>
      );
}

export default Options