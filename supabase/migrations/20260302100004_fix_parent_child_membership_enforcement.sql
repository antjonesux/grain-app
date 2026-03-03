-- Migration: fix membership enforcement for parent/child logging model.
--
-- Problem:
--   010_enforce_action_membership created RLS policies and a trigger on
--   action_logs that require action_id to be non-null. After
--   20260302100003 made action_id nullable (parent rows are "envelopes"
--   without an action), every parent insert is rejected.
--
-- Fix:
--   1. Update action_logs INSERT/UPDATE policies to pass when action_id IS NULL.
--   2. Update trigger enforce_action_log_membership to skip action checks
--      when NEW.action_id IS NULL.
--   3. Add trigger-based membership enforcement on action_log_items (since
--      action_id now lives on the child rows).

begin;

-- ---------------------------------------------------------------
-- 1. Fix RLS policies on action_logs
-- ---------------------------------------------------------------

drop policy if exists action_logs_insert on public.action_logs;
drop policy if exists action_logs_update on public.action_logs;

create policy action_logs_insert
on public.action_logs for insert
with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.journeys j
    where j.id = action_logs.journey_id
      and j.user_id = auth.uid()
  )
  and (
    action_logs.action_id is null
    or (
      exists (
        select 1 from public.actions a
        where a.id = action_logs.action_id
          and a.user_id = auth.uid()
      )
      and exists (
        select 1 from public.journey_actions ja
        where ja.journey_id = action_logs.journey_id
          and ja.action_id = action_logs.action_id
          and ja.user_id = auth.uid()
      )
    )
  )
);

create policy action_logs_update
on public.action_logs for update
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1 from public.journeys j
    where j.id = action_logs.journey_id
      and j.user_id = auth.uid()
  )
  and (
    action_logs.action_id is null
    or (
      exists (
        select 1 from public.actions a
        where a.id = action_logs.action_id
          and a.user_id = auth.uid()
      )
      and exists (
        select 1 from public.journey_actions ja
        where ja.journey_id = action_logs.journey_id
          and ja.action_id = action_logs.action_id
          and ja.user_id = auth.uid()
      )
    )
  )
);

-- ---------------------------------------------------------------
-- 2. Fix trigger function on action_logs
-- ---------------------------------------------------------------

create or replace function public.enforce_action_log_membership()
returns trigger
language plpgsql
as $$
begin
  -- Journey ownership: always enforced
  if not exists (
    select 1 from public.journeys j
    where j.id = new.journey_id
      and j.user_id = new.user_id
  ) then
    raise exception 'Journey does not belong to user';
  end if;

  -- Action ownership + membership: only when action_id is present (legacy rows)
  if new.action_id is not null then
    if not exists (
      select 1 from public.actions a
      where a.id = new.action_id
        and a.user_id = new.user_id
    ) then
      raise exception 'Action does not belong to user';
    end if;

    if not exists (
      select 1 from public.journey_actions ja
      where ja.journey_id = new.journey_id
        and ja.action_id = new.action_id
        and ja.user_id = new.user_id
    ) then
      raise exception 'Action is not attached to this journey';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_action_log_membership on public.action_logs;

create trigger trg_enforce_action_log_membership
before insert or update of user_id, journey_id, action_id
on public.action_logs
for each row
execute function public.enforce_action_log_membership();

-- ---------------------------------------------------------------
-- 3. Add membership enforcement on action_log_items
-- ---------------------------------------------------------------

drop trigger if exists trg_enforce_action_log_item_membership on public.action_log_items;
drop function if exists public.enforce_action_log_item_membership();

create function public.enforce_action_log_item_membership()
returns trigger
language plpgsql
as $$
begin
  -- Parent row must belong to same user and journey (prevents cross-user injection)
  if not exists (
    select 1 from public.action_logs al
    where al.id = new.log_id
      and al.user_id = new.user_id
      and al.journey_id = new.journey_id
  ) then
    raise exception 'Parent log entry does not belong to this user/journey';
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

create trigger trg_enforce_action_log_item_membership
before insert or update
on public.action_log_items
for each row
execute function public.enforce_action_log_item_membership();

commit;
