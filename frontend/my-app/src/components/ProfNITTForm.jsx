import React, { useState } from "react";
import "../styles/ProfNITTForm.css";

const API_BASE = import.meta.env.VITE_API_BASE || 'https://tools-website-m58b.vercel.app';

const ProfNITTForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="explore" className="profnitt-form-container">
      {/* Header Section */}
      <div className="profnitt-form-header">
        <h1 className="profnitt-form-title">Join ProfNITT Tools Now!</h1>
        <h2 className="profnitt-form-subtitle">Let's Build Your Trading Strategy with ProfNITT Tools</h2>
      </div>

      {/* Status Message */}
      {status.message && (
        <div style={{
          textAlign: 'center',
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '15px',
          fontSize: '0.95rem',
          fontWeight: '500',
          backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: status.type === 'success' ? '#22c55e' : '#ef4444',
          border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}>
          {status.message}
        </div>
      )}

      {/* Form Section */}
      <form className="profnitt-form" onSubmit={handleSubmit}>
        <div className="profnitt-form-row">
          <input type="text" name="firstName" placeholder="First Name" className="profnitt-input" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="profnitt-input" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="profnitt-form-row">
          <input type="email" name="email" placeholder="Email" className="profnitt-input" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" className="profnitt-input" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="profnitt-form-row">
          <input type="text" name="subject" placeholder="Subject" className="profnitt-input" value={formData.subject} onChange={handleChange} />
        </div>
        <div className="profnitt-form-row">
          <textarea name="message" placeholder="Tell Us Something..." className="profnitt-textarea" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="profnitt-button" disabled={submitting}>
          {submitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfNITTForm;