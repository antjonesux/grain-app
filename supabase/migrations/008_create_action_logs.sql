begin;

create table if not exists action_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  journey_id uuid not null references journeys(id) on delete cascade,
  action_id uuid not null references actions(id) on delete cascade,
  log_date date not null,
  duration numeric not null check (duration in (0.5, 1.0, 1.5, 2.0, 3.0)),
  note text check (note is null or char_length(note) <= 140),
  logged_at timestamptz not null default now()
);

create index if not exists idx_action_logs_user_date on action_logs(user_id, log_date);
create index if not exists idx_action_logs_journey_date on action_logs(journey_id, log_date);
create index if not exists idx_action_logs_action_date on action_logs(action_id, log_date);

alter table action_logs enable row level security;

-- Policies will be tightened further in the enforcement migration
drop policy if exists action_logs_select on action_logs;
drop policy if exists action_logs_insert on action_logs;
drop policy if exists action_logs_update on action_logs;
drop policy if exists action_logs_delete on action_logs;

create policy action_logs_select
on action_logs for select
using (user_id = auth.uid());

create policy action_logs_insert
on action_logs for insert
with check (user_id = auth.uid());

create policy action_logs_update
on action_logs for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy action_logs_delete
on action_logs for delete
using (user_id = auth.uid());

commit;