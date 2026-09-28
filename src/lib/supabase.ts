import { createClient } from "@supabase/supabase-js";

const isTest = import.meta.env.MODE === "test";
// These are public browser credentials. Database authorization is enforced by RLS;
// the service-role key is intentionally never included in the client application.
const projectUrl = "https://qaevcjvzttwmcgdryits.supabase.co";
const projectPublishableKey = "sb_publishable_uP0Skkl1mE-smN2TanwdtA_MoxN1kgG";
const url = isTest ? undefined : import.meta.env.VITE_SUPABASE_URL?.trim() || projectUrl;
const key = isTest ? undefined : import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || projectPublishableKey;

export const isCmsConfigured = Boolean(url && key);

export const supabase = isCmsConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
