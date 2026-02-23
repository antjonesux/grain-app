begin;

create table if not exists journey_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  journey_id uuid not null references journeys(id) on delete cascade,
  action_id uuid not null references actions(id) on delete cascade,
  source text not null check (source in ('suggested','custom')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (journey_id, action_id)
);

create index if not exists idx_journey_actions_user_id on journey_actions(user_id);
create index if not exists idx_journey_actions_journey_id on journey_actions(journey_id);
create index if not exists idx_journey_actions_action_id on journey_actions(action_id);

alter table journey_actions enable row level security;

drop policy if exists journey_actions_select on journey_actions;
drop policy if exists journey_actions_insert on journey_actions;
drop policy if exists journey_actions_update on journey_actions;
drop policy if exists journey_actions_delete on journey_actions;

create policy journey_actions_select
on journey_actions for select
using (user_id = auth.uid());

create policy journey_actions_insert
on journey_actions for insert
with check (
  user_id = auth.uid()
  and exists (
    select 1 from journeys j
    where j.id = journey_actions.journey_id
      and j.user_id = auth.uid()
  )
  and exists (
    select 1 from actions a
    where a.id = journey_actions.action_id
      and a.user_id = auth.uid()
  )
);

create policy journey_actions_update
on journey_actions for update
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and exists (
    select 1 from journeys j
    where j.id = journey_actions.journey_id
      and j.user_id = auth.uid()
  )
  and exists (
    select 1 from actions a
    where a.id = journey_actions.action_id
      and a.user_id = auth.uid()
  )
);

create policy journey_actions_delete
on journey_actions for delete
using (user_id = auth.uid());

commit;