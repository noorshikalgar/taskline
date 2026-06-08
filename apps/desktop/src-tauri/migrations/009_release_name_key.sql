-- Migration 009 is handled in Rust (see `migrate_releases_to_name_key`).
-- This file is intentionally a no-op so the migration numbering stays
-- consistent, but all the actual work happens in code where we can
-- inspect the schema and run a transaction with proper error handling.
SELECT 1;
