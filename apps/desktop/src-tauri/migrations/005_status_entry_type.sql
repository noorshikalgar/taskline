-- Recreate work_log_entries to widen the entry_type CHECK constraint to allow
-- status-change timeline entries.
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

CREATE TABLE work_log_entries_new (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL REFERENCES tasks(id),
  entry_type TEXT NOT NULL
    CHECK(entry_type IN ('note', 'progress', 'finding', 'blocker', 'decision', 'next_step', 'worklog', 'status')),
  content_markdown TEXT NOT NULL CHECK(length(trim(content_markdown)) > 0),
  visibility TEXT NOT NULL DEFAULT 'private'
    CHECK(visibility IN ('private', 'report')),
  occurred_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  duration_minutes INTEGER,
  deleted_at TEXT
);

INSERT INTO work_log_entries_new
  (id, task_id, entry_type, content_markdown, visibility,
   occurred_at, created_at, updated_at, duration_minutes, deleted_at)
  SELECT id, task_id, entry_type, content_markdown, visibility,
         occurred_at, created_at, updated_at, duration_minutes, deleted_at
  FROM work_log_entries;

DROP TABLE work_log_entries;
ALTER TABLE work_log_entries_new RENAME TO work_log_entries;
CREATE INDEX IF NOT EXISTS idx_entries_task_timeline
  ON work_log_entries(task_id, deleted_at, occurred_at DESC, id DESC);

INSERT OR REPLACE INTO schema_meta (key, value) VALUES ('schema_version', '5');

COMMIT;
PRAGMA foreign_keys = ON;
