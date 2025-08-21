const { pool } = require("../config/database");

async function listGames(){
  const { rows } = await pool.query("SELECT id, slug, title, platform, created_at FROM games ORDER BY id ASC");
  return rows;
}
async function findGameBySlug(slug){
  const { rows } = await pool.query("SELECT * FROM games WHERE slug=$1 LIMIT 1", [slug]);
  return rows[0] || null;
}
module.exports = { listGames, findGameBySlug };
