const { pool } = require("../config/database");

async function findByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1 LIMIT 1", [email]);
  return rows[0] || null;
}

async function createUser({ email, passwordHash, name }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, name, created_at`,
    [email, passwordHash, name || null]
  );
  return rows[0];
}

async function listUsers(limit = 50) {
  const { rows } = await pool.query("SELECT id, email, name, created_at FROM users ORDER BY created_at DESC LIMIT $1", [limit]);
  return rows;
}

module.exports = { findByEmail, createUser, listUsers };
