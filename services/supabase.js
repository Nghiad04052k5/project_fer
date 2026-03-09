import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmppjedtgblmjmmuofc.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcHBqZWR0Z2J0bG1qbW11b2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5OTczNjYsImV4cCI6MjA4ODU3MzM2Nn0.A4xpszHG1X9s7aZJ0KBoNzTlxrObkJ4xxVchAX6KFBg";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);