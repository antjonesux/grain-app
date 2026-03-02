-- Migration: backfill action_log_items from existing action_logs rows.
--
-- Each existing action_logs row becomes one action_log_item pointing
-- back to itself as the parent log entry (log_id = action_logs.id).
-- Only rows with all required fields NOT NULL are migrated.
-- No columns are dropped from action_logs in this pass.

begin;

insert into public.action_log_items (
  log_id,
  user_id,
  journey_id,
  action_id,
  duration,
  log_date,
  logged_at
)
select
  al.id,
  al.user_id,
  al.journey_id,
  al.action_id,
  al.duration,
  al.log_date,
  al.logged_at
from public.action_logs al
where al.id         is not null
  and al.user_id    is not null
  and al.journey_id is not null
  and al.action_id  is not null
  and al.duration   is not null
  and al.log_date   is not null
  and al.logged_at  is not null
  and not exists (
    select 1 from public.action_log_items ali
    where ali.log_id    = al.id
      and ali.action_id = al.action_id
  );

commit;
