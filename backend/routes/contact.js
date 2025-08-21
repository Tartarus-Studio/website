const express = require("express");
const { z } = require("zod");
const { createContact } = require("../models/Contact");

const router = express.Router();

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(5).max(5000)
});

router.post("/", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", issues: parsed.error.issues });
    }
    const saved = await createContact(parsed.data);
    res.status(201).json({ ok: true, contact: saved });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
