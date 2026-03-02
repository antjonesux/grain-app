-- Migration: create action_log_items table.
--
-- action_log_items stores per-action investments inside a log entry (action_logs row).
-- A single log entry (parent) can contain multiple action line items (children).
-- This enables multi-action logging in a single checkpoint.

begin;

create table if not exists public.action_log_items (
  id         uuid        primary key default gen_random_uuid(),
  log_id     uuid        not null references public.action_logs(id) on delete cascade,
  user_id    uuid        not null references auth.users(id) on delete cascade,
  journey_id uuid        not null references public.journeys(id) on delete cascade,
  action_id  uuid        not null references public.actions(id) on delete cascade,
  duration   numeric     not null check (duration > 0),
  log_date   date        not null,
  logged_at  timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_action_log_items_user_journey_date
  on public.action_log_items (user_id, journey_id, log_date);

create index if not exists idx_action_log_items_user_journey_action_date
  on public.action_log_items (user_id, journey_id, action_id, log_date);

alter table public.action_log_items enable row level security;

-- RLS: authenticated users can only access their own rows

create policy action_log_items_select
  on public.action_log_items for select
  using (user_id = auth.uid());

create policy action_log_items_insert
  on public.action_log_items for insert
  with check (user_id = auth.uid());

create policy action_log_items_update
  on public.action_log_items for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy action_log_items_delete
  on public.action_log_items for delete
  using (user_id = auth.uid());

commit;
