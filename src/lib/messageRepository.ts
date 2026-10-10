import { supabase } from "./supabase";
import type { InboundMessage } from "./types";

function requireClient() {
  if (!supabase) throw new Error("Messages are not connected to Supabase.");
  return supabase;
}

export async function listMessages(options: { page?: number; pageSize?: number; type?: string; status?: string } = {}) {
  const client = requireClient();
  const page = Math.max(1, options.page || 1);
  const pageSize = Math.min(50, Math.max(1, options.pageSize || 20));
  const from = (page - 1) * pageSize;
  let query = client.from("inbound_messages").select("*", { count: "exact" });
  if (options.type && options.type !== "all") query = query.eq("message_type", options.type);
  if (options.status && options.status !== "all") query = query.eq("status", options.status);
  const { data, count, error } = await query.order("created_at", { ascending: false }).range(from, from + pageSize - 1);
  if (error) throw new Error(error.message);
  return { data: (data || []) as InboundMessage[], count: count || 0 };
}

export async function updateMessageStatus(id: string, status: InboundMessage["status"]) {
  const client = requireClient();
  const { error } = await client.from("inbound_messages").update({
    status,
    read_at: status === "new" ? null : new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteMessage(id: string) {
  const client = requireClient();
  const { error } = await client.from("inbound_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
