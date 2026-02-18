-- Daily logs: time invested per journey per day
CREATE TABLE daily_logs (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id      UUID        REFERENCES journeys(id) NOT NULL,
  user_id         UUID        REFERENCES auth.users(id) NOT NULL,
  log_date        DATE        NOT NULL,
  time_invested   NUMERIC     NOT NULL CHECK (time_invested IN (0, 0.5, 1.0, 1.5, 2.0, 3.0)),
  note            TEXT        CHECK (note IS NULL OR char_length(note) <= 140),
  logged_at       TIMESTAMPTZ DEFAULT now(),
  UNIQUE(journey_id, log_date)
);

CREATE INDEX idx_daily_logs_user_id ON daily_logs(user_id);
CREATE INDEX idx_daily_logs_journey_date ON daily_logs(journey_id, log_date);

ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY daily_logs_select ON daily_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY daily_logs_insert ON daily_logs
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY daily_logs_update ON daily_logs
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY daily_logs_delete ON daily_logs
  FOR DELETE USING (user_id = auth.uid());
