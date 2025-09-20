import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

console.log("Supabase URL:", process.env.SUPABASE_URL); // Debugging line
console.log("Supabase Anon Key:", process.env.SUPABASE_ANON_KEY); // Debugging line

const SUPABASE_URL = "https://nphkijivdcjztichcjps.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waGtpaml2ZGNqenRpY2hjanBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4Njk2NjgsImV4cCI6MjA3MzQ0NTY2OH0.TYaucKO_iyj2_a4sXo2BiYl4UBfAKbvehApqPOLuMJg"

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
