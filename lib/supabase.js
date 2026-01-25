import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASESUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASESUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);