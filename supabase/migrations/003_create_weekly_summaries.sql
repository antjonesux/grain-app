-- Weekly summaries: commitment vs actual per journey per week
CREATE TABLE weekly_summaries (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id      UUID        REFERENCES journeys(id) NOT NULL,
  user_id         UUID        REFERENCES auth.users(id) NOT NULL,
  week_start      DATE        NOT NULL,
  commitment      NUMERIC     NOT NULL,
  actual          NUMERIC     NOT NULL DEFAULT 0,
  delta           NUMERIC     GENERATED ALWAYS AS (actual - commitment) STORED,
  zero_days       INTEGER     NOT NULL DEFAULT 0,
  needle_moved    BOOLEAN,
  recalibrated    BOOLEAN     DEFAULT false,
  skipped         BOOLEAN     DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(journey_id, week_start)
);

CREATE INDEX idx_weekly_summaries_user_id ON weekly_summaries(user_id);
CREATE INDEX idx_weekly_summaries_journey_week ON weekly_summaries(journey_id, week_start);

ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY weekly_summaries_select ON weekly_summaries
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY weekly_summaries_insert ON weekly_summaries
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY weekly_summaries_update ON weekly_summaries
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY weekly_summaries_delete ON weekly_summaries
  FOR DELETE USING (user_id = auth.uid());
