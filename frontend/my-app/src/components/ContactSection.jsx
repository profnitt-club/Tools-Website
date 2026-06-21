import React from 'react'
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const ContactSection = () => {
    const loc="https://www.google.com/maps/dir/10.7663903,78.8248037/National+Institute+of+Technology+Tiruchirappalli,+Tanjore+Main+Road,+NH67,+near+BHEL,+Tiruchirappalli,+Tamil+Nadu+620015/@10.7660733,78.792123,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3baa8d47758e1ae1:0xb3e16389eeab05a!2m2!1d78.8132181!2d10.7589381?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D"
    return (
        <div className="font-sans flex flex-col lg:flex-row items-center justify-center w-[95%] lg:w-[90%] gap-[30px] md:gap-[40px] lg:gap-[60px] bg-[radial-gradient(circle,#3A3456,#211E2E)] p-[10px] sm:p-[15px] md:p-[25px] lg:p-[20px] rounded-[20px] md:rounded-[60px] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)] my-[20px] md:my-[30px] lg:my-[50px] mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-[10px] md:gap-[15px] text-center md:text-left cursor-pointer justify-start" onClick={() => window.location.href = loc}>
            <FaMapMarkerAlt className="text-[#b89af8] text-[30px] sm:text-[35px] md:text-[40px] lg:text-[45px]" />
            <div>
              <h3 className="text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] font-bold mb-[5px]">Location</h3>
              <p className="text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] opacity-80">ProfNITT Club NIT Trichy, Tamil Nadu, India</p>
            </div>
          </div>
    
          <div className="hidden lg:block lg:w-[1px] lg:h-[40px] md:block md:w-[80%] md:h-[1px] bg-white/20"></div>
    
          <div className="flex flex-col md:flex-row items-center gap-[10px] md:gap-[15px] text-center md:text-left cursor-pointer justify-start" onClick={() => window.open("https://profnitt.in", "_blank")}>
            <TbWorldWww className="text-[#b89af8] text-[30px] sm:text-[35px] md:text-[40px] lg:text-[45px]" />
            <div>
              <div className="text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] font-bold">VISIT OUR WEBSITE</div>
            </div>
          </div>
    
          <div className="hidden lg:block lg:w-[1px] lg:h-[40px] md:block md:w-[80%] md:h-[1px] bg-white/20"></div>
    
          <div className="flex flex-col md:flex-row items-center gap-[10px] md:gap-[15px] text-center md:text-left cursor-pointer justify-start" onClick={() => window.location.href = "mailto:tools@profnitt.com"}>
            <FaEnvelope className="text-[#b89af8] text-[30px] sm:text-[35px] md:text-[40px] lg:text-[45px]" />
            <div>
              <h3 className="text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] font-bold mb-[5px]">Send Us a Message</h3>
              <p className="text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] opacity-80">Contact@profnitt.com</p>
            </div>
          </div>
        </div>
      );
}

export default ContactSection