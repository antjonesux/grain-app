create or replace function public.delete_account_data(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from action_logs
  where journey_id in (
    select id from journeys where user_id = p_user_id
  );

  delete from journey_actions
  where journey_id in (
    select id from journeys where user_id = p_user_id
  );

  delete from weekly_summaries
  where journey_id in (
    select id from journeys where user_id = p_user_id
  );

  delete from recalibrations
  where journey_id in (
    select id from journeys where user_id = p_user_id
  );

  delete from journeys
  where user_id = p_user_id;

  delete from actions
  where user_id = p_user_id;
end;
$$;

revoke all on function public.delete_account_data(uuid) from public;
