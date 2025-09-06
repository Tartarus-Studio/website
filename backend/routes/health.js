const express = require("express");
const router = express.Router();

router.get("/", async (_req, res) => {
  try { 
    res.json({ ok: true, now: new Date().toISOString(), status: "healthy" }); 
  }
  catch { 
    res.status(500).json({ ok: false }); 
  }
});

module.exports = router;
