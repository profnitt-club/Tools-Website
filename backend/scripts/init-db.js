// One-shot DB initializer. Run: node scripts/init-db.js
const { initDB } = require('../config/db');

initDB()
  .then(() => {
    console.log('initDB completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('initDB failed:', err);
    process.exit(1);
  });
