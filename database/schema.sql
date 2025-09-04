CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
