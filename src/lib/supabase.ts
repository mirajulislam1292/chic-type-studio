import { createClient } from "@supabase/supabase-js";

const isTest = import.meta.env.MODE === "test";
const rememberPreferenceKey = "portfolio-admin-remember";
// These are public browser credentials. Database authorization is enforced by RLS;
// the service-role key is intentionally never included in the client application.
const projectUrl = "https://qaevcjvzttwmcgdryits.supabase.co";
const projectPublishableKey = "sb_publishable_uP0Skkl1mE-smN2TanwdtA_MoxN1kgG";
const url = isTest ? undefined : import.meta.env.VITE_SUPABASE_URL?.trim() || projectUrl;
const key = isTest ? undefined : import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || projectPublishableKey;

const authStorage = {
  getItem(storageKey: string) {
    const remember = localStorage.getItem(rememberPreferenceKey) !== "false";
    const preferred = remember ? localStorage : sessionStorage;
    const fallback = remember ? sessionStorage : localStorage;
    return preferred.getItem(storageKey) ?? fallback.getItem(storageKey);
  },
  setItem(storageKey: string, value: string) {
    const remember = localStorage.getItem(rememberPreferenceKey) !== "false";
    const preferred = remember ? localStorage : sessionStorage;
    const fallback = remember ? sessionStorage : localStorage;
    preferred.setItem(storageKey, value);
    fallback.removeItem(storageKey);
  },
  removeItem(storageKey: string) {
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
  },
};

export function getRememberSessionPreference() {
  return localStorage.getItem(rememberPreferenceKey) !== "false";
}

export function setRememberSessionPreference(remember: boolean) {
  localStorage.setItem(rememberPreferenceKey, String(remember));
}

export const isCmsConfigured = Boolean(url && key);

export const supabase = isCmsConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: authStorage,
      },
    })
  : null;
