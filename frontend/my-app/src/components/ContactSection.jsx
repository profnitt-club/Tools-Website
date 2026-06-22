import React from 'react'
import "../styles/ContactSection.css";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const ContactSection = () => {
    const loc="https://www.google.com/maps/dir/10.7663903,78.8248037/National+Institute+of+Technology+Tiruchirappalli,+Tanjore+Main+Road,+NH67,+near+BHEL,+Tiruchirappalli,+Tamil+Nadu+620015/@10.7660733,78.792123,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3baa8d47758e1ae1:0xb3e16389eeab05a!2m2!1d78.8132181!2d10.7589381?entry=ttu&g_ep=EgoyMDI1MDEyNy4wIKXMDSoASAFQAw%3D%3D"
    return (
        <div className="contact-container">
          <div className="contact-item" onClick={() => window.location.href = loc}>
            <FaMapMarkerAlt className="icon" />
            <div>
              <h3>Location</h3>
              <p>ProfNITT Club NIT Trichy, Tamil Nadu, India</p>
            </div>
          </div>
    
          <div className="divider"></div>
    
          <div className="contact-item" onClick={() => window.open("https://profnitt.in", "_blank")}>
            <TbWorldWww className="icon" />
            <div>
              <div className='heading'>VISIT OUR WEBSITE</div>
            </div>
          </div>
    
          <div className="divider"></div>
    
          <div className="contact-item" onClick={() => window.location.href = "mailto:tools@profnitt.com"}>
            <FaEnvelope className="icon" />
            <div>
              <h3>Send Us a Message</h3>
              <p>Contact@profnitt.com</p>
            </div>
          </div>
        </div>
      );
}

export default ContactSection