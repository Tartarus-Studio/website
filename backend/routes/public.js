const express = require("express");
const router = express.Router();

const lastSegment = (url="") =>
  url.replace(/^https?:\/\/(www\.)?/,"").replace(/\/+$/,"").split("/").pop() || "";

router.get("/", (_req, res) => {
  const social = {
    x: process.env.SOCIAL_X || "",
    discord: process.env.SOCIAL_DISCORD || "",
    youtube: process.env.SOCIAL_YT || "",
    github: process.env.SOCIAL_GH || ""
  };
  const usernames = {
    x: process.env.SOCIAL_X_USER || lastSegment(social.x),
    discord: process.env.SOCIAL_DISCORD_USER || lastSegment(social.discord),
    youtube: process.env.SOCIAL_YT_USER || lastSegment(social.youtube),
    github: process.env.SOCIAL_GH_USER || lastSegment(social.github)
  };
  res.json({ studioEmail: process.env.STUDIO_MAIL_TO || "studio@example.com", social, usernames });
});

module.exports = router;
