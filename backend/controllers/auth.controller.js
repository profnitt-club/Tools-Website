const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql } = require('../config/db');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const admins = await sql`SELECT * FROM admins WHERE username = ${username}`;

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

module.exports = {
  login,
  getMe,
};
