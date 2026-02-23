begin;

alter table journeys
  add column if not exists category_id uuid references journey_categories(id);

-- Drop support_def if it exists (replaced by category + actions)
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_name = 'journeys' and column_name = 'support_def'
  ) then
    alter table journeys drop column support_def;
  end if;
end $$;

-- Retire old table (only do this if you don't need old data)
drop table if exists daily_logs;

commit;