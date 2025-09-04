const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
router.get("/", async (_req, res) => {
  try { const { rows } = await pool.query("SELECT NOW() now"); res.json({ ok: true, now: rows[0].now }); }
  catch { res.status(500).json({ ok: false }); }
});
module.exports = router;
