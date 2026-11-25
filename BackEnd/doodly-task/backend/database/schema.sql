PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, color TEXT NOT NULL DEFAULT '#F5C86A', icon TEXT DEFAULT '✎', is_default INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 150), description TEXT DEFAULT '' CHECK(length(description)<=2000), category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT, priority TEXT NOT NULL DEFAULT 'medium' CHECK(priority IN ('low','medium','high')), due_date TEXT, due_time TEXT, status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','completed')), completed_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS mascot_settings (id INTEGER PRIMARY KEY CHECK(id=1), body_color TEXT NOT NULL DEFAULT '#F3C28E', headwear TEXT NOT NULL DEFAULT 'none', accessory TEXT NOT NULL DEFAULT 'none', expression TEXT NOT NULL DEFAULT 'happy', updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS app_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
