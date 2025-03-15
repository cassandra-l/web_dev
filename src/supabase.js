import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bqdwamyspuavwhtcglas.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZHdhbXlzcHVhdndodGNnbGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NTYwMTUsImV4cCI6MjA1NzMzMjAxNX0.mHzjB4wNvgwb0sPVBwWSo1OZBVKYqRUGJQxz6KD3DoY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
