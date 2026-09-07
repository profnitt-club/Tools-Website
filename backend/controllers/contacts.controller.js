const { sql } = require('../config/db');
const { sendWelcomeEmail } = require('../services/email.service');

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ error: 'First name, email, and message are required.' });
    }

    // If using the local dummy URL, skip DB insertion to allow local email testing
    if (process.env.NEON_DATABASE_URL && !process.env.NEON_DATABASE_URL.includes('host/neondb')) {
      await sql`
        INSERT INTO contacts (first_name, last_name, email, phone, message)
        VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${message})
        RETURNING *;
      `;
    } else {
      console.warn("⚠️ Skipping DB insertion because NEON_DATABASE_URL is a dummy template.");
    }

    // Await the email dispatch so Vercel Serverless doesn't freeze the function before it finishes
    await sendWelcomeEmail(email, firstName).catch(err => console.error('Failed to send welcome email:', err));

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};

const getContacts = async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM contacts ORDER BY created_at DESC`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
};

const markRead = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await sql`UPDATE contacts SET is_read = true WHERE id = ${id} RETURNING *`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error marking contact as read:', err);
    res.status(500).json({ error: 'Failed to update contact.' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await sql`DELETE FROM contacts WHERE id = ${id} RETURNING id`;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    res.json({ message: 'Contact deleted successfully.' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
};

module.exports = {
  createContact,
  getContacts,
  markRead,
  deleteContact,
};
