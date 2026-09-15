import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://hofifdqoakvmeoametam.supabase.co";

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseKey) {
  console.error(
    "VITE_SUPABASE_PUBLISHABLE_KEY is missing from the Vercel build."
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey || "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export const supabaseConfig = {
  url: supabaseUrl,
  hasKey: Boolean(supabaseKey),
};