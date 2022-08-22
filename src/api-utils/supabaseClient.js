import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABSE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  fetch: (...args) => fetch(...args),
});

export const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  fetch: (...args) => fetch(...args),
});
