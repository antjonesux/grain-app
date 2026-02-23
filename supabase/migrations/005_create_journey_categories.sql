begin;

create table if not exists journey_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,     -- e.g. 'learning'
  name text not null,           -- e.g. 'Learning'
  created_at timestamptz not null default now()
);

-- Seed baseline categories (safe to re-run)
insert into journey_categories (key, name)
values
  ('learning', 'Learning'),
  ('creative', 'Creative'),
  ('career', 'Career'),
  ('health', 'Health'),
  ('building', 'Building')
on conflict (key) do nothing;

alter table journey_categories enable row level security;

drop policy if exists journey_categories_select on journey_categories;
create policy journey_categories_select
on journey_categories for select
using (auth.uid() is not null);

commit;