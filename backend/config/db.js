const { neon } = require('@neondatabase/serverless');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Prefer the Neon connection string from .env, but keep DATABASE_URL compatibility.
const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';
process.env.DATABASE_URL = connectionString;

const hasLocalDatabaseUrl = /localhost|127\.0\.0\.1/.test(connectionString);

// Initialize Neon serverless client
const sql = neon(connectionString);

// No pool wrapper — use Neon `sql` directly.

/**
 * Initialize all required database tables.
 * Safe to call multiple times — uses IF NOT EXISTS.
 */
async function initDB() {
  try {
    await sql`BEGIN`;

    // Existing tables (news, insights, indices) are assumed to exist
    // from the original setup. We create them here too for safety.
    await sql`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT,
        article TEXT,
        source TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS insights (
        id SERIAL PRIMARY KEY,
        stock_or_sector TEXT,
        insight TEXT,
        sentiment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS indices (
        id SERIAL PRIMARY KEY,
        name TEXT,
        symbol TEXT,
        price NUMERIC,
        change NUMERIC,
        percent_change NUMERIC,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // New tables
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255),
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        created_time VARCHAR(100),
        tags TEXT[] DEFAULT '{}',
        trades VARCHAR(100),
        drawdown VARCHAR(100),
        min_capital VARCHAR(100),
        win_rate VARCHAR(100),
        returns VARCHAR(100),
        monthly_fee VARCHAR(100),
        contributors TEXT[] DEFAULT '{}',
        params JSONB DEFAULT '[]',
        video TEXT,
        gitlink TEXT,
        thumbnail VARCHAR(500),
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(200),
        last_name VARCHAR(200),
        email VARCHAR(300),
        phone VARCHAR(50),
        subject VARCHAR(500),
        message TEXT,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`COMMIT`;
    console.log('Database tables initialized successfully');
  } catch (err) {
    await sql`ROLLBACK`;
    console.error('Error initializing database tables:', err.message);
  }
}

module.exports = { initDB, sql };
