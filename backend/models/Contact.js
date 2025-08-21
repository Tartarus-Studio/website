const { pool } = require("../config/database");

async function createContact({ name, email, message }) {
  const { rows } = await pool.query(
    `INSERT INTO contacts (name, email, message)
     VALUES ($1,$2,$3) RETURNING id, name, email, message, created_at`,
    [name, email, message]
  );
  return rows[0];
}

module.exports = { createContact };
