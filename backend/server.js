require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const contactRoutes = require("./routes/contact");
const { pool } = require("./config/database");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const gamesRoutes = require("./routes/games");

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(compression());
app.use(morgan("dev"));
app.use("/api/contact", contactRoutes);
app.use("/api/games", gamesRoutes);
// صحة السيرفر والقاعدة
app.get("/api/health", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, dbNow: rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, error: "db connection failed" });
  }
});

// Auth & Users
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
