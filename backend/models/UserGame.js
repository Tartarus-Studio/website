const { pool } = require("../config/database");

async function linkUserToGame(userId, gameId){
  const { rows } = await pool.query(
    `INSERT INTO user_games (user_id, game_id)
     VALUES ($1,$2)
     ON CONFLICT (user_id, game_id) DO UPDATE SET connected_at = NOW()
     RETURNING id, user_id, game_id, connected_at`,
    [userId, gameId]
  );
  return rows[0];
}

async function listLinkedGames(userId){
  const { rows } = await pool.query(
    `SELECT g.id, g.slug, g.title, g.platform, ug.connected_at
     FROM user_games ug
     JOIN games g ON g.id = ug.game_id
     WHERE ug.user_id = $1
     ORDER BY ug.connected_at DESC`,
    [userId]
  );
  return rows;
}

module.exports = { linkUserToGame, listLinkedGames };
