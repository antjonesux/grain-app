-- Migration: enforce parent/child logging model.
--
-- 1. Make action_id and duration nullable on action_logs so the parent row
--    can be inserted with only (user_id, journey_id, log_date, logged_at, note).
-- 2. Add UNIQUE(log_id, action_id) on action_log_items so the same action
--    cannot appear twice within a single log entry.

begin;

-- Allow parent rows without action-level fields
alter table public.action_logs
  alter column action_id drop not null;

alter table public.action_logs
  alter column duration drop not null;

-- Enforce one item per action within a log entry
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.action_log_items'::regclass
      and conname  = 'action_log_items_unique_action_per_log'
  ) then
    alter table public.action_log_items
      add constraint action_log_items_unique_action_per_log
      unique (log_id, action_id);
  end if;
end $$;

commit;
