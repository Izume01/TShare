CREATE TABLE IF NOT EXISTS transfers (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  peer_id TEXT,
  total_chunks INTEGER,
  received_chunks INTEGER,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS peers (
  peer_id TEXT PRIMARY KEY,
  ip TEXT,
  port INTEGER,
  last_seen DATETIME
);
