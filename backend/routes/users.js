const express = require("express");
const jwt = require("jsonwebtoken");
const { listUsers } = require("../models/User");

const router = express.Router();

// Middleware JWT بسيط
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
}

router.get("/", auth, async (_req, res) => {
  try {
    const users = await listUsers();
    res.json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
