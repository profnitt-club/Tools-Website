import React from 'react'
import "../styles/footer.css"

const Footer = () => {
  return (
    <div className="profnitt-form-footer">
        <div className="profnitt-footer-left">
          <p>© ProfNITT Tools 2024 Developed By: <span style={{ color: "#fa07c9", fontSize:"19px"}}>Divyansh Agrawal</span></p>
          <a href="#">Privacy policy</a>
          <a href="#">Cookies policy</a>
          
        </div>
        <div className="profnitt-footer-right">
          <p>Updates right to your Inbox</p>
          <div className="profnitt-subscribe">
            <input type="email" placeholder="Email Address" className="profnitt-subscribe-input" />
            <button className="profnitt-subscribe-button">Send</button>
          </div>
        </div>
      </div>
  )
}

export default Footer