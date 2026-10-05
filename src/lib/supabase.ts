import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Remove accidental spaces/newlines from Vercel environment variables.
const supabaseUrl =
  typeof rawSupabaseUrl === "string"
    ? rawSupabaseUrl.trim()
    : "";

const supabaseKey =
  typeof rawSupabaseKey === "string"
    ? rawSupabaseKey.trim()
    : "";

console.log("=== SUPABASE CONFIG ===");
console.log("Supabase URL:", supabaseUrl);
console.log(
  "Publishable key exists:",
  Boolean(supabaseKey)
);
console.log(
  "Publishable key length:",
  supabaseKey.length
);

if (!supabaseUrl) {
  throw new Error(
    "VITE_SUPABASE_URL is missing from the Vercel build."
  );
}

if (!supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_PUBLISHABLE_KEY is missing from the Vercel build."
  );
}

export const supabaseConfig = {
  url: supabaseUrl,
  hasKey: true,
};

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);