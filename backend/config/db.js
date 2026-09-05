const { neon } = require('@neondatabase/serverless');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const https = require('https');

// Prefer the Neon connection string from .env, but keep DATABASE_URL compatibility.
const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';
process.env.DATABASE_URL = connectionString;

// Ensure fetch falls back to IPv4 if native fetch fails/times out on IPv6 DNS routes
if (typeof globalThis.fetch === 'function' && !globalThis._ipv4FetchApplied) {
  globalThis._ipv4FetchApplied = true;
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = function (url, options = {}) {
    return nativeFetch(url, options).catch((err) => {
      if (err && (err.name === 'TypeError' || err.message?.includes('fetch failed'))) {
        return new Promise((resolve, reject) => {
          try {
            const u = new URL(url);
            const headers = {};
            if (options.headers) {
              if (typeof options.headers.forEach === 'function') {
                options.headers.forEach((v, k) => headers[k] = v);
              } else {
                Object.assign(headers, options.headers);
              }
            }
            const req = https.request({
              hostname: u.hostname,
              port: u.port || (u.protocol === 'https:' ? 443 : 80),
              path: u.pathname + u.search,
              method: options.method || 'GET',
              headers,
              family: 4
            }, (res) => {
              let body = '';
              res.on('data', chunk => body += chunk);
              res.on('end', () => {
                resolve({
                  ok: res.statusCode >= 200 && res.statusCode < 300,
                  status: res.statusCode,
                  statusText: res.statusMessage,
                  text: () => Promise.resolve(body),
                  json: () => Promise.resolve(JSON.parse(body)),
                  headers: new Map(Object.entries(res.headers))
                });
              });
            });
            req.on('error', reject);
            if (options.body) req.write(options.body);
            req.end();
          } catch (fallbackErr) {
            reject(err);
          }
        });
      }
      throw err;
    });
  };
}

// Initialize Neon serverless client
const sql = neon(connectionString);

// No pool wrapper — use Neon `sql` directly.

/**
 * Initialize all required database tables.
 * Safe to call multiple times — uses IF NOT EXISTS.
 */
async function initDB() {
  try {
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
        reset_password_token VARCHAR(255),
        reset_password_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Ensure reset password columns exist for existing tables
    await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(255);`;
    await sql`ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_password_expires TIMESTAMP;`;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        type VARCHAR(50) DEFAULT 'tool',
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
        live_link TEXT,
        thumbnail VARCHAR(500),
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Ensure type column exists and categorize 5 Min XAUUSD and IPO Breakout as strategies
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'tool';`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_link TEXT;`;
    await sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;`;
    await sql`UPDATE projects SET type = 'strategy' WHERE title ILIKE '%strategy%' OR title ILIKE '%xauusd%' OR title ILIKE '%ipo breakout%';`;
    await sql`UPDATE projects SET type = 'tool' WHERE type IS NULL OR (type != 'strategy' AND title NOT ILIKE '%strategy%' AND title NOT ILIKE '%xauusd%' AND title NOT ILIKE '%ipo breakout%');`;


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

    console.log('Database tables initialized successfully');
  } catch (err) {
    console.error('Error initializing database tables:', err.message);
  }
}

let dbInitialized = false;

async function ensureDBInitialized() {
  if (dbInitialized) return;
  try {
    await initDB();
    dbInitialized = true;
  } catch (err) {
    console.error('Lazy initDB failed:', err.message);
  }
}

module.exports = { initDB, ensureDBInitialized, sql };
