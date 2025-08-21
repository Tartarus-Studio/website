const express = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { listGames, findGameBySlug } = require("../models/Game");
const { linkUserToGame, listLinkedGames } = require("../models/UserGame");

const router = express.Router();

// Auth middleware (reuse from users.js if exported), kept inline here:
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

// GET /api/games - list catalog
router.get("/", async (_req, res) => {
  const games = await listGames();
  res.json({ games });
});

// GET /api/games/me - list my linked games
router.get("/me", auth, async (req, res) => {
  const out = await listLinkedGames(req.user.sub);
  res.json({ games: out });
});

// POST /api/games/link - connect my account to a game by slug
router.post("/link", auth, async (req, res) => {
  const Body = z.object({ slug: z.string().min(2).max(120) });
  const parsed = Body.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid payload" });

  const game = await findGameBySlug(parsed.data.slug);
  if (!game) return res.status(404).json({ error: "game not found" });

  const linked = await linkUserToGame(req.user.sub, game.id);
  res.status(201).json({ ok: true, link: linked });
});

module.exports = router;
