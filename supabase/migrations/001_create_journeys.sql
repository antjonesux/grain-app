-- Journeys: user-defined long-term directions
CREATE TABLE journeys (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        REFERENCES auth.users(id) NOT NULL,
  title           TEXT        NOT NULL CHECK (char_length(title) <= 60),
  why             TEXT        NOT NULL CHECK (char_length(why) <= 200),
  support_def     TEXT        NOT NULL CHECK (char_length(support_def) <= 200),
  weekly_hours    NUMERIC     NOT NULL CHECK (weekly_hours >= 0.5 AND weekly_hours <= 20),
  status          TEXT        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  role            TEXT        NOT NULL DEFAULT 'primary' CHECK (role IN ('primary', 'secondary')),
  created_at      TIMESTAMPTZ DEFAULT now(),
  paused_at       TIMESTAMPTZ,
  archived_at     TIMESTAMPTZ
);

CREATE INDEX idx_journeys_user_id ON journeys(user_id);
CREATE INDEX idx_journeys_user_status ON journeys(user_id, status);

ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY journeys_select ON journeys
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY journeys_insert ON journeys
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY journeys_update ON journeys
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY journeys_delete ON journeys
  FOR DELETE USING (user_id = auth.uid());
