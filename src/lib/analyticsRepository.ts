import { supabase } from "./supabase";
import type { VisitorAnalytics, VisitorEvent, VisitorProfile } from "./types";

const emptyAnalytics: VisitorAnalytics = {
  total_visits: 0,
  unique_visitors: 0,
  today_visits: 0,
  week_visits: 0,
  month_visits: 0,
  top_pages: [],
  devices: [],
  browsers: [],
  operating_systems: [],
  countries: [],
};

function requireClient() {
  if (!supabase) throw new Error("Visitor analytics is not connected to Supabase.");
  return supabase;
}

export async function getVisitorAnalytics() {
  const client = requireClient();
  const { data, error } = await client.rpc("get_visitor_analytics");
  if (error) throw new Error(error.message);
  return { ...emptyAnalytics, ...((data || {}) as unknown as VisitorAnalytics) };
}

export async function listVisitors(page = 1, pageSize = 20) {
  const client = requireClient();
  const from = (Math.max(page, 1) - 1) * pageSize;
  const { data, count, error } = await client
    .from("visitor_profiles")
    .select("*", { count: "exact" })
    .order("last_visit_at", { ascending: false })
    .range(from, from + pageSize - 1);
  if (error) throw new Error(error.message);
  return { data: (data || []) as VisitorProfile[], count: count || 0 };
}

export async function getVisitor(id: string) {
  const client = requireClient();
  const { data, error } = await client.from("visitor_profiles").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as VisitorProfile | null;
}

export async function listVisitorEvents(visitorId: string, page = 1, pageSize = 25) {
  const client = requireClient();
  const from = (Math.max(page, 1) - 1) * pageSize;
  const { data, count, error } = await client
    .from("visitor_events")
    .select("*", { count: "exact" })
    .eq("visitor_id", visitorId)
    .order("visited_at", { ascending: false })
    .range(from, from + pageSize - 1);
  if (error) throw new Error(error.message);
  return { data: (data || []) as VisitorEvent[], count: count || 0 };
}

export async function getRetentionDays() {
  const client = requireClient();
  const { data, error } = await client.from("analytics_settings").select("retention_days").eq("id", "main").single();
  if (error) throw new Error(error.message);
  return Number(data.retention_days);
}

export async function purgeVisitorAnalytics(retentionDays: number) {
  const client = requireClient();
  const { data, error } = await client.rpc("purge_visitor_analytics", { p_retention_days: retentionDays });
  if (error) throw new Error(error.message);
  return Number(data || 0);
}
