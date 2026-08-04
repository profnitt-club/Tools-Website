const { Resend } = require('resend');

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Send Password Reset Email via Resend API
 * @param {Object} options
 * @param {string} options.to - Admin recipient email address
 * @param {string} options.resetUrl - Full password reset URL
 */
async function sendPasswordResetEmail({ to, resetUrl }) {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY is not set. Skipping email dispatch.');
    return { success: false, error: 'Email service disabled' };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password - ProfNITT Tools</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b071a; color: #ffffff; margin: 0; padding: 40px 20px; }
        .container { max-width: 550px; margin: 0 auto; background: #130d2a; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; }
        .header p { color: #a1a1aa; font-size: 14px; margin-top: 5px; }
        .content { font-size: 15px; line-height: 1.6; color: #d4d4d8; margin-bottom: 30px; }
        .btn-container { text-align: center; margin: 35px 0; }
        .btn { background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); color: #0b071a !important; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; display: inline-block; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); }
        .url-box { background-color: #0b071a; border: 1px solid rgba(168, 85, 247, 0.2); padding: 12px; border-radius: 8px; font-size: 12px; word-break: break-all; color: #a855f7; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #71717a; border-t: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ProfNITT Tools Admin</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <p>Hello Admin,</p>
          <p>We received a request to reset the password for your ProfNITT Tools Admin account (<strong>${to}</strong>).</p>
          <p>Click the button below to reset your password. This link is valid for <strong>1 hour</strong>.</p>
          <div class="btn-container">
            <a href="${resetUrl}" target="_blank" class="btn">Reset Password</a>
          </div>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          <div class="url-box">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #a855f7;">${resetUrl}</a>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ProfNITT Tools. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ProfNITT Admin <onboarding@resend.dev>',
      to: [to],
      subject: '🔑 Reset Your Password - ProfNITT Tools Admin',
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
      return { success: false, error };
    }

    console.log('✅ Password reset email dispatched via Resend:', data.id);
    return { success: true, data };
  } catch (err) {
    console.error('❌ Exception sending email via Resend:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = {
  sendPasswordResetEmail,
};
