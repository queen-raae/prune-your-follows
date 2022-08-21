import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.GATSBY_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
