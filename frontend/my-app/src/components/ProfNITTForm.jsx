import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || '';

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
    <div id="explore" className="font-poppins text-white bg-[radial-gradient(circle,#403A5F,#211E2E)] p-[25px_15px] md:p-[30px_20px] lg:p-[40px_30px] xl:p-[40px_50px] rounded-[30px] md:rounded-[50px] lg:rounded-[70px] xl:rounded-[100px] border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] my-5 mx-auto w-[95%] md:w-[90%] lg:w-[85%] xl:w-[70%] max-w-[800px] h-auto box-border">
      {/* Header Section */}
      <div className="font-clash text-center mb-[30px]">
        <h1 className="text-[1.5rem] md:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.5rem] [word-spacing:6px] font-semibold mb-2.5">Join ProfNITT Tools Now!</h1>
        <h2 className="text-[0.95rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.38rem] font-light">Let's Build Your Trading Strategy with ProfNITT Tools</h2>
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
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-[15px]">
          <input type="text" name="firstName" placeholder="First Name" className="flex-1 min-w-[100%] md:min-w-[45%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[50px] box-border" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="flex-1 min-w-[100%] md:min-w-[45%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[50px] box-border" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="flex flex-wrap gap-[15px]">
          <input type="email" name="email" placeholder="Email" className="flex-1 min-w-[100%] md:min-w-[45%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[50px] box-border" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" className="flex-1 min-w-[100%] md:min-w-[45%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[50px] box-border" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="flex flex-wrap gap-[15px]">
          <input type="text" name="subject" placeholder="Subject" className="flex-1 min-w-[100%] md:min-w-[45%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[50px] box-border" value={formData.subject} onChange={handleChange} />
        </div>
        <div className="flex flex-wrap gap-[15px]">
          <textarea name="message" placeholder="Tell Us Something..." className="flex-1 min-w-[100%] bg-[#2c2c3c] rounded-[30px] border border-gray-100 px-[18px] py-[12px] text-white text-[16px] outline-none h-[100px] resize-none box-border" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="mt-[2%] bg-gradient-to-r from-pn-purple to-pn-lavender w-full sm:w-[100%] md:w-[80%] lg:w-[50%] max-w-[250px] self-center text-black border-none rounded-[30px] px-5 py-3 text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed" disabled={submitting}>
          {submitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ProfNITTForm;