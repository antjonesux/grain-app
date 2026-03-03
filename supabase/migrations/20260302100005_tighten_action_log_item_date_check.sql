-- Migration: tighten action_log_items trigger to enforce date consistency.
--
-- Child rows must carry the same log_date as their parent action_logs row.
-- logged_at is allowed to differ by up to 60 seconds (client clock skew).
-- Replaces enforce_action_log_item_membership() with a single SELECT
-- that fetches the parent row once, avoiding repeated lookups.

begin;

create or replace function public.enforce_action_log_item_membership()
returns trigger
language plpgsql
as $$
declare
  v_parent record;
begin
  select al.user_id, al.journey_id, al.log_date, al.logged_at
    into v_parent
    from public.action_logs al
   where al.id = new.log_id;

  if not found then
    raise exception 'Parent log entry does not exist';
  end if;

  if v_parent.user_id != new.user_id or v_parent.journey_id != new.journey_id then
    raise exception 'Parent log entry does not belong to this user/journey';
  end if;

  if v_parent.log_date != new.log_date then
    raise exception 'Child log_date must match parent log_date';
  end if;

  if abs(extract(epoch from (new.logged_at - v_parent.logged_at))) > 60 then
    raise exception 'Child logged_at must be within 60 seconds of parent logged_at';
  end if;

  -- Journey belongs to user
  if not exists (
    select 1 from public.journeys j
    where j.id = new.journey_id
      and j.user_id = new.user_id
  ) then
    raise exception 'Journey does not belong to user';
  end if;

  -- Action belongs to user
  if not exists (
    select 1 from public.actions a
    where a.id = new.action_id
      and a.user_id = new.user_id
  ) then
    raise exception 'Action does not belong to user';
  end if;

  -- Action is attached to journey
  if not exists (
    select 1 from public.journey_actions ja
    where ja.journey_id = new.journey_id
      and ja.action_id = new.action_id
      and ja.user_id = new.user_id
  ) then
    raise exception 'Action is not attached to this journey';
  end if;

  return new;
end;
$$;

-- Trigger already exists from previous migration; no need to recreate.
-- CREATE OR REPLACE on the function body is sufficient.

commit;
