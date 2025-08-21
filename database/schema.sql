CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



-- CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Users exists already (ensure pgcrypto or uuid gen accordingly)

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- e.g. "echoes-of-the-abyss"
  title TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'PC', -- PC/Console/Web
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Link table: which user is connected to which game
CREATE TABLE IF NOT EXISTS user_games (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id BIGINT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);
