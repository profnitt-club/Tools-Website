const express = require('express');
const { pool } = require('../config/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/contacts
 * Public — submit a contact form.
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'First name, email, and message are required.' });
    }

    const result = await pool.query(
      `INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [firstName, lastName, email, phone, subject, message]
    );

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

/**
 * GET /api/contacts
 * Admin — list all contact submissions.
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
});

/**
 * PATCH /api/contacts/:id/read
 * Admin — mark a contact as read.
 */
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE contacts SET is_read = true WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error marking contact as read:', err);
    res.status(500).json({ error: 'Failed to update contact.' });
  }
});

/**
 * DELETE /api/contacts/:id
 * Admin — delete a contact submission.
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
});

module.exports = router;
