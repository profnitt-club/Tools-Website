import React from "react";
import "../styles/ProfNITTForm.css";

const ProfNITTForm = () => {
  return (
    <div id="explore" className="profnitt-form-container">
      {/* Header Section */}
      <div className="profnitt-form-header">
        <h1 className="profnitt-form-title">Join ProfNITT Tools Now!</h1>
        <h2 className="profnitt-form-subtitle">Let’s Build Your Trading Strategy with ProfNITT Tools</h2>
      </div>

      {/* Form Section */}
      <form className="profnitt-form">
        <div className="profnitt-form-row">
          <input type="text" placeholder="First Name" className="profnitt-input" />
          <input type="text" placeholder="Last Name" className="profnitt-input" />
        </div>
        <div className="profnitt-form-row">
          <input type="email" placeholder="Email" className="profnitt-input" />
          <input type="tel" placeholder="Phone Number" className="profnitt-input" />
        </div>
        <div className="profnitt-form-row">
          <input type="text" placeholder="Subject" className="profnitt-input" />
        </div>
        <div className="profnitt-form-row">
          <textarea placeholder="Tell Us Something..." className="profnitt-textarea"></textarea>
        </div>
        <button type="submit" className="profnitt-button">Submit</button>
      </form>
    </div>
  );
};

export default ProfNITTForm;