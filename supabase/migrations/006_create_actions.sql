begin;

create table if not exists actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references journey_categories(id),
  title text not null check (char_length(title) <= 80),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_actions_user_id on actions(user_id);
create index if not exists idx_actions_category_id on actions(category_id);

alter table actions enable row level security;

drop policy if exists actions_select on actions;
drop policy if exists actions_insert on actions;
drop policy if exists actions_update on actions;
drop policy if exists actions_delete on actions;

create policy actions_select
on actions for select
using (user_id = auth.uid());

create policy actions_insert
on actions for insert
with check (user_id = auth.uid());

create policy actions_update
on actions for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy actions_delete
on actions for delete
using (user_id = auth.uid());

commit;