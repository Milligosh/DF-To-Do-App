/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS tasks(
    id VARCHAR PRIMARY KEY,
    task VARCHAR,
    userId VARCHAR NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    priority INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)