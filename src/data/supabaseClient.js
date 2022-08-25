import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log({
  supabaseAnonKey: supabaseAnonKey?.substring(1, 10),
  supabaseServiceKey: supabaseServiceKey?.substring(1, 10),
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey, {
  fetch: (...args) => fetch(...args),
});
