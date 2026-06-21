/**
 * Seed Admin Utility
 * 
 * Usage:
 *   node utils/seedAdmin.js
 * 
 * Uses environment variables:
 *   ADMIN_USERNAME (default: admin)
 *   ADMIN_EMAIL (default: admin@profnitt.com)  
 *   ADMIN_PASSWORD (required, or defaults to 'admin123')
 * 
 * Or pass as CLI args:
 *   node utils/seedAdmin.js --username admin --email admin@profnitt.com --password yourpassword
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function seedAdmin() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const getArg = (name) => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
  };

  const username = getArg('username') || process.env.ADMIN_USERNAME || 'admin';
  const email = getArg('email') || process.env.ADMIN_EMAIL || 'admin@profnitt.com';
  const password = getArg('password') || process.env.ADMIN_PASSWORD || 'admin123';

  try {
    // Check if admin already exists
    const existing = await pool.query('SELECT id FROM admins WHERE username = $1', [username]);

    const hashedPassword = await bcrypt.hash(password, 12);

    if (existing.rows.length > 0) {
      // Update existing admin
      await pool.query(
        'UPDATE admins SET email = $1, password = $2 WHERE username = $3',
        [email, hashedPassword, username]
      );
      console.log(`✅ Admin "${username}" password updated successfully.`);
    } else {
      // Create new admin
      await pool.query(
        'INSERT INTO admins (username, email, password) VALUES ($1, $2, $3)',
        [username, email, hashedPassword]
      );
      console.log(`✅ Admin "${username}" created successfully.`);
    }

    console.log(`   Username: ${username}`);
    console.log(`   Email:    ${email}`);
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedAdmin();
