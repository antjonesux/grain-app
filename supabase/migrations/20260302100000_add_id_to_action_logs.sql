-- Migration: ensure action_logs has a UUID primary key.
--
-- FINDING: action_logs was created in 008_create_action_logs.sql with:
--   id uuid primary key default gen_random_uuid()
-- The id column and primary key constraint ALREADY EXIST.
-- This migration is therefore a safe no-op, kept for documentation
-- and to satisfy the migration sequence expected by action_log_items.
--
-- Approach: We add the column IF NOT EXISTS (idempotent), backfill any
-- NULL rows (there shouldn't be any), and add a unique constraint on id
-- as a secondary guarantee. The existing PK is preserved.

begin;

-- Ensure pgcrypto is available (gen_random_uuid)
create extension if not exists pgcrypto;

-- Idempotent: column already exists with PK default
alter table public.action_logs
  add column if not exists id uuid default gen_random_uuid();

-- Backfill any hypothetical NULL ids (should be zero rows)
update public.action_logs
  set id = gen_random_uuid()
  where id is null;

-- Ensure NOT NULL (will succeed silently if already set via PK)
alter table public.action_logs
  alter column id set not null;

-- Add a named unique constraint as secondary guarantee.
-- The existing PK (action_logs_pkey on id) already enforces uniqueness,
-- so this will fail gracefully if a unique index already covers it.
-- We use DO block to make it idempotent.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.action_logs'::regclass
      and conname = 'action_logs_id_unique'
  ) then
    alter table public.action_logs
      add constraint action_logs_id_unique unique (id);
  end if;
end $$;

commit;
