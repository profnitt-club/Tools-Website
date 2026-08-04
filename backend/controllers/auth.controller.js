const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sql } = require('../config/db');
const { sendPasswordResetEmail } = require('../services/email.service');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const admins = await sql`SELECT * FROM admins WHERE username = ${username} OR email = ${username}`;

    if (admins.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

const getMe = async (req, res) => {
  try {
    const rows = await sql`SELECT id, username, email, created_at FROM admins WHERE id = ${req.admin.id}`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Auth me error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const searchInput = email.trim().toLowerCase();
    const rows = await sql`SELECT * FROM admins WHERE LOWER(email) = ${searchInput} OR LOWER(username) = ${searchInput}`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No admin account found with that email or username.' });
    }

    const admin = rows[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await sql`
      UPDATE admins 
      SET reset_password_token = ${resetToken}, reset_password_expires = ${expires}
      WHERE id = ${admin.id}
    `;

    const clientBase = process.env.CLIENT_URL || 'https://tools-website-sigma.vercel.app';
    const resetUrl = `${clientBase}/#/admin/reset-password?token=${resetToken}`;

    const mailResult = await sendPasswordResetEmail({
      to: admin.email || 'profnitt.club@gmail.com',
      resetUrl,
    });

    if (!mailResult.success) {
      return res.status(500).json({ error: 'Failed to dispatch password reset email.' });
    }

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error during password reset request.' });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ valid: false, error: 'Token is required.' });
    }

    const rows = await sql`
      SELECT id, username, email 
      FROM admins 
      WHERE reset_password_token = ${token} AND reset_password_expires > NOW()
    `;

    if (rows.length === 0) {
      return res.status(400).json({ valid: false, error: 'Token is invalid or has expired.' });
    }

    res.json({ valid: true, admin: { username: rows[0].username, email: rows[0].email } });
  } catch (err) {
    console.error('Verify reset token error:', err);
    res.status(500).json({ valid: false, error: 'Server error verifying token.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const rows = await sql`
      SELECT * FROM admins 
      WHERE reset_password_token = ${token} AND reset_password_expires > NOW()
    `;

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired password reset token.' });
    }

    const admin = rows[0];
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await sql`
      UPDATE admins 
      SET password = ${hashedPassword}, reset_password_token = NULL, reset_password_expires = NULL 
      WHERE id = ${admin.id}
    `;

    res.json({ message: 'Password updated successfully! You can now log in.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error updating password.' });
  }
};

module.exports = {
  login,
  getMe,
  forgotPassword,
  verifyResetToken,
  resetPassword,
};
