// backend/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nphkijivdcjztichcjps.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waGtpaml2ZGNqenRpY2hjanBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg2OTY2OCwiZXhwIjoyMDczNDQ1NjY4fQ.UrMuS6y0m6wAwJF_HVtkUnPAQsPHM_LT5-UYgImzx2M";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables!");
}

console.log("SUPABASE_URL:", supabaseUrl);
console.log("Supabase Key" , supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey);