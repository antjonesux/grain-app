begin;

-- Tighten action_logs policies to enforce membership.
-- Verification: inserting an action_log must fail unless the action is attached to the journey (journey_actions).
-- To verify, run migrations then try inserting with a valid (journey_id, action_id) that has no row in journey_actions; expect RLS or trigger to reject.
drop policy if exists action_logs_insert on action_logs;
drop policy if exists action_logs_update on action_logs;

create policy action_logs_insert
on action_logs for insert
with check (
  user_id = auth.uid()
  and exists (
    select 1 from journeys j
    where j.id = action_logs.journey_id
      and j.user_id = auth.uid()
  )
  and exists (
    select 1 from actions a
    where a.id = action_logs.action_id
      and a.user_id = auth.uid()
  )
  and exists (
    select 1 from journey_actions ja
    where ja.journey_id = action_logs.journey_id
      and ja.action_id = action_logs.action_id
      and ja.user_id = auth.uid()
  )
);

create policy action_logs_update
on action_logs for update
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1 from journeys j
    where j.id = action_logs.journey_id
      and j.user_id = auth.uid()
  )
  and exists (
    select 1 from actions a
    where a.id = action_logs.action_id
      and a.user_id = auth.uid()
  )
  and exists (
    select 1 from journey_actions ja
    where ja.journey_id = action_logs.journey_id
      and ja.action_id = action_logs.action_id
      and ja.user_id = auth.uid()
  )
);

-- DB-level trigger guarantee (even if future code bypasses checks)
create or replace function enforce_action_log_membership()
returns trigger
language plpgsql
as $$
begin
  if not exists (
    select 1 from journeys j
    where j.id = new.journey_id
      and j.user_id = new.user_id
  ) then
    raise exception 'Journey does not belong to user';
  end if;

  if not exists (
    select 1 from actions a
    where a.id = new.action_id
      and a.user_id = new.user_id
  ) then
    raise exception 'Action does not belong to user';
  end if;

  if not exists (
    select 1 from journey_actions ja
    where ja.journey_id = new.journey_id
      and ja.action_id = new.action_id
      and ja.user_id = new.user_id
  ) then
    raise exception 'Action is not attached to this journey';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_action_log_membership on action_logs;

create trigger trg_enforce_action_log_membership
before insert or update of user_id, journey_id, action_id
on action_logs
for each row
execute function enforce_action_log_membership();

commit;