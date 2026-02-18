-- Recalibrations: record of drift-response actions
CREATE TABLE recalibrations (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id      UUID        REFERENCES journeys(id) NOT NULL,
  user_id         UUID        REFERENCES auth.users(id) NOT NULL,
  action          TEXT        NOT NULL CHECK (action IN ('reduce_target', 'reallocate', 'adjust_strategy', 'change_primary', 'pause')),
  previous_value  TEXT,
  new_value       TEXT,
  reason          TEXT        CHECK (reason IS NULL OR char_length(reason) <= 100),
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_recalibrations_user_id ON recalibrations(user_id);
CREATE INDEX idx_recalibrations_journey_id ON recalibrations(journey_id);
CREATE INDEX idx_recalibrations_created_at ON recalibrations(created_at);

ALTER TABLE recalibrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY recalibrations_select ON recalibrations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY recalibrations_insert ON recalibrations
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY recalibrations_update ON recalibrations
  FOR UPDATE USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY recalibrations_delete ON recalibrations
  FOR DELETE USING (user_id = auth.uid());
