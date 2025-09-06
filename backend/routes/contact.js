const express = require("express");
const { z } = require("zod");
const nodemailer = require("nodemailer");

const router = express.Router();

const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  subject: z.string().min(2).max(120),
  message: z.string().min(10).max(5000),
  budget: z.string().max(80).optional().nullable(),
  timeline: z.string().max(80).optional().nullable(),
  website: z.string().optional().nullable() // honeypot
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

router.post("/", async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid payload" });
    const data = parsed.data;
    if (data.website) return res.json({ ok: true }); // bot trapped

    // Send mail
    const info = await transporter.sendMail({
      from: `"Tartarus Web" <${process.env.SMTP_USER}>`,
      to: process.env.STUDIO_MAIL_TO,
      subject: `Oracle: ${data.subject}`,
      replyTo: `${data.name} <${data.email}>`,
      text:
`From: ${data.name} <${data.email}>
Budget: ${data.budget || "-"}  Timeline: ${data.timeline || "-"}

${data.message}`,
      html:
`<p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
<p><strong>Budget:</strong> ${data.budget || "-"} &nbsp; | &nbsp; <strong>Timeline:</strong> ${data.timeline || "-"}</p>
<p style="white-space:pre-line">${data.message}</p>`
    });

    res.status(201).json({ ok: true, id: info.messageId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
