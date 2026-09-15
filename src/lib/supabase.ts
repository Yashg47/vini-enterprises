import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log("=== SUPABASE CONFIG ===");
console.log("Supabase URL:", supabaseUrl);
console.log("Publishable key exists:", Boolean(supabaseKey));

if (!supabaseUrl) {
  throw new Error(
    "VITE_SUPABASE_URL is missing. Check Vercel Environment Variables."
  );
}

if (!supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_PUBLISHABLE_KEY is missing. Check Vercel Environment Variables."
  );
}

export const supabaseConfig = {
  url: supabaseUrl,
  hasKey: Boolean(supabaseKey),
};

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);