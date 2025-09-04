require("dotenv").config();
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

/* ───────── security & basics ───────── */
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const allow = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);
app.use(cors({ origin: allow.length ? allow : true }));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "256kb" }));

/* ───────── routes ───────── */
app.use("/api/health", require("./routes/health"));
app.use("/api/public", require("./routes/public"));

// rate-limit contact only
const limiter = rateLimit({ windowMs: 60_000, max: 30 });
app.use("/api/contact", limiter, require("./routes/contact"));

/* ───────── static frontend (SAFE FOR WINDOWS) ───────── */
const FRONTEND_DIR = path.resolve(__dirname, "..", "frontend");

// NEVER pass a filesystem path as the first arg to app.use()
// This route prefix "/" avoids path-to-regexp parsing the Windows path.
app.use("/", express.static(FRONTEND_DIR, { index: false }));

// Send index.html for any non-API request
app.get(/^\/(?!api\/).*/, (_req, res) =>
  res.sendFile(path.join(FRONTEND_DIR, "index.html"))
);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`[tartarus] listening on :${port}`));
